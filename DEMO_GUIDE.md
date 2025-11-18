# 🎬 RhinoGuardians Frontend Demo Guide

## Overview

This demo setup provides a **fully functional frontend** without requiring a backend. It simulates the complete workflow from wildlife detection to ranger response using comprehensive mock data.

---

## 🚀 Quick Start

### 1. Start the Demo

```bash
# Install dependencies (if not done already)
npm install

# Start the development server
npm run dev

# Open http://localhost:5173 in your browser
```

The frontend is configured to use mock data by default via `.env.local`.

### 2. What You'll See

The dashboard will load with:
- **15 detections** across the reserve (8 rhinos, 7 threats)
- **6 alerts** in various states of the lifecycle
- **4 ranger teams** with live positions
- **Interactive map** with color-coded markers
- **Active alerts panel** showing ongoing operations

---

## 🎯 Demo Scenario Flow

### The Story

The mock data tells a complete story of a day in rhino protection:

#### **Morning (06:00 - 08:00)**
1. **06:23** - Rhino detected in North Sector ✅ (det_001)
2. **06:45** - Another rhino spotted nearby ✅ (det_002)
3. **07:12** - **THREAT: Poacher detected in Zone A** ⚠️ (det_003)
   - Alert RG-101 created
   - Ranger Alpha Team dispatched
   - **RESOLVED at 08:45** - False alarm, was authorized park ranger

#### **Mid-Morning (08:00 - 10:00)**
4. **08:24** - **CRITICAL: Poacher in Zone B** 🚨 (det_006)
   - Alert RG-102 created
   - Ranger Bravo Team en route
   - **STATUS: IN PROGRESS** (currently ongoing)
5. **09:13** - Unidentified vehicle at East Perimeter 🚗 (det_008)
   - Alert RG-103 created
   - Ranger Charlie Team acknowledged

#### **Late Morning (10:00 - 12:00)**
6. **10:16** - **URGENT: Individual near recent poaching site** 🚨 (det_011)
   - Alert RG-104 sent, awaiting acknowledgment
7. **11:52** - **CRITICAL: Poacher approaching waterhole** 🚨 (det_015)
   - Alert RG-106 just created
   - Zone B - immediate response needed

---

## 🗺️ Map Legend

### Detection Markers
- **🟢 Green Circle** - Rhino detection (safe wildlife)
- **🔴 Red Circle** - Threat detection (poacher/vehicle/human)
- **🔵 Blue Circle** - Unknown detection

### Alert Status Markers
When an alert is created for a detection, the marker changes:
- **🔴 Pulsing Red** - Active alert (sent/created)
- **🟠 Orange** - Ranger acknowledged
- **🟢 Green** - Resolved

### Ranger Markers
- **🔷 Blue Square with "R"** - Ranger team position
- **Blue line** - Ranger en route to alert (in_progress status)

---

## 📋 Detailed Detection List

| ID | Type | Confidence | Location | Zone | Status |
|----|------|-----------|----------|------|--------|
| det_001 | Rhino | 94% | North Sector | Safe | No alert |
| det_002 | Rhino | 89% | North Sector | Safe | No alert |
| **det_003** | **Poacher** | 87% | Zone A | Alert | **Resolved** (RG-101) |
| det_004 | Vehicle | 92% | West Boundary | Alert | No alert |
| det_005 | Rhino | 96% | Central Reserve | Safe | No alert |
| **det_006** | **Poacher** | 91% | Zone B | Alert | **In Progress** (RG-102) |
| det_007 | Rhino | 88% | North Sector | Safe | No alert |
| det_008 | Vehicle | 85% | East Perimeter | Alert | Acknowledged (RG-103) |
| det_009 | Human | 82% | Patrol Route | Possible | No alert |
| det_010 | Rhino | 93% | Central Reserve | Safe | No alert |
| **det_011** | **Poacher** | 95% | Zone A | Alert | **Sent** (RG-104) |
| det_012 | Rhino | 91% | North Sector | Safe | No alert |
| det_013 | Vehicle | 88% | East Perimeter | Alert | Sent (RG-105) |
| det_014 | Rhino | 97% | North Sector | Safe | No alert |
| **det_015** | **Poacher** | 89% | Zone B Waterhole | Alert | **Created** (RG-106) |

---

## 🚨 Alert Lifecycle Demonstration

### Alert RG-101 (COMPLETED ✅)
**Detection:** det_003 (Poacher in Zone A)
```
07:13:00 → Created
07:15:30 → Acknowledged by Ranger Alpha Team
07:18:00 → Ranger dispatched (in_progress)
08:45:00 → RESOLVED - False alarm, authorized personnel
```

### Alert RG-102 (ACTIVE 🔄)
**Detection:** det_006 (Poacher in Zone B)
```
08:24:00 → Created
08:26:00 → Acknowledged by Ranger Bravo Team
08:30:00 → Ranger en route (in_progress)
Current  → ETA 12 minutes, Distance 2.3 km
```
**Watch the map:** You'll see Ranger Bravo Team position with a line to the alert location!

### Alert RG-104 (AWAITING ⏳)
**Detection:** det_011 (High-priority poacher)
```
10:16:00 → Created
Current  → Awaiting ranger acknowledgment
Status   → Sent via SMS/radio
```

### Alert RG-106 (JUST CREATED 🆕)
**Detection:** det_015 (Critical - waterhole)
```
11:52:30 → Just created
Current  → Being dispatched to ranger network
Priority → CRITICAL
```

---

## 👥 Ranger Teams

| Team | Lead | Status | Location | Assigned Alert |
|------|------|--------|----------|----------------|
| **Alpha** | Themba Ndlovu | On Patrol | Zone A | None (recently resolved RG-101) |
| **Bravo** | Sarah Mitchell | **Responding** | En route to Zone B | **RG-102** (in_progress) |
| **Charlie** | John Khumalo | Acknowledged | East Perimeter | RG-103 |
| **Delta** | Maria Santos | At Base | HQ | Available |

---

## 🎮 Interactive Demo Features

### Test the Alert Creation Flow

1. **Find a threat without an alert**
   - Click on det_009 (human detection) or det_004 (vehicle)

2. **Click "Alert Ranger" button**
   - Modal opens with pre-filled detection details
   - See the mini-map showing alert location

3. **Customize the alert (optional)**
   - Change alert type (poacher_suspected, vehicle_suspected, etc.)
   - Adjust severity (low, medium, high, critical)
   - Add notes (e.g., "2 individuals, armed")

4. **Send the alert**
   - Watch the success toast notification
   - Alert appears in Active Alerts Panel
   - Map marker changes to pulsing red
   - Button changes to "View Alert"

### Explore Active Alerts

1. **Open the Active Alerts Panel** (right sidebar)
   - See 4 active alerts with status badges
   - Color-coded by severity

2. **Click on an alert**
   - Map focuses on alert location
   - Detail panel opens with full information
   - Timeline shows alert progression

3. **Check Recently Resolved**
   - See RG-101 (resolved 2 hours ago)
   - Shows resolution notes

### Watch Real-Time Updates

The system polls for alert updates every **10 seconds**. In a real scenario with a backend:
- Alert statuses would update automatically
- Ranger positions would move
- New detections would appear

---

## 📊 Analytics Dashboard

View the Analytics page to see:
- **Total Detections Today:** 15
- **Rhino Count:** 8 (safe)
- **Threat Detections:** 7 (active monitoring)
- **Active Alerts:** 4 (2 critical, 1 high, 1 medium)
- **Resolved Today:** 1 (100% success rate)
- **Avg Response Time:** 8.5 minutes
- **Rangers on Duty:** 4 teams

---

## 🔧 Configuration

### Enable/Disable Mock Data

**`.env.local`**
```env
# Set to 'true' for mock data (no backend needed)
# Set to 'false' to connect to real backend
VITE_USE_MOCK_DATA=true

VITE_API_URL=http://localhost:8000
```

### Mock Data Location

All mock data is loaded from:
```
/public/mock_data.json
```

This file contains:
- 15 detections
- 6 alerts (various stages)
- 4 ranger teams
- 3 zone definitions
- Complete timeline
- Analytics summary

### Fallback Behavior

Even with `VITE_USE_MOCK_DATA=false`, the frontend gracefully falls back to mock data if:
- Backend is not running
- API returns 404
- Network error occurs

This ensures the demo always works!

---

## 🎨 Visual Features

### Map Features
- **Pan and zoom** - Explore the reserve
- **Click markers** - View detection details
- **Popup alerts** - Create alerts from map
- **Legend** - Visual guide to markers
- **Responsive** - Works on mobile, tablet, desktop

### Alert Features
- **Color-coded severity**
  - 🔴 Critical (red)
  - 🟠 High (orange)
  - 🟡 Medium (yellow)
  - 🟢 Low (green)

- **Status badges**
  - Created (gray)
  - Sent (yellow)
  - Acknowledged (orange)
  - In Progress (purple)
  - Resolved (green)

### Animations
- **Pulsing markers** for active alerts
- **Smooth map transitions**
- **Toast notifications** for user actions
- **Loading states** during API calls

---

## 📝 Mock Data Customization

### Adding New Detections

Edit `/public/mock_data.json`:

```json
{
  "id": "det_016",
  "class_name": "rhino",  // or "poacher", "vehicle", "human"
  "confidence": 0.92,
  "gps_lat": -23.8900,
  "gps_lng": 31.5300,
  "timestamp": "2025-11-18T12:00:00Z",
  "image_path": "https://images.unsplash.com/...",
  "zone": "Your Zone Name"
}
```

### Creating New Alerts

```json
{
  "id": "RG-107",
  "detection_id": "det_016",
  "type": "poacher_suspected",
  "severity": "critical",
  "status": "sent",  // created, sent, acknowledged, in_progress, resolved
  "location": {
    "lat": -23.8900,
    "lng": 31.5300,
    "zoneLabel": "Your Zone"
  },
  "created_at": "2025-11-18T12:00:00Z",
  "updated_at": "2025-11-18T12:00:00Z",
  "created_by": "Operator 1",
  "notes": "Your custom notes"
}
```

### Adding Rangers

```json
{
  "id": "ranger_echo",
  "name": "Ranger Echo Team",
  "team_lead": "John Doe",
  "status": "on_patrol",  // at_base, on_patrol, responding, acknowledged
  "gps_lat": -23.8850,
  "gps_lng": 31.5250,
  "last_update": "2025-11-18T12:00:00Z",
  "assigned_alert": null,  // or "RG-107"
  "vehicle": "Patrol Truck Echo-5"
}
```

---

## 🧪 Testing Checklist

- [x] Map loads with all 15 detections
- [x] Green markers for rhinos
- [x] Red markers for threats
- [x] Alert markers show correct colors
- [x] Click detection opens popup
- [x] "Alert Ranger" button appears on threats
- [x] Alert modal opens with correct data
- [x] Alert creation succeeds
- [x] Success toast appears
- [x] Active Alerts panel updates
- [x] Map marker changes after alert
- [x] Detail panel shows full info
- [x] Ranger positions visible on map
- [x] Ranger-to-alert lines for in_progress
- [x] Polling refreshes every 10 seconds
- [x] Recently Resolved shows completed alerts
- [x] Analytics page displays stats
- [x] Mobile responsive layout works

---

## 🐛 Troubleshooting

### Map not loading
- Check browser console for errors
- Ensure Leaflet CSS is loaded
- Verify mock_data.json is accessible

### Detections not showing
- Check `.env.local` has `VITE_USE_MOCK_DATA=true`
- Restart dev server after env changes
- Check console for "MockData loaded" message

### Images not loading
- Using external Unsplash URLs (requires internet)
- Check network tab for failed requests
- Images may load slowly on first visit

### Alerts not creating
- Check console for error messages
- Verify mock data structure is correct
- Ensure AlertRangerContext is wrapped around app

---

## 🎯 Demo Presentation Tips

1. **Start with the Dashboard**
   - Show the map with all detections
   - Point out green rhinos vs red threats

2. **Highlight Active Threats**
   - Click on det_006 (poacher in Zone B)
   - Show alert RG-102 in progress
   - Point to Ranger Bravo Team en route

3. **Create a New Alert**
   - Click det_009 (human detection)
   - Walk through the alert modal
   - Show real-time update in panel

4. **Show the Complete Flow**
   - Open RG-101 (resolved alert)
   - Show timeline from detection → resolution
   - Explain the 8.5 minute response time

5. **Demonstrate Analytics**
   - Switch to Analytics page
   - Show threat statistics
   - Highlight ranger efficiency

---

## 🚀 Next Steps for Backend Integration

When backend is ready, simply:

1. Set `VITE_USE_MOCK_DATA=false` in `.env.local`
2. Update `VITE_API_URL` to your backend URL
3. Implement these endpoints:
   - `POST /alerts/trigger`
   - `GET /alerts`
   - `GET /detections`
   - `GET /rangers/positions` (optional)

The frontend will automatically switch to real data!

---

## 📚 Key Files

```
rhinoguardians-frontend/
├── public/
│   └── mock_data.json              # All mock data
├── src/
│   ├── api/
│   │   ├── client.js               # API client with fallback
│   │   └── mockData.js             # Mock data loader
│   ├── services/
│   │   └── alertRangerService.js   # Alert API abstraction
│   ├── context/
│   │   └── AlertRangerContext.jsx  # Alert state management
│   ├── components/
│   │   ├── Map.jsx                 # Interactive map
│   │   ├── AlertConfirmModal.jsx   # Alert creation
│   │   └── ActiveAlertsPanel.jsx   # Alert monitoring
│   └── pages/
│       └── Dashboard.jsx           # Main view
├── .env.local                      # Environment config
└── DEMO_GUIDE.md                   # This file
```

---

**Built for AI Genesis Hackathon 2025** 🦏

*Protecting wildlife through AI-powered detection and rapid ranger response.*
