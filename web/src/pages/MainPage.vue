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
      <v-list v-model:opened="isOpen">
        <v-list-group>
          <template #activator="{ props }">
            <v-list-item class="pa-0" v-bind="props">
              <div class="d-flex align-center ga-2">
                <h3>Приоритетные задачи</h3>
                <v-chip size="small">
                  {{ useTasksStore().firstPlanTasks.length }}
                </v-chip>
              </div>
            </v-list-item>
          </template>
          <v-list-group value="firstPlan">
            <v-card
              v-for="task in useTasksStore().firstPlanTasks"
              class="my-4 pa-4"
            >
              <h3>{{ task.title }}</h3>
              <p>{{ task.description }}</p>
            </v-card>
          </v-list-group>
        </v-list-group>
      </v-list>
    </section>
    <section id="second-plan-priority">
      <v-list v-model:opened="isOpen">
        <v-list-group>
          <template #activator="{ props }">
            <v-list-item class="pa-0" v-bind="props">
              <div class="d-flex align-center ga-2">
                <h3>Задачи второго плана</h3>
                <v-chip size="small">
                  {{ useTasksStore().secondPlanTasks.length }}
                </v-chip>
              </div>
            </v-list-item>
          </template>
          <v-list-group value="secondplan">
            <v-card
              v-for="task in useTasksStore().secondPlanTasks"
              class="my-4 pa-4"
            >
              <h3>{{ task.title }}</h3>
              <p>{{ task.description }}</p>
            </v-card>
          </v-list-group>
        </v-list-group>
      </v-list>
    </section>
    <section id="second-plan-priority">
      <v-list v-model:opened="isOpen">
        <v-list-group>
          <template #activator="{ props }">
            <v-list-item class="pa-0" v-bind="props">
              <div class="d-flex align-center ga-2">
                <h3>Задачи в долгую</h3>
                <v-chip size="small">
                  {{ useTasksStore().longDistanceTasks.length }}
                </v-chip>
              </div>
            </v-list-item>
          </template>
          <v-list-group value="longDistance">
            <v-card
              v-for="task in useTasksStore().longDistanceTasks"
              class="my-4 pa-4"
            >
              <h3>{{ task.title }}</h3>
              <p>{{ task.description }}</p>
            </v-card>
          </v-list-group>
        </v-list-group>
      </v-list>
    </section>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTasksStore } from "@/stores/tasks";

const isOpen = ref(["firstPlan", "secondplan", "longDistance"]);
</script>
