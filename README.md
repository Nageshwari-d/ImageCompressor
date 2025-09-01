# Image Compressor

## Overview

Image Compressor is a React-based web app with a Node.js backend that allows users to upload images and compress them by adjusting quality and maximum size parameters. The app supports JPEG and PNG images and provides real-time previews and download of compressed images.

---

## Features

- Upload images for compression via drag-and-drop or file chooser.
- Adjust compression quality with a slider (10%–100%).
- Set a maximum size limit (KB/MB/GB) for output files.
- Preview compressed image before download.
- User authentication: login, register, profile management.
- Responsive design for desktop and mobile.

---

## Technologies Used

### Frontend

- React.js with React Router for navigation
- Framer Motion for animated transitions
- CSS Flexbox and responsive design techniques

### Backend

- Node.js with Express.js REST API
- Multer for file upload handling
- Image compression libraries (e.g., Sharp or similar)
- JWT-based authentication
- MongoDB for user data management

---

## Setup and Installation

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running locally or accessible remotely

### Backend

1. Navigate to `/backend` folder:

   ```
   cd backend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create `.env` file with configuration variables like:

   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_app_password
   ```

4. Start the backend server:

   ```
   npm run dev
   ```

### Frontend

1. Navigate to `/frontend` folder:

   ```
   cd frontend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the React development server:

   ```
   npm start
   ```

4. The app will open at http://localhost:3000

---

## Usage

- Use the navigation bar to register or login.
- Navigate to the "Compress" page.
- Select an image file to compress.
- Adjust the quality slider and optionally set a maximum size limit.
- Click the "Compress" button to process the image.
- Preview the compressed image and use the "Download" button to save it.

---

## Folder Structure

```
/backend - Node.js backend with API routes and utilities
/frontend - React.js frontend application
```

---

## Notes

- Ensure your backend is running before using the frontend.
- The backend APIs require authentication tokens for protected routes.
- Email sending is configured for Gmail SMTP with app passwords.
- Image compression parameters can be adjusted in the backend logic.

---

## Contributing

Contributions are welcome! Please fork the repo and submit pull requests with clear descriptions.

---

