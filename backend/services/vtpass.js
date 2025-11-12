const axios = require('axios');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

class VTPassService {
  constructor() {
    this.apiKey = process.env.VTPASS_API_KEY;
    this.publicKey = process.env.VTPASS_PUBLIC_KEY;
    this.secretKey = process.env.VTPASS_SECRET_KEY;
    this.baseUrl = process.env.VTPASS_BASE_URL || 'https://sandbox.vtpass.com/api';
    this.username = process.env.VTPASS_USERNAME;
  }

  generateSignature(requestId) {
    const hash = crypto.createHash('sha256');
    hash.update(`${this.username}${this.apiKey}${requestId}`);
    return hash.digest('hex');
  }

  async makeRequest(method, endpoint, data = null) {
    try {
      const requestId = uuidv4();
      const signature = this.generateSignature(requestId);

      const config = {
        method,
        url: `${this.baseUrl}${endpoint}`,
        headers: {
          'api-key': this.apiKey,
          'public-key': this.publicKey,
          'secret-key': this.secretKey,
          'request-id': requestId,
          'signature': signature,
          'Content-Type': 'application/json',
        },
        ...(data && { data }),
      };

      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.error('VTPass API Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'VTPass service error');
    }
  }

  // Get service variations (e.g., data plans, electricity plans)
  async getServiceVariations(serviceID) {
    return await this.makeRequest('GET', `/service-variations?serviceID=${serviceID}`);
  }

  // Verify customer details before payment
  async verifyCustomer(serviceID, billersCode) {
    const data = {
      billersCode,
      serviceID,
    };
    return await this.makeRequest('POST', '/merchant-verify', data);
  }

  // Purchase airtime
  async purchaseAirtime(requestId, serviceID, amount, phone, billersCode = null) {
    const data = {
      request_id: requestId,
      serviceID,
      amount,
      phone,
      billersCode: billersCode || phone,
    };
    return await this.makeRequest('POST', '/pay', data);
  }

  // Purchase data
  async purchaseData(requestId, serviceID, amount, phone, billersCode = null) {
    const data = {
      request_id: requestId,
      serviceID,
      amount,
      phone,
      billersCode: billersCode || phone,
    };
    return await this.makeRequest('POST', '/pay', data);
  }

  // Pay electricity bill
  async payElectricity(requestId, serviceID, amount, phone, billersCode, variation_code) {
    const data = {
      request_id: requestId,
      serviceID,
      amount,
      phone,
      billersCode,
      variation_code,
    };
    return await this.makeRequest('POST', '/pay', data);
  }

  // Pay cable TV subscription
  async payCableTV(requestId, serviceID, amount, phone, billersCode, variation_code, quantity = 1) {
    const data = {
      request_id: requestId,
      serviceID,
      amount,
      phone,
      billersCode,
      variation_code,
      quantity,
    };
    return await this.makeRequest('POST', '/pay', data);
  }

  // Check transaction status
  async checkTransactionStatus(requestId) {
    return await this.makeRequest('POST', '/requery', {
      request_id: requestId,
    });
  }

  // Get wallet balance
  async getWalletBalance() {
    return await this.makeRequest('GET', '/wallet');
  }

  // Service IDs for different VTU services
  static getServiceIDs() {
    return {
      // Airtime
      MTN_AIRTIME: 'mtn',
      GLO_AIRTIME: 'glo',
      AIRTEL_AIRTIME: 'airtel',
      ETISALAT_AIRTIME: 'etisalat',
      
      // Data
      MTN_DATA: 'mtn-data',
      GLO_DATA: 'glo-data',
      AIRTEL_DATA: 'airtel-data',
      ETISALAT_DATA: 'etisalat-data',
      
      // Electricity
      IKEDC: 'ikeja-electric',
      EKEDC: 'eko-electric',
      AEDC: 'abuja-electric',
      KEDCO: 'kano-electric',
      PHED: 'ph-electric',
      JED: 'jos-electric',
      EEDC: 'enugu-electric',
      
      // Cable TV
      DSTV: 'dstv',
      GOTV: 'gotv',
      STARTIMES: 'startimes',
      
      // Internet
      SMILE: 'smile',
      SPECTRANET: 'spectranet',
      
      // Exams
      WAEC: 'waec',
      NECO: 'neco',
      JAMB: 'jamb',
    };
  }

  // Get service categories
  static getServiceCategories() {
    return {
      AIRTIME: 'airtime',
      DATA: 'data',
      ELECTRICITY: 'electricity',
      CABLE_TV: 'cable_tv',
      INTERNET: 'internet',
      EXAMS: 'exams',
    };
  }
}

module.exports = VTPassService;