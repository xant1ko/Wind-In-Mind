<template>
  <v-app-bar class="pa-4" location="bottom">
    <template #prepend>
      <v-toolbar-title class="pa-2">
        <h3 class="cursor ml-4 text-white" @click="router.push('/')">Wind In Mind</h3>
      </v-toolbar-title>
    </template>
    <template #default>
      <div class="d-flex ga-2">
        <v-tooltip v-for="p in pages" :key="p.path" location="top center">
          <template #activator="{ props: activatorProps }">
            <v-btn
              v-bind="activatorProps"
              :icon="p.icon"
              size="x-large"
              variant="tonal"
              @click="router.push(p.path)"
            />
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
  import { ref } from 'vue'
  import router from '@/router'

  const userName = ref('Самурай Дятлов')

  // const route = useRoute();

  const pages = [
    {
      icon: 'mdi-calendar-blank',
      title: 'Задачи',
      path: '/task',
    },
    {
      icon: 'mdi-note-outline',
      title: 'Заметки',
      path: '/notes',
    },
    {
      icon: 'mdi-label-outline',
      title: 'Лейблы',
      path: '/labels',
    },
  ]
</script>
