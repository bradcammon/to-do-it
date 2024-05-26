import { defineStore } from 'pinia'
import { useConvexQuery, useConvexMutation } from '@convex-vue/core'
import { api } from '../../convex/_generated/api'
import { watchEffect } from 'vue'

const debugMode = true

function logger(label: string = '', logItem: any = null) {
  if (debugMode) {
    console.log(label, logItem)
  }
}

interface Item {
  id: string
  name: string
  completed: boolean
  _creationTime?: number
  _id?: string
}

export let useToDoStore = defineStore('toDo', {
  state() {
    return {
      items: [] as Item[],
      currentTag: 'all' as string,
      todos: [] as Item[],
      isLoading: true
    }
  },
  getters: {
    activeItemsFilter: (state): Item[] => state.items.filter((x) => x.completed == false),
    completedItemsFilter: (state): Item[] => state.items.filter((x) => x.completed == true),
    allItemsFilter: (state): Item[] => state.items,
    filteredItems(): Item[] {
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
    async fillFromConvex() {
      // TODO: handle errors etc
      const { data, isLoading, error, suspense } = useConvexQuery(
        api.todos.get, // the query name
        {} // query arguments, if no arguments you need to pass an empty object. It can be ref
      )

      watchEffect(() => {
        if (!isLoading.value) {
          this.isLoading = isLoading.value
          this.items = data.value
        }
      })
    }
  }
})

// TODO: If there is a network interruption during an attempt to update the backend,
// how to handle synchronizing the state of the local store and the backend at a later time?
