import { useState, useEffect } from 'react'

export const useAlerts = () => {
  const [alerts, setAlerts] = useState([])

  const addAlert = (type, message, duration = 5000) => {
    const id = Date.now()
    const alert = { id, type, message }
    setAlerts((prev) => [...prev, alert])

    if (duration > 0) {
      setTimeout(() => removeAlert(id), duration)
    }
    return id
  }

  const removeAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id))
  }

  return { alerts, addAlert, removeAlert }
}
