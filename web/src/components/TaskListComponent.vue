<template>
  <v-list rounded v-model:opened="isOpen">
    <v-list-group prepend-icon="mdi-delete" >
      <template #activator="{ props }">
        <v-list-item prepend-icon="mdi-folder" :title="title" v-bind="props"/>
      </template>
      <v-list-group class="pa-4" value="fuck">
        <div class="d-flex-column">
          <task-card-component :task="task" v-for="task in items" />
        </div>
        <!-- <i>Ни одной задачи! Бездельник, блять!</i> -->
      </v-list-group>
    </v-list-group>
  </v-list>
</template>

<script setup lang="ts">
import type { Task } from "@/utils/types";
import { ref } from "vue";
import TaskCardComponent from "./TaskCardComponent.vue";

const props = defineProps<{
  title: string;
  items: Task[];
}>();

const isOpen = ref(["fuck"]);


</script>
