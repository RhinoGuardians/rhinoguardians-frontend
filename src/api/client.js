import axios from 'axios'
import {
  getMockDetections,
  getMockAlerts,
  getMockAnalytics,
  getMockRangers,
  createMockAlert
} from './mockData'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true'

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url)
    return config
  },
  (error) => {
    console.error('API Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url)
    return response
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.message)

    if (error.response) {
      // Server responded with error
      throw new Error('Server error: ' + error.response.status + ' ' + (error.response.data?.message || ''))
    } else if (error.request) {
      // Request made but no response
      throw new Error('No response from server. Check if backend is running.')
    } else {
      // Error in request setup
      throw new Error('Request failed: ' + error.message)
    }
  }
)

/**
 * Fetch all detections with optional filters
 */
export const fetchDetections = async (filters = {}) => {
  // Use mock data if configured or if backend is unavailable
  if (USE_MOCK_DATA) {
    console.log('[API Client] Using mock detections (VITE_USE_MOCK_DATA=true)')
    return await getMockDetections()
  }

  try {
    const response = await api.get('/detections/', { params: filters })
    return response.data.detections || response.data
  } catch (error) {
    console.warn('[API Client] Backend unavailable, falling back to mock detections')
    return await getMockDetections()
  }
}

/**
 * Upload an image for detection
 */
export const uploadImage = async (file, gpsLat, gpsLng) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('gps_lat', gpsLat)
    formData.append('gps_lng', gpsLng)

    const response = await api.post('/upload/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    return response.data
  } catch (error) {
    console.error('Failed to upload image:', error)
    throw error
  }
}

/**
 * Fetch alerts
 */
export const fetchAlerts = async (limit = 20) => {
  // Use mock data if configured or if backend is unavailable
  if (USE_MOCK_DATA) {
    console.log('[API Client] Using mock alerts (VITE_USE_MOCK_DATA=true)')
    return await getMockAlerts({ limit })
  }

  try {
    const response = await api.get('/alerts/', { params: { limit } })
    return response.data.alerts || response.data
  } catch (error) {
    console.warn('[API Client] Backend unavailable, falling back to mock alerts')
    return await getMockAlerts({ limit })
  }
}

/**
 * Fetch analytics data
 */
export const fetchAnalytics = async () => {
  // Use mock data if configured or if backend is unavailable
  if (USE_MOCK_DATA) {
    console.log('[API Client] Using mock analytics (VITE_USE_MOCK_DATA=true)')
    return await getMockAnalytics()
  }

  try {
    const response = await api.get('/analytics/')
    return response.data
  } catch (error) {
    console.warn('[API Client] Backend unavailable, falling back to mock analytics')
    return await getMockAnalytics()
  }
}

/**
 * Fetch ranger positions
 */
export const fetchRangerPositions = async () => {
  // Use mock data if configured or if backend is unavailable
  if (USE_MOCK_DATA) {
    console.log('[API Client] Using mock rangers (VITE_USE_MOCK_DATA=true)')
    return await getMockRangers()
  }

  try {
    const response = await api.get('/rangers/positions')
    return response.data.rangers || response.data
  } catch (error) {
    console.warn('[API Client] Backend unavailable, falling back to mock rangers')
    return await getMockRangers()
  }
}

export default api
