/**
 * Mock data for development and testing
 * Loads comprehensive mock data from mock_data.json
 * Replace with real API calls when backend is ready
 */

let mockDataCache = null

/**
 * Load mock data from JSON file
 */
const loadMockData = async () => {
  if (mockDataCache) {
    return mockDataCache
  }

  try {
    const response = await fetch('/mock_data.json')
    if (!response.ok) {
      throw new Error('Failed to load mock data')
    }
    mockDataCache = await response.json()
    console.log('[MockData] Loaded comprehensive mock data:', mockDataCache)
    return mockDataCache
  } catch (error) {
    console.error('[MockData] Failed to load mock_data.json, using fallback:', error)
    // Fallback to minimal mock data if JSON file fails to load
    return {
      detections: [],
      alerts: [],
      rangers: [],
      zones: [],
      analytics: {
        total_detections_today: 0,
        rhino_detections: 0,
        threat_detections: 0,
        active_alerts: 0
      }
    }
  }
}

/**
 * Get mock detections
 */
export const getMockDetections = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  const data = await loadMockData()
  return data.detections || []
}

/**
 * Get mock alerts
 */
export const getMockAlerts = async (filters = {}) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const data = await loadMockData()
  let alerts = data.alerts || []

  // Apply filters if provided
  if (filters.status) {
    alerts = alerts.filter(alert => alert.status === filters.status)
  }

  if (filters.limit) {
    alerts = alerts.slice(0, filters.limit)
  }

  return alerts
}

/**
 * Get mock ranger positions
 */
export const getMockRangers = async () => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const data = await loadMockData()
  return data.rangers || []
}

/**
 * Get mock zones
 */
export const getMockZones = async () => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const data = await loadMockData()
  return data.zones || []
}

/**
 * Get mock analytics
 */
export const getMockAnalytics = async () => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const data = await loadMockData()
  return data.analytics || {
    total_detections_today: 0,
    rhino_detections: 0,
    threat_detections: 0,
    active_alerts: 0,
    resolved_alerts_today: 0,
    average_response_time_minutes: 0,
    rangers_on_duty: 0,
    threat_level: 'normal'
  }
}

/**
 * Get mock timeline
 */
export const getMockTimeline = async () => {
  await new Promise(resolve => setTimeout(resolve, 300))
  const data = await loadMockData()
  return data.timeline || []
}

/**
 * Simulate creating a new alert
 * This adds a new alert to the mock data temporarily (in memory)
 */
export const createMockAlert = async (alertData) => {
  await new Promise(resolve => setTimeout(resolve, 500))

  const data = await loadMockData()

  // Generate new alert ID
  const alertCount = data.alerts?.length || 0
  const newAlertId = `RG-${String(alertCount + 101).padStart(3, '0')}`

  const newAlert = {
    id: newAlertId,
    detection_id: alertData.detection_id,
    type: alertData.type || 'unknown_threat',
    severity: alertData.severity || 'medium',
    status: 'created',
    location: alertData.location,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: alertData.createdBy || 'Operator 1',
    notes: alertData.notes || '',
    acknowledged_at: null,
    in_progress_at: null,
    resolved_at: null,
    ranger_assigned: null,
    delivery_channel_status: []
  }

  // Add to cache (temporary, will reset on page reload)
  if (data.alerts) {
    data.alerts.unshift(newAlert)
  }

  console.log('[MockData] Created mock alert:', newAlert)
  return newAlert
}

/**
 * Simulate updating alert status
 */
export const updateMockAlertStatus = async (alertId, updates) => {
  await new Promise(resolve => setTimeout(resolve, 400))

  const data = await loadMockData()

  if (data.alerts) {
    const alertIndex = data.alerts.findIndex(a => a.id === alertId)
    if (alertIndex >= 0) {
      data.alerts[alertIndex] = {
        ...data.alerts[alertIndex],
        ...updates,
        updated_at: new Date().toISOString()
      }
      console.log('[MockData] Updated mock alert:', data.alerts[alertIndex])
      return data.alerts[alertIndex]
    }
  }

  throw new Error(`Alert ${alertId} not found`)
}
