import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { icon } from 'leaflet'

const rhinoIcon = icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const threatIcon = icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

export default function Map({ detections = [], onMarkerClick }) {
  const center = [-23.8859, 31.5205] // Serengeti

  const getIcon = (className) => {
    return className === 'rhino' ? rhinoIcon : threatIcon
  }

  return (
    <MapContainer center={center} zoom={10} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {detections.map((detection) => (
        <Marker
          key={detection.id}
          position={[detection.gps_lat, detection.gps_lng]}
          icon={getIcon(detection.class_name)}
          eventHandlers={{ click: () => onMarkerClick(detection) }}
        >
          <Popup>
            <div>
              <strong>{detection.class_name}</strong>
              <br />
              Confidence: {(detection.confidence * 100).toFixed(1)}%
              <br />
              {new Date(detection.timestamp).toLocaleString()}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
