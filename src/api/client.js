import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const client = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetchDetections = async (params = {}) => {
  try {
    const response = await client.get('/detections/', { params })
    return response.data.detections || []
  } catch (error) {
    console.error('Error fetching detections:', error)
    throw error
  }
}

export const uploadImage = async (file, gpsLat = 0, gpsLng = 0) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('gps_lat', gpsLat)
    formData.append('gps_lng', gpsLng)

    const response = await client.post('/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data.detections
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}

export const fetchAlerts = async (params = {}) => {
  try {
    const response = await client.get('/alerts/', { params })
    return response.data.alerts || []
  } catch (error) {
    console.error('Error fetching alerts:', error)
    throw error
  }
}

export default client
