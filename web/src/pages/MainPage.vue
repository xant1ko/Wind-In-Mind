<template>
  <v-container>
    <div class="ga-4 mb-4 d-flex justify-space-between align-center">
      <v-btn class="secondary" icon="mdi-plus" size="large" variant="text" />
      <v-text-field
        hide-details
        label="Поиск по задачам"
        rounded
        variant="outlined"
      />
    </div>
    <section id="first-plan-priority">
      <task-list-component :items="useTasksStore().firstPlanTasks" title="Приоритетные задачи"/>
    </section>
    <section class="my-4" id="second-plan-priority">
      <task-list-component :items="useTasksStore().secondPlanTasks" title="Задачи второго плана"/>
    </section>
    <section id="second-plan-priority">
      <task-list-component :items="useTasksStore().longDistanceTasks" title="Задачи в долгую"/>
    </section>
  </v-container>
</template>

<script setup lang="ts">
import { useTasksStore } from "@/stores/tasks";
import TaskListComponent from "@/components/TaskListComponent.vue";


</script>
