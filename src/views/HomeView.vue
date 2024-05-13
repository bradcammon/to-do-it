<script setup>
import { ref } from 'vue'

let food = ref('')

function write() {
  localStorage.setItem('foodInput', food.value)
}
</script>

<template>
  <main>
    <p>What is your favorite food? <input type="text" v-model="food" @input="write" /></p>
  </main>
</template>
