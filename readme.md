# ID CAMP CHALLENGES 2025 - FIXKAN APPLICATION API

-   **Framework:** Express.Js
-   **Node Version:** 20.10.0 LTS
-   **RDBMS:** PostgreSQL
-   **Layered Architecture**
-   **Architecture:** RESTful API
-   **Model AI Server:** Python with FastAPI

## **Tools**

### **Backend**

-   Sequelize ORM
-   sequelize-cli
-   ESLint
-   Amazon Web Services (AWS)
-   Vercel (for development pre-production)
-   Cloudinary
-   Swagger
-   Multer
-   Axios
-   Nodemon
-   dotenv
-   Joi
-   Moment
-   Socket.io
-   Helmet (Request security)
-   express-rate-limit
-   jsonwebtoken (JWT)
-   bcryptjs
-   PM2 (Process Management)
-   Nginx (Reverse Proxy)
-   Certbot (SSL/TLS HTTPS)
-   Crontab (Auto SSL Renewal)


### **AI Server**

-   TensorFlow
-   FastAPI (include Swagger documentation)
-   Firebase

### **RDBMS Cloud Server**

-   Neon Tech

### **Images Cloud Server**

-   Cloudinary

### **Deployment Infrastructure (AWS)**

-   **AWS EC2**
-   **AWS Route53**
-   **Nginx** (
-   **Node.js v20.10.0**
-   **PM2** 
-   **Certbot**
-   **Crontab**
-   **PostgreSQL Database Hosted on Neon Tech**
-   **Cloudinary for Image Storage**

## **Features**

### **Authentication & Authorizations**

-   **Register**
-   **Login with JWT Authentication**
-   **Logout & Invalidate Refresh Token**
-   **Refresh Token for Secure Sessions**
-   **Role-Based Access Control (RBAC)**
-   **Middleware for Authentication & Authorization**
-   **Rate Limiting** 
-   **Helmet for securing API requests**

### **Prediction Features**

-   **Create Image Prediction** -> AI API
-   **Store Report with Prediction Result**
-   **Update Existing Report**
-   **Delete Report**
-   **Show Reports Created by User**
-   **Show Reports with Filters**
-   **Search Reports (Dynamic Filtering)**

### **Report Management**

-   **CRUD for Reports**
-   **Upload & Manage Images using Cloudinary**
-   **Filtering & Sorting Reports by Type, Location, Date, and User**
-   **Get Reports by User ID**
-   **Associate Reports with User Locations**

### **Post Report Management**

-   **Create Post Reports based on Reports**
-   **Get All Post Reports with Filters**
-   **Check Status of a Post Report**
-   **Update Post Report Status**
-   **Delete Post Report**

### **Notification System**

-   **Get Notifications by User ID**
-   **Get Detailed Notification Data**
-   **Mark Notifications as Read**
-   **Check Notification Status (Read/Unread)**
-   **Automatic Notifications when Post Report Status Changes**

### **WebSocket Real-Time Notifications**

-   **Emit Notification when a Post Report is Created**
-   **Emit Notification when a Post Report Status is Updated**
-   **Users Join WebSocket Rooms Based on User ID**
-   **Optimized WebSocket for Better Performance**

### **Filtering & Sorting**

-   **Apply Filters on Reports and Post Reports**
-   **Sort Data by Created Date, Updated Date, Type, Region, etc.**
-   **Search Reports Dynamically**

### **Statistics & Data Analysis**

-   **Generate Statistical Data for Reports**
-   **Filter Statistics by Location (Province, District, Subdistrict, Village)**
-   **Show Count of Reports by Type (Jalan Rusak, Bencana, dll.)**

### **API Documentation (Swagger)**

-   **All Endpoints Fully Documented**
-   **Bearer Token Authentication in Swagger UI**
-   **Test API Directly from Browser**

### **Database Management & Migration**

-   **Sequelize Migrations & Seeds**
-   **Entity Relationship Diagram (DBeaver 25.0.0) :**

![enter image description here](https://res.cloudinary.com/dlfpviz7i/image/upload/v1742748510/markdown/ru4iyncsqdss6ola7bn3.png)

## **Update History**

-   **Create Migrations to Add & Update New Location Fields (Province, District, Subdistrict, Village)**
-   **Implement Role-Based Access Control (RBAC)**
-   **Enhance API Security with Helmet & Rate Limiting**
-   **WebSocket Notification System for Real-time Updates**
-   **Forgot Password & Reset Password Implementation**
-   **Optimized WebSocket Performance for Real-time Features**
-   **Implemented Logout API with Refresh Token Invalidation**
-   **Successfully Deployed Application to AWS with SSL/TLS Security**

## **RDMS Extension**

-   **uuid-ossp**

## **Todo**

-   **Advanced Analytics for Reports**
-   **Enhanced AI Integration for Report Analysis**
-   **Further Optimization & Performance Improvements**
-   **Enhanced Logging & Monitoring**
-   **Releases Deployments with AWS**
