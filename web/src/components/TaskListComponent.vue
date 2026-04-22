<template>
  <v-list rounded v-model:opened="isOpen">
    <v-list-group>
      <template #activator="{ props }">
        <v-list-item v-bind="props">
          <div class="d-flex align-center ga-2">
            <h3>{{ title }}</h3>
            <!-- <v-chip size="small"> -->
              <!-- {{ items.length }} -->
            <!-- </v-chip> -->
          </div>
        </v-list-item>
      </template>
      <v-list-group class="pa-4" value="fuck">
        <div class="d-flex-column">
          <!-- Карточка -->
          <v-card
          v-for="task in items"
          :class="[getBorderColor(task.priority), task.isDone? 'doneTaskCard': '']"
            class="pa-4 d-flex justify-space-between align-start"
          >
            <div>
              <h3>{{ task.title }}</h3>
              <p>{{ task.description }}</p>
            </div>
            <div class="d-flex ga-1">
              <v-btn @click="markTaskIsDone(task.uid)" icon="mdi-check"></v-btn>
              <v-btn icon="mdi-arrow-right"></v-btn>
            </div>
          </v-card>

        </div>
      </v-list-group>
    </v-list-group>
  </v-list>
</template>

<script setup lang="ts">
import { emitter } from "@/main";
import type { Task } from "@/utils/types";
import axios from "axios";
import { ref } from "vue";

defineProps<{
  title: string;
  items: Task[];
}>();

const isOpen = ref(["fuck"]);

function markTaskIsDone(uid: string | undefined) {
axios.post(`/api/task/resolve/${uid}`)
emitter.emit('update')
}

function getBorderColor(priority?: string) {
  if (priority === 'firstPlan') {
    return 'borderFirstPlan'
  } else if (priority === 'secondplan') {
    return 'borderSecondplan'
  } else if (priority === 'longDistance') {
    return 'borderLongDistance'
  }

}
</script>
