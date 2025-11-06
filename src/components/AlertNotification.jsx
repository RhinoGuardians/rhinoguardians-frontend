export default function AlertNotification({ alert }) {
  return (
    <div className={`alert alert-${alert.type}`}>
      <span>{alert.message}</span>
    </div>
  )
}
