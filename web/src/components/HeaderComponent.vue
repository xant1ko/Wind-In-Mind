<template>
  <v-app-bar location="bottom" class="pa-4">
    <template #prepend>
      <v-toolbar-title class="pa-2">
        <h3 class="ml-4 text-white">Wind In Mind</h3>
      </v-toolbar-title>
    </template>
    <template #default>
      <div class="d-flex ga-2">
        <v-tooltip v-for="p in pages" :key="p.path" location="top center">
          <template #activator="{ props: activatorProps }">
            <v-btn variant="tonal" size="x-large" v-bind="activatorProps" @click="router.push(p.path)" :icon='p.icon' />
          </template>
          <h2>
            {{ p.title }}
          </h2>
        </v-tooltip>
      </div>
    </template>

    <template #append>
      <v-toolbar-title class="pa-2">
        <h3 class="text-white">{{ userName }}</h3>
      </v-toolbar-title>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "@/router";


const userName = ref("Самурай Дятлов");

// const route = useRoute();

const pages = [
  {
    icon: 'mdi-calendar-blank',
    title: "Задачи",
    path: "/task",
  },
  {
    icon: 'mdi-note-outline',
    title: "Заметки",
    path: "/notes",
  },
];
</script>
