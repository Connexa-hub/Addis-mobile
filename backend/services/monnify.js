const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

class MonnifyService {
  constructor() {
    this.apiKey = process.env.MONNIFY_API_KEY;
    this.secretKey = process.env.MONNIFY_SECRET_KEY;
    this.baseUrl = process.env.MONNIFY_BASE_URL || 'https://sandbox.monnify.com';
    this.contractCode = process.env.MONNIFY_CONTRACT_CODE;
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  async authenticate() {
    try {
      const authString = Buffer.from(`${this.apiKey}:${this.secretKey}`).toString('base64');
      
      const response = await axios.post(
        `${this.baseUrl}/api/v1/auth/login`,
        {},
        {
          headers: {
            'Authorization': `Basic ${authString}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.responseCode === '0') {
        this.accessToken = response.data.responseBody.accessToken;
        this.tokenExpiry = Date.now() + (response.data.responseBody.expiresIn * 1000);
        return this.accessToken;
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      console.error('Monnify Authentication Error:', error.response?.data || error.message);
      throw new Error('Failed to authenticate with Monnify');
    }
  }

  async ensureAuthenticated() {
    if (!this.accessToken || Date.now() >= this.tokenExpiry) {
      await this.authenticate();
    }
  }

  async makeRequest(method, endpoint, data = null) {
    try {
      await this.ensureAuthenticated();

      const config = {
        method,
        url: `${this.baseUrl}${endpoint}`,
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        ...(data && { data }),
      };

      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.error('Monnify API Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.responseMessage || 'Monnify service error');
    }
  }

  // Create a reserved account for a customer
  async createReservedAccount(customerEmail, customerName, customerBvn = null, currencyCode = 'NGN') {
    const data = {
      accountReference: uuidv4(),
      accountName: customerName,
      currencyCode,
      contractCode: this.contractCode,
      customerEmail,
      customerName,
      ...(customerBvn && { bvn: customerBvn }),
      getAllAvailableBanks: false,
      preferredBanks: ['035', '232'], // WEMA and Sterling Bank
    };

    const response = await this.makeRequest('POST', '/api/v2/bank-transfer/reserved-accounts', data);
    
    if (response.responseCode === '0') {
      return response.responseBody;
    } else {
      throw new Error(response.responseMessage || 'Failed to create reserved account');
    }
  }

  // Get reserved account details
  async getReservedAccountDetails(accountReference) {
    const response = await this.makeRequest('GET', `/api/v2/bank-transfer/reserved-accounts/${accountReference}`);
    
    if (response.responseCode === '0') {
      return response.responseBody;
    } else {
      throw new Error(response.responseMessage || 'Failed to get reserved account details');
    }
  }

  // Initialize payment transaction
  async initializePayment(amount, customerName, customerEmail, paymentReference, paymentDescription, redirectUrl) {
    const data = {
      amount,
      customerName,
      customerEmail,
      paymentReference,
      paymentDescription,
      currencyCode: 'NGN',
      contractCode: this.contractCode,
      redirectUrl,
      paymentMethods: ['CARD', 'ACCOUNT_TRANSFER'],
    };

    const response = await this.makeRequest('POST', '/api/v1/merchant/transactions/init-transaction', data);
    
    if (response.responseCode === '0') {
      return response.responseBody;
    } else {
      throw new Error(response.responseMessage || 'Failed to initialize payment');
    }
  }

  // Verify transaction status
  async verifyTransaction(transactionReference) {
    const response = await this.makeRequest('GET', `/api/v2/transactions/${transactionReference}`);
    
    if (response.responseCode === '0') {
      return response.responseBody;
    } else {
      throw new Error(response.responseMessage || 'Failed to verify transaction');
    }
  }

  // Get transaction status
  async getTransactionStatus(transactionReference) {
    return await this.verifyTransaction(transactionReference);
  }

  // Get all transactions
  async getAllTransactions(page = 0, size = 10) {
    const response = await this.makeRequest('GET', `/api/v1/merchant/transactions/search?accountNumber=&page=${page}&size=${size}`);
    
    if (response.responseCode === '0') {
      return response.responseBody;
    } else {
      throw new Error(response.responseMessage || 'Failed to get transactions');
    }
  }

  // Calculate hash for webhook verification
  calculateHash(clientSecret, transactionReference, amountPaid, paidOn, paymentReference) {
    const crypto = require('crypto');
    const hashString = `${clientSecret}|${transactionReference}|${amountPaid}|${paidOn}|${paymentReference}`;
    return crypto.createHash('sha512').update(hashString).digest('hex');
  }

  // Verify webhook signature
  verifyWebhookSignature(clientSecret, data) {
    const { transactionReference, amountPaid, paidOn, paymentReference, transactionHash } = data;
    const calculatedHash = this.calculateHash(clientSecret, transactionReference, amountPaid, paidOn, paymentReference);
    return calculatedHash === transactionHash;
  }

  // Get banks
  async getBanks() {
    const response = await this.makeRequest('GET', '/api/v1/banks');
    
    if (response.responseCode === '0') {
      return response.responseBody;
    } else {
      throw new Error(response.responseMessage || 'Failed to get banks');
    }
  }

  // Single payout (transfer)
  async singlePayout(amount, reference, narration, destinationBankCode, destinationAccountNumber, destinationAccountName, currency = 'NGN') {
    const data = {
      amount,
      reference,
      narration,
      destinationBankCode,
      destinationAccountNumber,
      destinationAccountName,
      currency,
      sourceAccountNumber: '', // Optional
    };

    const response = await this.makeRequest('POST', '/api/v2/disbursements/single', data);
    
    if (response.responseCode === '0') {
      return response.responseBody;
    } else {
      throw new Error(response.responseMessage || 'Failed to process payout');
    }
  }

  // Bulk payout
  async bulkPayout(title, payoutItems) {
    const data = {
      title,
      batchReference: uuidv4(),
      payoutItems: payoutItems.map(item => ({
        ...item,
        reference: uuidv4(),
        currency: item.currency || 'NGN',
      })),
    };

    const response = await this.makeRequest('POST', '/api/v1/disbursements/batch', data);
    
    if (response.responseCode === '0') {
      return response.responseBody;
    } else {
      throw new Error(response.responseMessage || 'Failed to process bulk payout');
    }
  }

  // Get payout status
  async getPayoutStatus(payoutReference) {
    const response = await this.makeRequest('GET', `/api/v1/disbursements/${payoutReference}`);
    
    if (response.responseCode === '0') {
      return response.responseBody;
    } else {
      throw new Error(response.responseMessage || 'Failed to get payout status');
    }
  }

  // Get account balance
  async getAccountBalance() {
    const response = await this.makeRequest('GET', '/api/v1/bank-transfer/wallet-balance');
    
    if (response.responseCode === '0') {
      return response.responseBody;
    } else {
      throw new Error(response.responseMessage || 'Failed to get account balance');
    }
  }
}

module.exports = MonnifyService;