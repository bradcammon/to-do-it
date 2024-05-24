<script setup lang="ts">
import ToDoMainView from './views/ToDoMainView.vue'
import { useConvexQuery } from '@convex-vue/core'
import { useConvexMutation } from '@convex-vue/core'
import { api } from '../convex/_generated/api'

const { data, isLoading } = useConvexQuery(api.tasks.get, {})

// Read the code to understand:
// https://github.com/loicpennequin/convex-vue/blob/d13112dc3aad3f6276e117f007659951aa08bf1e/packages/convex-vue/src/composables/useMutation.ts#L31

const { isLLoading, error, mutate } = useConvexMutation(api.tasks.send, {
  onSuccess() {
    // todo.value = '';
    console.log('success!')
  },
  onError(err) {
    console.error(err)
  }
})

function sendData() {
  console.log('send Data')
  //mutation({ first: "Hello!", second: "me" });
  // mutateSomething({ text: 'go to work', isCompleted: false })
  mutate({ text: 'foobar', isCompleted: false })
}
</script>

<template>
  <div class="wrapper">
    <ul v-if="!isLoading">
      <li v-for="todo in data">{{ todo.text }} {{ todo.isCompleted ? '☑' : '☐' }}</li>
    </ul>
    <span v-else> loading... </span>
    <button @click="sendData">Send Data</button>
  </div>
  <header></header>

  <ToDoMainView />
</template>

<style scoped></style>
