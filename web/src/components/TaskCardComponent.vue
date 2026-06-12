<template>
  <div class="parent-wrapper borderSecondplan" :class="[expanded ? 'active' : '']">
    <div class="x-plus-70 borderLongDistance" >
      <div class="x-plus-70" :class="[getBorderColor(task.priority), task.isDone ? 'doneTaskCard' : '', ]">
        <v-card
        @contextmenu.prevent="expanded = !expanded"
        class="x-plus-65 pa-4 d-flex justify-space-between align-center"
        >
      <div>
        <h2 v-if="task.description">{{ task.title }}</h2>
        <h2 v-else>{{ task.title }}</h2>
        <p style="color:#999999">{{ task.description }}</p>
        <div class="mt-2" v-if="task.labels && task.labels.length > 0">
          <v-chip
            v-for="label in task.labels"
            :key="label.uid"
            :color="label.color"
            class="mr-1"
            label
          >{{ label.title }}</v-chip>
        </div>
      </div>
      <div class="d-flex ga-1">
        <v-btn icon="mdi-check" @click="markTaskIsDone(task.uid)" />
        <v-btn icon="mdi-delete-outline" @click="deleteTask(task.uid)" />
        <v-btn icon="mdi-arrow-right" />
      </div>
    </v-card>
  </div>
  </div>

  </div>
</template>

<script setup lang="ts">
  import type { Task } from '@/utils/types'
  import axios from 'axios'
  import { emitter } from '@/main'
  import {ref} from 'vue'

  // TODO useClickOutside

const secondPlan = ref(['borderSecondplan'])
const thirdPlan = ref([ 'borderLongDistance'])

  const expanded = ref(false)

  defineProps<{
    task: Task
  }>()

// x-plus-70
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


<style scoped>

.parent-wrapper{
overflow: hidden;
transition: 0.20s;
}

.x-plus-70, .x-plus-65{
transition: 0.20s;

}

.active .x-plus-70{
transform: translateX(70px);
}
.active .x-plus-65{
transform: translateX(65px);
}



</style>