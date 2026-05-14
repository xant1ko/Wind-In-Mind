<template>
  <v-container>
    <h1 class="text-center">
      Задачи
    </h1>
    <div class="ga-4 my-4 d-flex justify-space-between align-center">
      <v-btn @click="isEditItem = true" class="secondary" icon="mdi-plus" size="large" variant="text" />
      <v-text-field hide-details label="Поиск по задачам" rounded variant="outlined" />
    </div>
    <div v-if="tasks">
      <section>
        <task-list-component :items="tasks.unDone" title="Задачи сейчас" />
      </section>
      <section>
        <task-list-component :items="tasks.done" title="Выполненные сегодня" />
      </section>
    </div>

  </v-container>

  <v-dialog max-width="600" v-model="isEditItem" scrim="black">
    <v-card class="pa-4">
      <h2>Создать тасочку</h2>
      <v-text-field label="Название" v-model="dataToSend.title" class="secondary" variant="solo-filled" />
      <v-textarea label="Описание" v-model="dataToSend.description" class="secondary" variant="solo-filled" />
      <v-select v-model="dataToSend.priority" label="Приоритетность" item-value="value" :items="priorities"
        variant="solo-filled" />
      <switcher-component v-model="dataToSend.isDone" label="Готовность" />
      <v-btn @click="sendData()" class="mt-5" block>Отправить</v-btn>
      {{ dataToSend }}
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";
import TaskListComponent from "../components/TaskListComponent.vue";
import type { Task } from "@/utils/types";
import SwitcherComponent from "@/components/SwitcherComponent.vue";
import { emitter } from "@/main";
import { TASK_GET_FILTERED_LIST } from "@/api/getObjects";

const dataToSend = ref<Task>({
  title: "",
  description: "",
  isDone: false,
  priority: "longDistance",
  dateCompleted: "",
});

const priorities = [
  {
    title: 'Приоритет',
    value: 'firstPlan'
  },
  {
    title: 'Второй план',
    value: 'secondplan'
  },
  {
    title: 'в долгую',
    value: 'longDistance'
  },
]

const isEditItem = ref();

const tasks = ref<{done:any; unDone: any}>();

function sendData() {
  axios.post('/api/task/create', dataToSend.value).then(() => {
    alert('Успех')
  }).catch(() => alert('Ошибка! Успех!'))
}

emitter.on('update', () => {
  getTaskList()
})

function getTaskList() {
  axios
    .get(TASK_GET_FILTERED_LIST)
    .then((r) => {
      tasks.value = r.data;
    })
    .catch(() => {
      console.log("Ошибка! Успех!");
    });
}

onMounted(() => {
  getTaskList();
});
</script>
