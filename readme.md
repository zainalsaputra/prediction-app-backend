# ID CAMP CHALLENGES 2025 - FIXKAN APPLICATION API

- **Framework:** Express.Js
- **Node Version:** 20.10.0 LTS
- **RDBMS:** PostgreSQL
- **Layered Architecture**
- **Architecture:** RESTful API
- **Model AI Server:** Python with FastAPI

## **Production API URLs**

- **[Takedown] Primary API Server (AWS EC2):**  
  [https://fixkan-api.zainal-saputra.click](https://fixkan-api.zainal-saputra.click)

- **Backup API Server (Vercel Deployment):**  
  [https://sec-prediction-app-backend.vercel.app](https://sec-prediction-app-backend.vercel.app)

## **Tools**

### **Backend**

- Sequelize ORM
- sequelize-cli
- ESLint
- Amazon Web Services (AWS)
- Vercel (for development pre-production)
- Cloudinary
- Swagger
- Multer
- Axios
- Nodemon
- dotenv
- Joi
- Moment
- Socket.io
- Helmet (Request security)
- express-rate-limit
- jsonwebtoken (JWT)
- bcryptjs
- PM2 (Process Management)
- Nginx (Reverse Proxy)
- Certbot (SSL/TLS HTTPS)
- Crontab (Auto SSL Renewal)
- Nodemailer (SMTP Email Service)

### **AI Server**

- TensorFlow
- FastAPI (with integrated Swagger documentation)
- Firebase

### **RDBMS Cloud Server**

- Neon Tech

### **Images Cloud Server**

- Cloudinary

### **Deployment Infrastructure (AWS)**

- **AWS EC2**
- **AWS Route53**
- **Nginx**
- **Node.js v20.10.0**
- **PM2**
- **Certbot**
- **Crontab**
- **PostgreSQL Database Hosted on Neon Tech**
- **Cloudinary for Image Storage**

## **Features**

### **Authentication & Authorizations**

- Register
- Login with JWT Authentication
- Logout & Invalidate Refresh Token
- Refresh Token for Secure Sessions
- Role-Based Access Control (RBAC)
- Middleware for Authentication & Authorization
- Rate Limiting and Security Headers (Helmet)
- Forgot Password - Email-Based Password Reset
- Reset Password with Secure Token Expiration
- Professional HTML Email Templates for Communications

### **Prediction Features**

- Create Image Prediction via AI Server
- Store Report with Prediction Result
- Update Existing Report
- Delete Report
- View Reports Created by User
- Filtering & Dynamic Searching of Reports

### **Report Management**

- Full CRUD for Reports
- Upload & Manage Images with Cloudinary
- Filtering & Sorting Reports by Type, Location, Date, and User
- Associate Reports with Specific User Locations

### **Post Report Management**

- Create Post Reports from Reports
- List Post Reports with Advanced Filters
- Update and Delete Post Reports
- Status Management for Post Reports

### **Notification System**

- Retrieve Notifications per User
- Mark Notifications as Read
- Automatic Real-time Notifications on Post Status Changes

### **WebSocket Real-Time Notifications**

- Emit Notifications on Post Creation and Status Updates
- WebSocket Rooms by User ID
- Optimized for High Performance and Stability

### **Filtering & Sorting**

- Advanced Filters and Sort Features
- Dynamic Search by Various Parameters (Location, Type, Status, etc.)

### **Statistics & Data Analysis**

- Generate Report Statistics
- Filter Statistics by Geographical Location (Province, District, Subdistrict, Village)
- Count Reports by Category (e.g., Road Damage, Disasters, etc.)

### **API Documentation**

- Comprehensive Swagger Documentation
- Interactive Bearer Token Authentication in Swagger UI
- API Testing directly from Browser

### **Database Management & Migration**

- Sequelize Migrations and Seeders
- Entity Relationship Diagram (ERD) using DBeaver 25.0.0:

![ERD](https://res.cloudinary.com/dlfpviz7i/image/upload/v1742748510/markdown/ru4iyncsqdss6ola7bn3.png)

## **Update History**

- Added New Location Fields (Province, District, Subdistrict, Village)
- Implemented Role-Based Access Control (RBAC)
- Enhanced API Security with Helmet & Rate Limiting
- Real-time WebSocket Notification System
- Forgot Password & Secure Reset Password via SMTP Email
- Professional Email Templates for Password Reset
- Configured SMTP Service with App Password for Higher Security
- Optimized WebSocket Server for High Traffic
- Logout Endpoint with Refresh Token Invalidation
- Successfully Deployed with Full HTTPS Security on AWS

## **RDMS Extension**

- uuid-ossp

## **Todo (Next Milestones)**

- Advanced Analytics for Report Trends
- Enhance AI Server Integration for Deeper Analysis
- Further Backend and WebSocket Optimizations
- Enhanced Logging and Error Monitoring
- CI/CD Integration for Automated AWS Deployments
- All Feature Admin Dashboard
