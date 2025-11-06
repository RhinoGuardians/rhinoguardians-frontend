Technical Context:

# 🦏 RhinoGuardians Frontend

**React dashboard for RhinoGuardians - Interactive map & real-time alert visualization**

Built for **AI Genesis Hackathon 2025** (Nov 14-19) | Lead: William

---

## 📋 Overview

This is the frontend for RhinoGuardians. It provides:
- **Interactive Map** – Displays all detected rhinos and threats with GPS pins
- **Real-Time Alerts** – Instant notifications when poachers/threats are detected
- **Detection History** – Browse past detections with filters (date, class, location)
- **Analytics Dashboard** – Threat heatmaps, ranger response metrics
- **Responsive Design** – Works on desktop, tablet, mobile

---

## 🎨 Tech Stack

- **Framework:** React 18+
- **Styling:** CSS3, Responsive Design
- **Maps:** Leaflet.js / Mapbox GL
- **State Management:** React Hooks + Context API
- **HTTP Client:** Axios
- **Build Tool:** Vite

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone repo
git clone https://github.com/RhinoGuardians/rhinoguardians-frontend.git
cd rhinoguardians-frontend

# Install dependencies
npm install

# Start dev server
npm run dev

# Visit: http://localhost:5173
```

---

## 📂 Project Structure

```
frontend/
├── src/
│   ├── App.jsx                  # Main app component
│   ├── App.css                  # Global styles
│   ├── components/
│   │   ├── Map.jsx              # Leaflet map component
│   │   ├── DetectionCard.jsx    # Individual detection display
│   │   ├── AlertNotification.jsx # Toast alerts
│   │   ├── Header.jsx           # Navigation bar
│   │   └── Sidebar.jsx          # Filters & controls
│   ├── pages/
│   │   ├── Dashboard.jsx        # Main dashboard view
│   │   ├── History.jsx          # Detection history
│   │   └── Analytics.jsx        # Stats & heatmaps
│   ├── api/
│   │   └── client.js            # Axios setup, API calls
│   ├── hooks/
│   │   ├── useDetections.js     # Fetch detections hook
│   │   └── useAlerts.js         # Real-time alerts hook
│   ├── utils/
│   │   ├── formatDate.js        # Date formatting
│   │   └── mapHelpers.js        # Map utilities
│   └── main.jsx                 # React entry point
├── public/                      # Static assets
├── package.json
├── vite.config.js
└── README.md                    # This file
```

---

## 🎯 Key Features

### 1. Interactive Map
```jsx
<Map 
  detections={detections}
  onMarkerClick={handleMarkerClick}
  center={[-23.8859, 31.5205]}  // Serengeti
  zoom={10}
/>
```
- Plots all detections as pins (green=rhino, red=threat)
- Click to view details
- Zoom/pan to explore reserve
- Real-time updates

### 2. Detection Display
```jsx
<DetectionCard 
  id={detection.id}
  class={detection.class_name}
  confidence={detection.confidence}
  location={[detection.gps_lat, detection.gps_lng]}
  timestamp={detection.timestamp}
  image={detection.image_path}
/>
```
- Shows thumbnail image
- Confidence score & class
- GPS coordinates
- Exact timestamp
- "Alert Ranger" button

### 3. Real-Time Alerts
```jsx
<AlertNotification 
  type="threat_detected"
  message="Potential poacher detected in Zone A!"
  severity="critical"
  autoClose={5000}
/>
```
- Toast notifications pop up instantly
- Color-coded by severity (info, warning, critical)
- Auto-dismiss after 5s or manual close

### 4. Filters & Search
- Filter by: Class (rhino/human/vehicle), Date range, Location zone
- Search by detection ID
- Show/hide certain threat levels

---

## 🔄 API Integration

The frontend connects to the **FastAPI backend** at `http://localhost:8000` (or deployed URL).

### Key Endpoints

```javascript
// Fetch detections
GET /detections/?limit=50&class_name=rhino

// Upload image for detection
POST /upload/ 
  - FormData with image + GPS coords

// Fetch alerts
GET /alerts/?limit=20
```

### Example API Call

```javascript
// In src/api/client.js
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const fetchDetections = async (filters = {}) => {
  const response = await axios.get(`${API_BASE}/detections/`, { params: filters });
  return response.data.detections;
};

export const uploadImage = async (file, gpsLat, gpsLng) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('gps_lat', gpsLat);
  formData.append('gps_lng', gpsLng);

  const response = await axios.post(`${API_BASE}/upload/`, formData);
  return response.data;
};
```

---

## 📱 Responsive Design

- **Desktop (1200px+):** Full dashboard with map + sidebar
- **Tablet (768px-1199px):** Stacked layout, map full width
- **Mobile (<768px):** Map takes priority, alerts in dropdown

---

## 🎨 Customization

### Colors
Edit `src/App.css`:
```css
:root {
  --color-primary: #2d8659;      /* Green */
  --color-alert: #ff6b6b;        /* Red */
  --color-info: #4dabf7;         /* Blue */
  --color-success: #51cf66;      /* Success green */
}
```

### Map Style
```javascript
// In src/components/Map.jsx
const tileLayer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
// Or use Mapbox: 'mapbox://styles/mapbox/satellite-v9'
```

---

## 🚀 Build & Deploy

### Build for Production
```bash
npm run build
# Creates optimized build in dist/
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Deploy to AWS S3 + CloudFront
```bash
# Build
npm run build

# Upload to S3
aws s3 sync dist/ s3://rhinoguardians-frontend

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id <ID> --paths "/*"
```

---

## 🧪 Testing

```bash
# Run tests
npm test

# Test specific component
npm test -- Map.test.jsx

# Coverage report
npm test -- --coverage
```

---

## 🔗 Environment Variables

Create `.env.local`:
```env
VITE_API_URL=http://localhost:8000
VITE_MAPBOX_TOKEN=your_mapbox_token
VITE_ENVIRONMENT=development
```

In production (`.env.production`):
```env
VITE_API_URL=https://api.rhinoguardians.ai
VITE_MAPBOX_TOKEN=prod_mapbox_token
VITE_ENVIRONMENT=production
```

---

## 📊 Performance Tips

- **Lazy load** map component until needed
- **Memoize** expensive computations with `useMemo`
- **Debounce** filter changes to reduce API calls
- **Virtual scrolling** for long detection lists
- **Optimize images** before display

---

## 🐛 Common Issues

**Issue:** Map not displaying
- **Solution:** Check Leaflet CSS is imported: `import 'leaflet/dist/leaflet.css'`

**Issue:** Detections not updating
- **Solution:** Ensure backend is running and `VITE_API_URL` is correct

**Issue:** Mobile layout broken
- **Solution:** Check media queries in `App.css`, ensure viewport meta tag is set

---

## 🎬 Future Features

- [ ] Real-time WebSocket updates (instead of polling)
- [ ] Mobile app (React Native)
- [ ] Advanced analytics (threat prediction ML model)
- [ ] Ranger team management dashboard
- [ ] Integration with drone APIs
- [ ] Video stream support (instead of images)

---

## 📚 Resources

- [React Docs](https://react.dev/)
- [Leaflet Docs](https://leafletjs.com/)
- [Vite Docs](https://vitejs.dev/)
- [Axios Docs](https://axios-http.com/)

---

## 👤 Lead: William

Questions? Open an issue or ping the frontend team!

---

**Built with ❤️ for RhinoGuardians AI Genesis Hackathon 2025**


Project Context:

# Rhino Guardians Project Doc

## Project Title

**AI for Wildlife – Black Rhino Conservation**

## Team Name

**RhinoGuardians**

---

## Problem Statement

African black rhinos are critically endangered due to rampant poaching and habitat loss. Over the past decades, poaching has reduced populations dramatically—from roughly 70,000 in 1970 to just a few thousand today. Despite conservation efforts, organized poaching networks and limited surveillance capacity make it difficult to protect rhinos effectively across vast wildlife reserves.

There is a clear need for an intelligent, automated monitoring system that can detect threats in real time and alert conservation teams before poachers strike.

---

## Proposed Solution

RhinoGuardians proposes an **AI-powered detection and monitoring system** that leverages drone and camera-trap imagery to identify rhinos and potential poaching threats in real time.

The system combines:

* Computer vision
* Machine learning
* Geospatial intelligence

to assist rangers and conservationists with timely, data-driven interventions.

---

## Core Capabilities

* **Real-Time Object Detection**
  YOLOv5/YOLOv8 models identify rhinos, humans, and vehicles in live drone feeds or camera trap images.

* **Geospatial Tagging**
  Each detection is automatically tagged with GPS coordinates and displayed on an interactive map.

* **Instant Alerts**
  Automated notifications are sent to rangers upon detecting suspicious activity.

* **Data Fusion**
  Sensor and environmental data are integrated to enable context-aware decision-making.

This solution supports **AI for Good**, biodiversity protection, and sustainable conservation practices.

---

## System Architecture Overview

**Data Flow**

`Drones & Camera Traps → YOLO Detection Model → FastAPI Backend → Database (PostgreSQL/SQLite) → React Frontend Dashboard`

**Components**

* **Data Sources**
  Aerial drones and camera traps capture images and video streams.

* **Model Inference**
  Trained YOLO models perform real-time detection of rhinos and potential threats.

* **Backend (FastAPI)**

  * Serves the model via REST API endpoints
  * Processes detections
  * Stores metadata (timestamps, classes, GPS, confidence) in the database

* **Database (PostgreSQL / SQLite)**

  * Stores detection records
  * Persists historical data for analysis and monitoring

* **Frontend (React Dashboard)**

  * Visualizes detections on a live, interactive map
  * Displays alerts and recent activity
  * Supports ranger decision-making and rapid response

* **Optional Components**

  * **Qdrant** for vector similarity search and image embedding retrieval
  * **Gemini AI** for multimodal reasoning and environmental context analysis

---

## Team Roles & Responsibilities

| Name    | Role                            | Responsibilities                                                                                                   |
| ------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Linford | Team Lead / Project Coordinator | Oversees project planning, integration, and documentation. Manages research, GitHub setup, and final presentation. |
| Rania   | Deep Learning Engineer          | Leads YOLO model development and fine-tuning. Optimizes detection accuracy and evaluates performance.              |
| Shrusti | Machine Learning Engineer       | Curates and augments datasets, supports model training/testing, and manages validation metrics.                    |
| William | Frontend Developer              | Builds the React-based dashboard, integrates maps, and implements UI/UX for visualization and alerts.              |
| Azuka   | Backend Engineer                | Implements FastAPI server, integrates inference pipeline, manages data storage and deployment.                     |

---

## Technology Stack

| Layer                | Technology                          | Description                                                      |
| -------------------- | ----------------------------------- | ---------------------------------------------------------------- |
| Machine Learning     | YOLOv5 / YOLOv8 (PyTorch)           | Real-time object detection for rhinos and potential threats.     |
| Backend              | FastAPI                             | Model serving, REST APIs, and detection data processing.         |
| Frontend             | React                               | Interactive web dashboard for live visualization and alerts.     |
| Database             | PostgreSQL / SQLite                 | Stores detection records, metadata, and historical logs.         |
| Vector Search (Opt.) | Qdrant                              | Supports similarity search on visual embeddings.                 |
| Multimodal AI (Opt.) | Gemini AI                           | Enhances reasoning using combined text and image inputs.         |
| Cloud Deployment     | AWS EC2 / GCP Cloud Run (Free Tier) | Hosts backend services and model inference in a scalable manner. |

---

## Expected Impact

This project demonstrates how open-source AI tools can directly support **wildlife conservation**:

* Enables **real-time threat detection**
* Improves **response speed** of rangers and anti-poaching units
* Provides a **scalable framework** for broader biodiversity monitoring initiatives
* Contributes to the **long-term survival** of the black rhino



Additional context:

AI for Wildlife – Black Rhino Conservation
Problem Statement
African black rhinos are critically endangered due to rampant poaching. Decades of horn poaching devastated populations (from ~70,000 in 1970 to ~2,410 in 1995)[1]. In the last decade alone, over 8,000 rhinos have been killed across Africa (an average of one per day)[2]. Poaching persists as organized criminal networks exploit vast reserves, putting remaining rhinos at risk. This calls for advanced monitoring and rapid response tools. Conservation experts emphasize that technology (e.g. drones, sensors, AI) is needed to scale surveillance and react swiftly to illegal threats[3][2].
Proposed AI Solution
RhinoGuardians proposes an AI-driven surveillance system combining computer vision and geospatial data to detect rhinos and poachers in real time. The core is a YOLO-based object detector (e.g. YOLOv5/YOLOv8 in PyTorch) trained on aerial and camera-trap imagery. Incoming images from drones and ground cameras are fed into the model to identify rhinos (and suspicious humans or vehicles) instantly[4][5]. Each detection is tagged with GPS data, producing instant alerts for ranger teams[6][7]. By automating image analysis, the system overcomes the delays of manual monitoring[7]. Optional enhancements include visual‐search (using Qdrant vectors) and multimodal context (via Google’s Gemini AI) for richer analysis of detections.
•	Real-time Detection: A YOLO model scans video frames and photos, flagging rhinos or poachers as they appear[4][5]. This is faster and more scalable than human surveillance.
•	Geospatial Tagging: Detections are combined with GPS/environment data so alerts appear on a map, guiding rangers straight to the location[6][7].
•	Immediate Alerts: Once an object is detected, the system sends an alert (SMS, email or UI notification) within seconds, leveraging onboard processing and the network. This rapid response capability is critical in remote reserves[6][7].
•	Data Fusion: Besides imagery, the system can ingest weather, vegetation or other sensor data to contextualize sightings (e.g. linking animal movements to environmental conditions).
System Architecture
The end-to-end architecture flows from data collection to alert presentation. In summary:
•	Data Sources: Aerial drones and stationary camera traps continuously capture images/video across the reserve. These devices (and possibly other sensors) stream data to the system. Camera traps are a proven non-invasive monitoring tool, but traditionally require manual analysis[7]. Here, images are automatically uploaded or relayed over networks (e.g. cellular, satellite or LPWAN) to the backend.
•	Model Inference: The backend runs a YOLOv5/v8 detector on incoming imagery (PyTorch). This deep CNN model identifies rhinos (and humans/vehicles) in each frame[4][5]. The detection step can occur in the cloud or on edge devices (e.g. on-board drone computer or edge server) to minimize latency.
•	Backend & Storage: A FastAPI server hosts the inference model and APIs. It receives images or frames, runs detections, and writes results to a database. Detected objects (with class, confidence, timestamp, and GPS) are stored in PostgreSQL/SQLite. Optionally, feature vectors from each image can be indexed in Qdrant for fast visual similarity search. The server handles real-time queries from the UI and logs all data.
•	Frontend & Mapping: A React-based web UI fetches detections via API and displays them on an interactive map interface. Each alert is shown with location, image thumbnail, and metadata. The UI can highlight hotspots (clustering detections), show live drone feeds or recent camera snapshots, and allow manual review. Rangers receive instant notifications from the app or connected devices when the model flags a rhino or potential poaching incident[6][7].
By combining edge/cloud processing with web technologies, the system provides a clear data flow: Sensors → YOLO Model → FastAPI Backend → React UI. Geospatial precision and automated alerts are key features: once a threat is detected, the system tags it with GPS and notifies responders immediately[6][7].
Team Roles
RhinoGuardians is a cross-functional hackathon team pooling expertise in AI and development:
- Rania (Deep Learning Engineer): Trains and fine-tunes YOLOv5/v8 models on annotated rhino and poacher images. Optimizes model performance (accuracy, speed) on this task.
- Shrusti (Machine Learning Engineer): Curates and augments the training dataset of wildlife and poacher images. Assists with model evaluation and iterative improvements.
- William (Frontend Developer): Builds the React UI that displays real-time detections on a map, shows image feeds, and manages alerts/notifications. Integrates mapping libraries (e.g. Leaflet or Mapbox) for geospatial visualization.
- Azuka (Backend Engineer): Implements the FastAPI server and database. Responsible for model serving, API endpoints, data pipelines, and cloud deployment setup. Ensures low-latency inference and reliable storage (PostgreSQL/SQLite).
- Linford (project coordinator): Oversees overall system design, integration of components, and cloud infrastructure. Conducts literature research and prepares pitch and documentation. Coordinates tasks and timelines across the team.
Technologies in Use
•	YOLOv5 / YOLOv8 (Ultralytics, PyTorch): State-of-the-art object detection models for real-time wildlife detection[5][4]. Chosen for speed and accuracy on embedded/cloud GPUs.
•	FastAPI (Python): High-performance backend framework for serving the ML model and APIs. Facilitates async image processing and easy deployment.
•	React: Frontend library for a dynamic UI. Powers the real-time dashboard with maps, alert notifications, and image viewers.
•	Database: PostgreSQL (or SQLite) stores detection records, timestamps, locations, and relevant metadata. Chosen for reliability and spatial queries support.
•	Cloud Deployment: AWS EC2 (free tier) or Google Cloud Run hosts the backend and model. Scales compute for inference as needed.
•	Optional Tools: Qdrant (vector database) for indexing image embeddings to enable visual similarity searches. Google’s Gemini AI could be integrated for advanced multimodal analysis (e.g. interpreting environmental context) if needed.
Each technology is selected for performance and ease of integration in a full-stack AI system. Combined, these enable an end-to-end wildlife monitoring pipeline that can rapidly identify black rhinos (and poaching threats) and deliver actionable alerts to conservation teams[6][7].
Sources: Conservation reports and AI research were used to define the problem and validate the approach[2][1][4][5][7][6].
________________________________________
[1] Rhino populations | Rhino Facts | Save the Rhino International
https://www.savetherhino.org/rhino-info/population-figures/
[2] Poaching numbers | Conservation | Save the Rhino International
https://www.savetherhino.org/rhino-info/poaching-stats/
[3] Perspectives in machine learning for wildlife conservation | Nature Communications
https://www.nature.com/articles/s41467-022-27980-y?error=cookies_not_supported&code=b41bf9e2-83ac-446a-8bdf-b868b4edf033
[4] Poacher Detection using YOLO Algorithm
https://www.ijert.org/research/poacher-detection-using-yolo-algorithm-IJERTCONV9IS03081.pdf
[5] How to train Ultralytics YOLO models to detect animals | Ultralytics
https://www.ultralytics.com/blog/how-to-train-ultralytics-yolo-models-to-detect-animals-in-the-wild
[6] Fighting wildlife crime with AI drones - Cow-Shed Startup
https://www.cow-shed.com/blog/fighting-wildlife-crime-with-ai-drones
[7] An IoT System Using Deep Learning to Classify Camera Trap Images on the Edge
https://www.mdpi.com/2073-431X/11/1/13
