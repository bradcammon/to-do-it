<script setup>
import { ref, onMounted } from 'vue'
import { useConvexMutation } from '@convex-vue/core'
import { api } from '../../convex/_generated/api'
import Timer from './ToDoTimer.vue'

const { mutate: setCompleted, error: setCompleteError } = useConvexMutation(api.todos.setCompleted)
const { mutate: removeTodo, error: removeTodoError } = useConvexMutation(api.todos.remove)

let editMode = ref(false)

defineProps({
  item: Object
})

const inputName = defineModel()
const emit = defineEmits(['editItem'])

async function toggleComplete(item) {
  await setCompleted({ completed: !item.completed, id: item._id })
  if (setCompleteError.value) {
    console.log(setCompleteError.value)
  }
}

async function deleteItem(item) {
  await removeTodo({ id: item._id })
  if (removeTodoError.value) {
    console.log(removeTodoError.value)
  }
}

function submitEdit(item) {
  editMode.value = false
  emit('editItem', item)
}
</script>

<template>
  <div class="itemRow">
    <li v-if="!editMode" class="listItem">
      <input
        class="listItemCheckbox"
        type="checkbox"
        v-model="item.completed"
        @click="toggleComplete(item)"
      />

      <span :class="{ completed: item.completed }" class="listItemName"
        >{{ item.name }}{{ item.timePassed }}</span
      >

      <div>
        <Timer :creationTime="item.created" :completed="item.completed" />
      </div>

      <v-btn
        @click="editMode = true"
        density="comfortable"
        icon="$pencil"
        size="small"
        color="#A17CB1"
        :disabled="item.completed"
      ></v-btn>

      <v-btn
        @click="deleteItem(item)"
        density="comfortable"
        icon="$delete"
        size="small"
        color="#A17CB1"
      ></v-btn>
    </li>

    <div v-else class="editMode">
      <div></div>
      <v-text-field
        density="compact"
        v-model="inputName"
        @keyup.enter="submitEdit(item)"
        variant="outlined"
      ></v-text-field>

      <v-btn
        @click="submitEdit(item)"
        density="comfortable"
        icon="$check"
        size="small"
        color="#96AFB8"
      ></v-btn>

      <v-btn
        @click="editMode = false"
        density="comfortable"
        icon="$closeCircle"
        size="small"
        color="#96AFB8"
      ></v-btn>
    </div>
  </div>
</template>

<style>
.itemRow {
  background-color: white;
  transition: background-color 0.3s;
}

.listItemCheckbox {
  justify-self: center;
  width: 1em;
}
.listItem {
  display: grid;
  grid-template-columns: 0.5fr 8.5fr 1fr 1fr 1fr;
  column-gap: 0.5em;
  margin: 5px 0px;
}

.listItemName {
  color: #334a52;
}
.editMode {
  display: grid;
  grid-template-columns: 0.5fr 9.5fr 1fr 1fr;
  column-gap: 0.5em;
}

.completed {
  color: gray;
  text-decoration: line-through;
}
input[type='checkbox'] {
  accent-color: gray;
}
</style>
