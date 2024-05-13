import { defineStore } from 'pinia'

export let useToDoStore = defineStore('toDo', {
  state() {
    return {
      items: [
        {
          name: 'John Doe',
          completed: false,
          id: 1
        },
        {
          name: 'Faith Evans',
          completed: false,
          id: 2
        }
      ]
    }
  }
})
