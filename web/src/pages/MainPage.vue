<script setup lang="ts">
import { useTasksStore } from "@/stores/tasks";
</script>

<template>
  <v-container>
    <div class="ga-4 mb-4 d-flex justify-space-between align-center">
      <v-text-field
        hide-details
        label="Поиск по организациям"
        rounded
        variant="outlined"
      />
      <v-btn class="secondary" icon="mdi-plus" size="large" variant="text" />
    </div>
    <section id="first-plan-priority">
      <v-card class="ma-4 pa-4" v-for="task in useTasksStore().tasks">
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
      </v-card>
    </section>
  </v-container>
</template>
