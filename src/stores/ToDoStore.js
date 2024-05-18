import { defineStore } from 'pinia'
const apiUrl = 'http://localhost:3000/items'

export let useToDoStore = defineStore('toDo', {
  state() {
    return {
      items: []
    }
  },
  actions: {
    async fill() {
      const response = await fetch(apiUrl)
      const items = await response.json()
      this.items = items
    },
    async sendToDoToServer(toDoSubject) {
      const data = {
        name: toDoSubject,
        completed: false,
        id: this.generateUUID()
      }
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      console.log(response)
    },
    generateUUID() {
      return self.crypto.randomUUID()
    }
  }
})
