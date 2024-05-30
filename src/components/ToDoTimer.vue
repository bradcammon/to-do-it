<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps({
  completed: Boolean,
  creationTime: Number
})

const WARNING_THRESHOLD = 60
const ALERT_THRESHOLD = 180
let intervalID

const COLOR_CODES = {
  info: {
    color: '#008953' //green
  },
  warning: {
    color: '#F89236', //orange
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: '#DA6084', //red
    threshold: ALERT_THRESHOLD
  }
}

const timePassed = ref(0)

const formattedTimePassed = computed(() => {
  const age = timePassed.value
  const minutes = Math.floor(age / 60)
  let seconds = age % 60

  if (seconds < 10) {
    seconds = `0${seconds}`
  }

  return `${minutes}:${seconds}`
})

const timeColor = computed(() => {
  const { alert, warning, info } = COLOR_CODES

  if (timePassed.value >= warning.threshold && timePassed.value <= alert.threshold) {
    return warning.color
  } else if (timePassed.value >= alert.threshold) {
    return alert.color
  } else {
    return info.color
  }
})

const isToDoItemCompleted = computed(() => props.completed)

function startTimer() {
  intervalID = setInterval(() => {
    const creationTimeInSeconds = Math.floor(new Date(props.creationTime) / 1000)
    const nowInSeconds = Math.floor(Date.now() / 1000)
    timePassed.value = nowInSeconds - creationTimeInSeconds
  }, 1000)
}

function stopTimer() {
  clearInterval(intervalID)
  intervalID = null
}

watch(
  () => isToDoItemCompleted.value,
  (newValue) => {
    isToDoItemCompleted.value ? stopTimer() : startTimer()
  }
)

onMounted(() => {
  if (!props.completed) {
    startTimer()
  }
})
</script>

<template>
  <div>
    <span class="timePassed" :style="{ color: timeColor }">{{
      timePassed > 0 ? formattedTimePassed : ''
    }}</span>
  </div>
</template>

<style>
.timePassed {
  font-size: 0.8em;
}
</style>
