<template>
  <div :class="[getBorderColor(task.priority), task.isDone ? 'doneTaskCard' : '']">
    <v-card
      class="pa-4 d-flex justify-space-between align-center"
    >
      <div>
        <h2 v-if="task.description">{{ task.title }}</h2>
        <h2 v-else>{{ task.title }}</h2>
        <p style="color:#999999">{{ task.description }}</p>
      </div>
      <div class="d-flex ga-1">
        <v-btn icon="mdi-check" @click="markTaskIsDone(task.uid)" />
        <v-btn icon="mdi-delete-outline" @click="deleteTask(task.uid)" />
        <v-btn icon="mdi-arrow-right" />

      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
  import type { Task } from '@/utils/types'
  import axios from 'axios'
  import { emitter } from '@/main'

  defineProps<{
    task: Task
  }>()

  async function markTaskIsDone (uid: string | undefined) {
    await axios.post(`/api/task/resolve/${uid}`)
    await emitter.emit('update')
  }

  async function deleteTask (uid: string | undefined) {
    await axios.post(`/api/task/delete/${uid}`)
    await emitter.emit('update')
  }

  function getBorderColor (priority?: string) {
    switch (priority) {
      case 'firstPlan': {
        return 'borderFirstPlan'
      }
      case 'secondplan': {
        return 'borderSecondplan'
      }
      case 'longDistance': {
        return 'borderLongDistance'
      }
    }
  }
</script>
