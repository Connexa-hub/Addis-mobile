# Addis Digital Banking Platform

A comprehensive digital banking platform similar to OPay, featuring mobile banking app, admin panel, VTU services, and payment gateway integrations.

## 🚀 Features

### Mobile App Features
- **User Authentication**: Secure login, registration, and biometric authentication
- **Digital Wallet**: Balance management, transaction history, and account statements
- **Money Transfers**: Peer-to-peer transfers, bank transfers, and mobile money
- **VTU Services**: Airtime recharge, data bundles, cable TV, and electricity bill payments
- **QR Code Payments**: Scan and pay functionality
- **Transaction History**: Detailed transaction records with filters
- **Push Notifications**: Real-time transaction alerts and promotions
- **Security Features**: PIN, biometric authentication, and device security

### Admin Panel Features
- **Dashboard Analytics**: Real-time statistics and charts
- **User Management**: Customer accounts, KYC verification, and user roles
- **Transaction Monitoring**: All transactions with filtering and search
- **VTU Service Management**: Service configuration and pricing
- **Content Management**: Banners, promotions, and app content
- **System Settings**: Platform configuration and maintenance
- **Reporting**: Transaction reports, user reports, and analytics

### Backend API Features
- **RESTful API**: Comprehensive API with Swagger documentation
- **Authentication**: JWT-based authentication with refresh tokens
- **Database**: MongoDB with Mongoose ODM
- **Payment Gateways**: Monnify integration for payments and transfers
- **VTU Integration**: VTPass API for airtime, data, and bill payments
- **Security**: Rate limiting, data validation, and encryption
- **Caching**: Redis for performance optimization
- **Logging**: Comprehensive logging with Winston

## 🛠 Technology Stack

### Mobile App
- **Framework**: React Native with Expo SDK 54
- **Language**: TypeScript
- **Navigation**: Expo Router v3
- **UI Components**: React Native Paper, NativeWind
- **State Management**: Zustand, React Query
- **Authentication**: Expo Secure Store, Local Authentication
- **Payments**: Custom integration with Monnify SDK

### Admin Panel
- **Framework**: React 18 with Create React App
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI) v6
- **State Management**: Redux Toolkit, React Query
- **Charts**: Recharts, MUI X Charts
- **Routing**: React Router v6

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: JavaScript (ES6+)
- **Database**: MongoDB 7.0
- **Cache**: Redis
- **Authentication**: JWT, Passport.js
- **Documentation**: Swagger/OpenAPI

## 📁 Project Structure

```
addis/
├── mobile-app/          # React Native mobile application
├── admin-panel/         # React admin dashboard
├── backend/             # Node.js API server
├── docker-compose.yml   # Docker orchestration
├── nginx.conf          # Reverse proxy configuration
└── README.md           # Documentation
```

## 🚦 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB 7.0+
- Redis 7+
- Docker & Docker Compose (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/addis.git
   cd addis
   ```

2. **Setup environment variables**
   ```bash
   # Copy environment template
   cp backend/.env.example backend/.env
   
   # Edit .env file with your configuration
   nano backend/.env
   ```

3. **Install dependencies**
   ```bash
   # Backend
   cd backend && npm install
   
   # Admin Panel
   cd ../admin-panel && npm install
   
   # Mobile App
   cd ../mobile-app && npm install
   ```

4. **Start with Docker Compose (Recommended)**
   ```bash
   docker-compose up -d
   ```

5. **Or start manually**
   ```bash
   # Start backend
   cd backend && npm run dev
   
   # Start admin panel (new terminal)
   cd admin-panel && npm start
   
   # Start mobile app (new terminal)
   cd mobile-app && npm start
   ```

### Access Points
- **Admin Panel**: http://localhost:3001
- **API Documentation**: http://localhost:5000/api-docs
- **Health Check**: http://localhost:5000/health

## 🔧 Configuration

### Environment Variables

#### Database Configuration
```env
MONGO_URI=mongodb://admin:admin123@localhost:27017/addis
REDIS_URL=redis://localhost:6379
```

#### Payment Gateways
```env
# Monnify Configuration
MONNIFY_API_KEY=your-monnify-api-key
MONNIFY_SECRET_KEY=your-monnify-secret-key
MONNIFY_CONTRACT_CODE=your-monnify-contract-code

# VTPass Configuration
VTPASS_API_KEY=your-vtpass-api-key
VTPASS_PUBLIC_KEY=your-vtpass-public-key
VTPASS_SECRET_KEY=your-vtpass-secret-key
```

#### Security
```env
JWT_SECRET=your-super-secret-jwt-key
SESSION_SECRET=your-session-secret
```

## 🔐 Security Features

### Mobile App Security
- **Biometric Authentication**: Fingerprint and face unlock
- **PIN Protection**: Secure PIN for app access
- **Encrypted Storage**: Sensitive data encrypted in secure storage
- **SSL Pinning**: Certificate pinning for API communication
- **Root Detection**: Jailbreak/root detection

### Backend Security
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: API rate limiting to prevent abuse
- **Input Validation**: Comprehensive input sanitization
- **CORS Protection**: Cross-origin resource sharing configuration
- **Helmet Security**: Security headers with Helmet.js
- **MongoDB Sanitization**: NoSQL injection prevention

### Admin Panel Security
- **Role-Based Access Control**: Different permission levels
- **Session Management**: Secure session handling
- **Audit Logging**: All admin actions logged
- **2FA Support**: Two-factor authentication ready

## 💳 Payment Integration

### Monnify Integration
- **Account Creation**: Virtual account numbers for users
- **Payment Collection**: Card and bank transfer payments
- **Payouts**: Single and bulk transfers to bank accounts
- **Webhook Verification**: Secure webhook handling
- **Transaction Queries**: Real-time transaction status

### VTU Services
- **Airtime**: MTN, Airtel, Glo, 9mobile
- **Data Bundles**: All network data plans
- **Electricity Bills**: IKEDC, EKEDC, AEDC, etc.
- **Cable TV**: DSTV, GOTV, Startimes
- **Internet**: Smile, Spectranet
- **Exam Pins**: WAEC, NECO, JAMB

## 📊 Monitoring & Logging

### Backend Logging
- **Winston Logger**: Structured logging with levels
- **Log Files**: Separate files for errors and combined logs
- **Request Logging**: HTTP request/response logging
- **Performance Monitoring**: API response time tracking

### Health Checks
- **Database Health**: MongoDB connection status
- **Cache Health**: Redis connection status
- **API Health**: Overall system health endpoint
- **External Services**: Payment gateway connectivity

## 🚀 Deployment

### Docker Deployment
```bash
# Production deployment
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Scale services
docker-compose up -d --scale backend=3
```

### Manual Deployment
```bash
# Backend deployment
pm run build
pm2 start server.js --name addis-backend

# Admin panel deployment
npm run build
serve -s build -p 3001
```

### Environment-Specific Configurations
- **Development**: Hot reloading, detailed error messages
- **Staging**: Production-like testing environment
- **Production**: Optimized build, monitoring, SSL

## 📱 Mobile App Development

### Expo Development
```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Build for production
eas build -p android
eas build -p ios
```

### Environment Configuration
```javascript
// app.config.js
export default {
  expo: {
    name: "Addis",
    slug: "addis-mobile",
    // ... other config
  }
}
```

## 🔍 API Documentation

### Swagger Documentation
- **URL**: http://localhost:5000/api-docs
- **Features**: Interactive API testing
- **Authentication**: Bearer token support
- **Models**: Request/response schemas

### API Endpoints
- **Authentication**: `/api/auth/*`
- **Users**: `/api/users/*`
- **Transactions**: `/api/transactions/*`
- **VTU Services**: `/api/vtu/*`
- **Payments**: `/api/payments/*`
- **Admin**: `/api/admin/*`

## 🧪 Testing

### Backend Testing
```bash
# Run all tests
npm test

# Run specific test file
npm test auth.test.js

# Run with coverage
npm run test:coverage
```

### Mobile App Testing
```bash
# Run tests
npm test

# E2E testing with Detox
npm run e2e
```

### Admin Panel Testing
```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch
```

## 📈 Performance Optimization

### Backend Optimization
- **Database Indexing**: Optimized MongoDB queries
- **Caching Strategy**: Redis for frequently accessed data
- **Compression**: Gzip compression for API responses
- **Rate Limiting**: Prevent API abuse

### Mobile App Optimization
- **Code Splitting**: Lazy loading of screens
- **Image Optimization**: Compressed images with WebP support
- **Bundle Optimization**: Minified JavaScript bundles
- **Offline Support**: Cache critical data locally

### Admin Panel Optimization
- **Code Splitting**: Route-based code splitting
- **Virtual Scrolling**: Efficient handling of large datasets
- **Image Optimization**: WebP images with fallbacks
- **CDN Integration**: Static asset optimization

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks
- **Conventional Commits**: Commit message format

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- **API Docs**: http://localhost:5000/api-docs
- **Postman Collection**: Available in `/docs` folder
- **Architecture Diagram**: Available in `/docs` folder

### Community
- **Issues**: GitHub Issues for bug reports
- **Discussions**: GitHub Discussions for questions
- **Email**: support@addis.com

### Professional Support
For enterprise support and custom implementations, contact:
- Email: enterprise@addis.com
- Phone: +234-XXX-XXXX-XXXX

## 🙏 Acknowledgments

- **OPay**: For inspiration and market validation
- **React Native Community**: For excellent mobile development tools
- **Node.js Community**: For robust backend technologies
- **Open Source Contributors**: For various libraries and tools

---

**Built with ❤️ by the Addis Team**