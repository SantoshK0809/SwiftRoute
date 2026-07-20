# SwiftRoute 🚕

SwiftRoute is a full-stack real-time ride-hailing platform that connects riders with nearby captains based on their location. Users can search for pickup and destination locations, compare fares across vehicle types, request rides, and track the ride lifecycle in real time.

The platform combines Mapbox-powered location services, MongoDB geospatial queries, and Socket.IO-based real-time communication to handle location-based driver matching and synchronized ride updates.

## ✨ Key Features

* Separate authentication and workflows for riders and captains
* Pickup and destination search with Mapbox geocoding and autocomplete
* Route distance and ETA calculation using Mapbox Directions API
* Distance- and duration-based fare estimation across 3 vehicle types
* Nearby captain discovery within a 5 km radius using MongoDB geospatial queries
* Real-time ride request delivery and status synchronization using Socket.IO
* OTP-based verification before starting a ride
* Live location sharing during active rides
* Complete ride lifecycle: request → accept → verify → start → complete
* JWT-based authentication and token blacklisting
* Profile image management with Cloudinary

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Socket.IO Client
* react-map-gl / Mapbox
* Browser Geolocation API

### Backend

* Node.js
* Express.js
* MongoDB & Mongoose
* Socket.IO
* JWT Authentication
* Mapbox APIs
* Cloudinary

## ⚙️ How SwiftRoute Works

1. A rider enters a pickup location and destination.
2. Mapbox geocoding converts the locations into geographic coordinates.
3. The Mapbox Directions API calculates the driving distance and estimated travel duration.
4. SwiftRoute calculates fares for 3 vehicle types using vehicle-specific base fares, per-kilometer rates, and per-minute rates.
5. MongoDB geospatial queries identify available captains within a 5 km radius of the pickup location.
6. Nearby captains receive the ride request instantly through Socket.IO.
7. Once a captain accepts the request, the rider and captain receive synchronized ride-status updates.
8. The rider provides a 6-digit OTP, which is verified before the ride can begin.
9. Live location and ride-status updates are synchronized throughout the active ride.
10. When the captain completes the ride, the ride status is updated and both users return to their respective home workflows.

## 🧠 Technical Highlights

### Geospatial Driver Matching

SwiftRoute uses MongoDB geospatial queries to locate captains near the rider's pickup coordinates. Available captains within a 5 km search radius are identified before ride requests are delivered through Socket.IO.

### Real-Time Communication

Socket.IO manages event-driven communication between riders and captains, including:

* New ride requests
* Ride acceptance
* Ride status changes
* Ride start and completion
* Live location updates

### Mapbox Integration

Mapbox is used for:

* Address autocomplete
* Geocoding pickup and destination addresses
* Route visualization
* Driving distance calculation
* Estimated travel duration

### Fare Estimation

Ride fares are calculated based on:

* Base fare
* Route distance
* Estimated travel duration
* Selected vehicle type

The platform currently supports 3 vehicle categories with separate fare configurations.

### Ride Verification

Each ride is assigned a 6-digit OTP during creation. The captain must verify the rider-provided OTP before the ride can transition to an active state.

## 📁 Project Structure

```text
SwiftRoute/
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   └── server.js
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.jsx
│   └── ...
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* npm
* MongoDB
* Mapbox account
* Cloudinary account

### Clone the Repository

```bash
git clone <your-swiftroute-repository-url>
cd SwiftRoute
```

### Backend

```bash
cd Backend
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
MAP_BOX_API=your_mapbox_access_token
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend:

```bash
npm start
```

### Frontend

```bash
cd ../Frontend
npm install
npm run dev
```

## 🔐 Environment Variables

| Variable                | Purpose                |
| ----------------------- | ---------------------- |
| `PORT`                  | Backend server port    |
| `MONGO_URI`             | MongoDB connection URI |
| `MAP_BOX_API`           | Mapbox access token    |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name  |
| `CLOUDINARY_API_KEY`    | Cloudinary API key     |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret  |

## 📸 Demo

The project demonstrates the complete rider and captain workflow, including ride booking, nearby captain matching, real-time ride notifications, OTP verification, live location updates, and ride completion.

> A hosted live demo will be added after deployment.

## 🔮 Future Improvements

* Online payment gateway integration
* Improved captain availability management
* Ride cancellation and cancellation policies
* Fare surge based on demand and availability
* Ride ratings and reviews
* Production-level monitoring and logging
