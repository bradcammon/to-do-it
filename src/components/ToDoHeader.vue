<script setup>
import { ref } from 'vue'

const drawer = ref(false)
</script>

<template>
  <div>
    <v-toolbar color="#96AFB8" dark prominent>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="seymour-one-regular">ToDo It</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn> -->
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item title="Brad Cammon" subtitle="Links"></v-list-item>
        <v-divider></v-divider>
        <v-list-item
          prepend-avatar="https://raw.githubusercontent.com/AmineMahdioui/AmineMahdioui/master/.github/images/github-icon-1-logo.svg"
          href="https://github.com/bradcammon/to-do-it"
          target="_blank"
          link
          title="GitHub"
        ></v-list-item>
        <v-list-item
          prepend-avatar="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/240px-LinkedIn_logo_initials.png"
          href="https://linkedin.com/in/bradcammon"
          target="_blank"
          link
          title="LinkedIn"
        ></v-list-item>
        <!-- Add more list items as needed -->
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<style>
.seymour-one-regular {
  font-family: 'Seymour One', sans-serif;
  font-weight: 400;
  font-style: normal;
}

.v-toolbar-title {
  font-size: 2em;
}
</style>
