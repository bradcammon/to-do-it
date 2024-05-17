import { defineStore } from 'pinia'

export let useToDoStore = defineStore('toDo', {
  state() {
    return {
      items: [
        {
          name: 'John Doe (from the store)',
          completed: false,
          id: 1
        },
        {
          name: 'Faith Evans (from the store)',
          completed: false,
          id: 2
        }
      ]
    }
  }
})
