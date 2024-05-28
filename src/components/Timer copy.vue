<script>
const WARNING_THRESHOLD = 5
const ALERT_THRESHOLD = 10

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

// const TIME_LIMIT = 20

export default {
  setup() {},
  data() {
    return {
      timePassed: 0,
      timerInterval: null
    }
  },

  computed: {
    formattedTimeLeft() {
      const timeLeft = this.timeLeft
      const minutes = Math.floor(timeLeft / 60)
      let seconds = timeLeft % 60

      if (seconds < 10) {
        seconds = `0${seconds}`
      }

      return `${minutes}:${seconds}`
    },

    formattedTimePassed() {
      const timePassed = this.timePassed
      const minutes = Math.floor(timePassed / 60)
      let seconds = timePassed % 60

      if (seconds < 10) {
        seconds = `0${seconds}`
      }

      return `${minutes}:${seconds}`
    },
    timeColor() {
      const { alert, warning, info } = COLOR_CODES

      if (this.timePassed >= warning.threshold && this.timePassed <= alert.threshold) {
        return warning.color
      } else if (this.timePassed >= alert.threshold) {
        return alert.color
      } else {
        return info.color
      }
    }

    // timeLeft() {
    //   return TIME_LIMIT - this.timePassed
    // }
  },

  //   watch: {
  //     timeLeft(newValue) {
  //       if (newValue === 0) {
  //         this.onTimesUp()
  //       }
  //     }
  //   },

  mounted() {
    this.startTimer()
  },

  methods: {
    // onTimesUp() {
    //   clearInterval(this.timerInterval)
    // },

    startTimer() {
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000)
    }
  }
}
</script>

<template>
  <div>
    <span :style="{ color: timeColor }">{{ formattedTimePassed }}</span>
  </div>
</template>
