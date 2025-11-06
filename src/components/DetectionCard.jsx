export default function DetectionCard({ detection, isSelected, onClick }) {
  return (
    <div
      className={`detection-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="detection-header">
        <span className={`badge badge-${detection.class_name}`}>
          {detection.class_name.toUpperCase()}
        </span>
        <span className="confidence">{(detection.confidence * 100).toFixed(1)}%</span>
      </div>
      <div className="detection-details">
        <p><strong>ID:</strong> {detection.id}</p>
        <p><strong>Location:</strong> {detection.gps_lat.toFixed(4)}, {detection.gps_lng.toFixed(4)}</p>
        <p><strong>Time:</strong> {new Date(detection.timestamp).toLocaleString()}</p>
      </div>
    </div>
  )
}
