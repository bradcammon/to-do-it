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
      console.log('fill started')
      const response = await fetch(apiUrl)
      const items = await response.json()
      this.items = items
      console.log('fill complete')
    },
    async sendToDoToServer(data) {
      console.log('sendToDoToServer started')
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      console.log(response)
      console.log('sendToDoToServer complete')
      return response
    },
    async addNewToDo(toDoSubject) {
      console.log('addNewToDo started')
      const data = {
        name: toDoSubject,
        completed: false,
        id: this.generateUUID()
      }
      // 1. Push new item onto the store
      this.items.push({ data })

      // 2. Send new item to the api
      const response = await this.sendToDoToServer(data)

      // 3. If successful, re-fill store from api (TODO: this isn't very efficient, figure out a better way)
      if (response.status == 201) {
        this.fill()
      } else {
        console.log('Error updating API with new ToDo item.')
      }
      console.log('addNewToDo complete')
    },
    async patchItem(item) {
      //TODO: Make this more generic?
      console.log('patchItem started')
      const itemId = item.id
      const patchApiUrl = apiUrl + '/' + itemId
      const data = {
        completed: item.completed
      }
      const response = await fetch(patchApiUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      console.log('response from Patch:', response)
      if (response.status != 200) {
        console.log('Error patching api')
      }
      console.log('patchItem complete')
    },
    async updateItemName(item) {
      //TODO: Make this more generic?
      console.log('updateItemName started')
      const itemId = item.id
      const patchApiUrl = apiUrl + '/' + itemId
      const data = {
        name: item.name
      }
      const response = await fetch(patchApiUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      console.log('response from updateItemName:', response)
      if (response.status != 200) {
        console.log('Error with updateItemName api')
      }
      console.log('updateItemName complete')
    },
    async deleteItem(item) {
      const itemId = item.id
      const deleteApiUrl = apiUrl + '/' + itemId
      const response = await fetch(deleteApiUrl, {
        method: 'DELETE'
      })
      console.log('response from Delete:', response)
      if (response.status != 200) {
        console.log('Error deleting item from api')
      }
      console.log('deleteItem complete')
    },
    generateUUID() {
      return self.crypto.randomUUID()
    }
  }
})
