import { useState, useEffect } from 'react'
import { fetchDetections } from '../api/client'

export const useDetections = (limit = 50) => {
  const [detections, setDetections] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadDetections()
  }, [limit])

  const loadDetections = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchDetections({ limit })
      setDetections(data)
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  return { detections, loading, error, refetch: loadDetections }
}
