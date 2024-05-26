<script setup>
import { useToDoStore } from '@/stores/ToDoStore'

let toDo = useToDoStore()

// export default {
//   data: () => ({
//     tab: null
//   })
// }
</script>

<template>
  <v-card>
    <v-tabs v-model="toDo.currentTag" bg-color="primary">
      <v-tab @click="toDo.currentTag = 'all'" value="one"
        >All ({{ toDo.allItemsFilter.length }})</v-tab
      >
      <v-tab @click="toDo.currentTag = 'active'" value="two"
        >Active ({{ toDo.activeItemsFilter.length }})</v-tab
      >
      <v-tab @click="toDo.currentTag = 'completed'" value="three"
        >Completed ({{ toDo.completedItemsFilter.length }})</v-tab
      >
    </v-tabs>

    <!-- <v-card-text>
      <v-tabs-window v-model="toDo.currentTag">
        <v-tabs-window-item value="one"> One </v-tabs-window-item>

        <v-tabs-window-item value="two"> Two </v-tabs-window-item>

        <v-tabs-window-item value="three"> Three </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text> -->
  </v-card>
</template>
