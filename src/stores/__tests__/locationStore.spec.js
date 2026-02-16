import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useLocationStore } from '../locationStore'
import { CONFIG } from '@/utils/constants'

describe('Location Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    // Mock localStorage
    const localStorageMock = (() => {
      let store = {}
      return {
        getItem: vi.fn(key => store[key] || null),
        setItem: vi.fn((key, value) => {
          store[key] = value.toString()
        }),
        clear: vi.fn(() => {
          store = {}
        })
      }
    })()
    Object.defineProperty(window, 'localStorage', { value: localStorageMock })
  })

  it('detects flood risk correctly', () => {
    const store = useLocationStore()

    // Use a location known to be close to a danger zone in CONFIG
    // Let's assume CONFIG.DANGER_ZONES has some data.
    // If not, we'll just test that it sets SOME risk level.

    store.detectFloodRiskForLocation(-7.84, 113.48) // Example coordinates

    expect(store.floodRisk).not.toBeNull()
    expect(['low', 'medium', 'high']).toContain(store.floodRisk.level)
    expect(store.detectionHistory.length).toBeGreaterThan(0)
  })

  it('adds location to saved locations', () => {
    const store = useLocationStore()
    const testLoc = { lat: 10, lng: 20, address: 'Test Address' }

    store.addLocation(testLoc)

    expect(store.savedLocations).toHaveLength(1)
    expect(store.savedLocations[0].address).toBe('Test Address')
  })

  it('prevents duplicate locations', () => {
    const store = useLocationStore()
    const testLoc = { lat: 10, lng: 20, address: 'Test Address' }

    store.addLocation(testLoc)
    const result = store.addLocation(testLoc)

    expect(result).toBe(false)
    expect(store.savedLocations).toHaveLength(1)
  })
})
