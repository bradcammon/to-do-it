<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps({
  id: String,
  age: Number,
  completed: Boolean
  //   toDoItem: Object
})

const emit = defineEmits(['ageChanged'])
const WARNING_THRESHOLD = 60
const ALERT_THRESHOLD = 180
let intervalID

const COLOR_CODES = {
  info: {
    color: 'green'
  },
  warning: {
    color: 'orange',
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: 'red',
    threshold: ALERT_THRESHOLD
  }
}

const timePassed = ref(props.age)

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

const istoDoItemCompleted = computed(() => props.completed)

function startTimer() {
  intervalID = setInterval(() => (timePassed.value += 1), 1000)
}

function stopTimer() {
  clearInterval(intervalID)
  intervalID = null
}

watch(
  () => timePassed.value,
  (newValue) => {
    emit('ageChanged', newValue, props.id)
  }
)
watch(
  () => istoDoItemCompleted.value,
  (newValue) => {
    stopTimer()
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
    <span :style="{ color: timeColor }">{{ formattedTimePassed }}</span>
  </div>
</template>
