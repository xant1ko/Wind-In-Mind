<template>
  <v-container>
    <div class="ga-4 mb-4 d-flex justify-space-between align-center">
      <v-btn
        @click="isEditItem = true"
        class="secondary"
        icon="mdi-plus"
        size="large"
        variant="text"
      />
      <v-text-field
        hide-details
        label="Поиск по задачам"
        rounded
        variant="outlined"
      />
    </div>
    <section id="first-plan-priority">
      <task-list-component :items="tasks" title="Приоритетные задачи" />
    </section>
    <!-- <section class="my-4" id="second-plan-priority">
      <task-list-component title="Задачи второго плана"/>
    </section>
    <section id="second-plan-priority">
      <task-list-component title="Задачи в долгую"/>
    </section> -->
  </v-container>

  <v-dialog max-width="600" v-model="isEditItem" scrim="black">
    <v-card class="pa-4">
      <h2 >Создать тасочку</h2>
      <v-text-field
        label="Название"
        v-model="dataToSend.title"
        class="secondary"
        variant="solo-filled"
      />
      <v-textarea
        label="Описание"
        v-model="dataToSend.description"
        class="secondary"
        variant="solo-filled"
      />
      <v-select v-model="dataToSend.priority" label="Приоритетность" item-value="value" :items="priorities" variant="solo-filled"/>
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

const tasks = ref();

function sendData() {
  axios.post('/api/task/create',dataToSend.value).then(()=>{
    alert('Успех')
  }).catch(()=>alert('Ошибка! Успех!'))
}

function getTaskList() {
  axios
    .get("/api/task/get-list")
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
