# SwiftRoute

SwiftRoute is a full-stack ride-hailing web application inspired by modern mobility platforms. It allows users to book rides, enables captains/drivers to receive ride requests, and provides a smooth experience for ride tracking and ride management.

This project combines a Node.js/Express backend with a React/Vite frontend, backed by MongoDB, Socket.IO, Mapbox, and Cloudinary.

## ✨ Features

- User registration and login
- Captain/driver registration and login
- Ride request creation with pickup and destination
- Real-time ride notifications using Socket.IO
- Live ride tracking and status updates
- Profile management for both riders and captains
- Secure authentication with JWT
- Map-based location search and distance estimation with Mapbox

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- React Router DOM
- Tailwind CSS
- Socket.IO Client
- Mapbox GL
- Lucide Icons

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.IO
- JWT Authentication
- Cookie Parser
- Cloudinary for media handling
- Mapbox APIs for geocoding and directions

## 📁 Project Structure

```text
uber-drive/
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   └── server.js
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.jsx
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js (v18 or later)
- npm or yarn
- MongoDB
- A Mapbox account
- A Cloudinary account

### 1. Clone the repository

```bash
git clone https://github.com/your-username/uber-drive.git
cd uber-drive
```

### 2. Backend setup

```bash
cd Backend
npm install
```

Create a `.env` file inside the Backend folder and add the following variables:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
MAP_BOX_API=your_mapbox_access_token
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend server:

```bash
npm start
```

### 3. Frontend setup

```bash
cd ../Frontend
npm install
npm run dev
```

The frontend will start on:
- http://localhost:5173

The backend will run on:
- http://localhost:3000

## 🧪 How the App Works

1. A user signs up or logs in.
2. The user enters a pickup and destination to request a ride.
3. Nearby captains are notified in real time.
4. A captain accepts the ride and the ride moves into an active state.
5. Riders can track the journey until completion.

## 📸 Demo

You can showcase this project by running both the frontend and backend locally and demonstrating:
- rider signup/login
- captain signup/login
- ride booking flow
- live ride notifications
- real-time map updates

## 🔐 Environment Variables

| Variable | Description |
| --- | --- |
| `PORT` | Backend port |
| `MONGO_URI` | MongoDB connection string |
| `MAP_BOX_API` | Mapbox access token |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |


