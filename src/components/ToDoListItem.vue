<script setup>
// import { ref } from 'vue'
defineProps({
  name: String
})
</script>

<template>
  <li>{{ name }}</li>
</template>
