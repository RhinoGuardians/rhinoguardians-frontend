import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Map from './components/Map'
import DetectionCard from './components/DetectionCard'
import AlertNotification from './components/AlertNotification'
import { fetchDetections } from './api/client'

export default function App() {
  const [detections, setDetections] = useState([])
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedDetection, setSelectedDetection] = useState(null)

  useEffect(() => {
    loadDetections()
  }, [])

  const loadDetections = async () => {
    setLoading(true)
    try {
      const data = await fetchDetections({ limit: 50 })
      setDetections(data)
    } catch (error) {
      console.error('Error loading detections:', error)
      setAlerts([{ type: 'error', message: 'Failed to load detections' }])
    }
    setLoading(false)
  }

  return (
    <div className="app">
      <Header />

      <div className="dashboard">
        <div className="map-container">
          <Map detections={detections} onMarkerClick={setSelectedDetection} />
        </div>

        <div className="sidebar">
          <div className="controls">
            <button onClick={loadDetections} className="btn btn-primary">
              Refresh Detections
            </button>
          </div>

          <div className="detections-list">
            <h3>Recent Detections ({detections.length})</h3>
            {loading ? (
              <p>Loading...</p>
            ) : (
              detections.map((detection) => (
                <DetectionCard
                  key={detection.id}
                  detection={detection}
                  isSelected={selectedDetection?.id === detection.id}
                  onClick={() => setSelectedDetection(detection)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {alerts.map((alert, idx) => (
        <AlertNotification key={idx} alert={alert} />
      ))}
    </div>
  )
}
