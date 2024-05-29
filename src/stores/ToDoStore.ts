import { defineStore } from 'pinia'
import { useConvexQuery, useConvexMutation } from '@convex-vue/core'
import { api } from '../../convex/_generated/api'
import { watchEffect } from 'vue'

interface Item {
  name: string
  completed: boolean
  created?: number
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
      const { data, isLoading, error, suspense } = useConvexQuery(api.todos.get, {})
      if (error.value) {
        console.log('error from fillFromConvex', error)
      }

      watchEffect(() => {
        if (!isLoading.value) {
          this.isLoading = isLoading.value
          this.items = data.value
        }
      })
    }
  }
})
