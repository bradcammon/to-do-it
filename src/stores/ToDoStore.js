import { defineStore } from 'pinia'
const apiUrl = 'http://localhost:3000/items'

export let useToDoStore = defineStore('toDo', {
  state() {
    return {
      items: [],
      currentTag: 'all'
    }
  },
  getters: {
    activeItemsFilter: (state) => state.items.filter((x) => x.completed == false),
    completedItemsFilter: (state) => state.items.filter((x) => x.completed == true),
    allItemsFilter: (state) => state.items,
    filteredItems() {
      switch (this.currentTag) {
        case 'active':
          return this.activeItemsFilter
        case 'completed':
          return this.completedItemsFilter
        default: // 'all'
          return this.items
      }
    }
  },
  actions: {
    /** Fill the store with data from the backend **/
    async fill() {
      console.log('fill started')
      const response = await fetch(apiUrl)
      const items = await response.json()
      this.items = items
      console.log('fill complete')
    },
    /** A generic fetch method to keep things DRY-ish **/
    async genericFetch(httpMethod, data, url) {
      console.log('genericFetch started')
      const response = await fetch(url, {
        method: httpMethod,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (response.status < 200 || response.status > 299) {
        console.log('Error making request to server', response)
      } else {
        console.log('genericFetch ended')
        return response
      }
    },

    /** Send a new ToDo item to the backend **/
    async sendToDoToServer(data) {
      console.log('sendToDoToServer started')
      const response = await this.genericFetch('POST', data, apiUrl)
      console.log('sendToDoToServer complete')
      return response
    },

    /** Add a new ToDo to the store AND the backend **/
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
        console.log('Error updating API with new ToDo item.', response)
      }
      console.log('addNewToDo complete')
    },

    /** Update an existing ToDo item on the backend **/
    async patchItem(item, data) {
      console.log('patchItem started')
      const itemId = item.id
      const patchApiUrl = apiUrl + '/' + itemId
      const response = await this.genericFetch('PATCH', data, patchApiUrl)

      if (response.status != 200) {
        console.log('Error patching api', response)
      }
      console.log('patchItem complete')
    },

    /** Delete a ToDo item on the backend **/
    async deleteItem(item) {
      const itemId = item.id
      const deleteApiUrl = apiUrl + '/' + itemId
      const response = await fetch(deleteApiUrl, {
        method: 'DELETE'
      })

      if (response.status != 200) {
        console.log('Error deleting item from api')
      }
      console.log('deleteItem complete')
    },

    /** Delete multiple ToDo items on the backend **/
    deleteItems(items) {
      //TODO: it would be nice to do all of this with one bulk request
      for (const item of items) {
        this.deleteItem(item)
      }
    },

    /** Generate a UUID **/
    generateUUID() {
      return self.crypto.randomUUID()
    }
  }
})

// TODO: If there is a network interruption during an attempt to update the backend,
// how to handle synchronizing the state of the local store and the backend at a later time?
