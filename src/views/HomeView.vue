<template>
  <div class="home-view">
    <HeroSection @detect-location="handleDetectLocation" />
    <ResultsSection
      :show-results="showResults"
      :location-data="locationData"
      :gps-data="gpsData"
      @close-results="closeResults"
    />
    <DownloadBanner />
    <FAQSection />
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import ResultsSection from '../components/ResultsSection.vue'
import DownloadBanner from '../components/DownloadBanner.vue'
import FAQSection from '../components/FAQSection.vue'

const showResults = ref(false)

const locationData = reactive({
  address: '',
  lat: 0,
  lng: 0,
  accuracy: 0,
  floodRisk: 'medium',
  waterLevel: 'normal'
})

const gpsData = reactive({
  accuracy: 0,
  accuracyLevel: 'medium',
  signal: 'medium'
})

const handleDetectLocation = async data => {
  Object.assign(locationData, data.location)
  Object.assign(gpsData, data.gps)
  showResults.value = true

  // Scroll to results after DOM update
  await nextTick()
  const resultsElement = document.querySelector('.results-section')
  if (resultsElement) {
    resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const closeResults = () => {
  showResults.value = false
}
</script>

<style scoped>
.home-view {
  flex: 1;
}
</style>
