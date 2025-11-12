// MongoDB initialization script
// This script runs when the MongoDB container is first created

db = db.getSiblingDB('admin');

// Authenticate as admin
db.auth('admin', 'admin123');

// Switch to addis database
db = db.getSiblingDB('addis');

// Create collections
db.createCollection('users');
db.createCollection('transactions');
db.createCollection('vtu_transactions');
db.createCollection('accounts');
db.createCollection('settings');
db.createCollection('admin_users');

// Create indexes for better performance
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ phone: 1 }, { unique: true });
db.users.createIndex({ accountNumber: 1 }, { unique: true });
db.users.createIndex({ createdAt: 1 });

db.transactions.createIndex({ userId: 1 });
db.transactions.createIndex({ reference: 1 }, { unique: true });
db.transactions.createIndex({ status: 1 });
db.transactions.createIndex({ createdAt: 1 });

db.vtu_transactions.createIndex({ userId: 1 });
db.vtu_transactions.createIndex({ requestId: 1 }, { unique: true });
db.vtu_transactions.createIndex({ serviceId: 1 });
db.vtu_transactions.createIndex({ createdAt: 1 });

db.accounts.createIndex({ userId: 1 });
db.accounts.createIndex({ accountNumber: 1 }, { unique: true });

// Create default admin user
const bcrypt = require('bcryptjs');
const hashedPassword = bcrypt.hashSync('admin123', 10);

db.admin_users.insertOne({
  name: 'System Administrator',
  email: 'admin@addis.com',
  password: hashedPassword,
  role: 'super_admin',
  permissions: ['*'],
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
});

// Create default settings
db.settings.insertMany([
  {
    key: 'platform_name',
    value: 'Addis Digital Banking',
    description: 'Platform display name'
  },
  {
    key: 'platform_email',
    value: 'support@addis.com',
    description: 'Platform support email'
  },
  {
    key: 'maintenance_mode',
    value: false,
    description: 'Platform maintenance status'
  },
  {
    key: 'vtu_commission',
    value: 0.02,
    description: 'VTU service commission rate'
  },
  {
    key: 'transfer_fee',
    value: 10,
    description: 'Transfer fee amount'
  }
]);

print('Database initialization completed successfully!');