<template>
  <v-container>
    <h1 class="text-center">
      Задачи
    </h1>
    <div class="ga-4 my-4 d-flex justify-space-between align-center">
      <v-btn
        class="secondary"
        icon="mdi-plus"
        size="large"
        variant="text"
        @click="isEditItem = true"
      />
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

  <v-dialog v-model="isEditItem" max-width="600" scrim="black">
    <v-card class="pa-4">
      <v-form>
        <h2>Создать тасочку</h2>
        <v-text-field
          v-model="dataToSend.title"
          class="secondary"
          label="Название"
          :rules="[valid_rules.required]"
          variant="solo-filled"
        />
        <v-textarea v-model="dataToSend.description" class="secondary" label="Описание" variant="solo-filled" />
        <v-select
          v-model="dataToSend.priority"
          item-value="value"
          :items="priorities"
          label="Приоритетность"
          variant="solo-filled"
        />
        <switcher-component v-model="dataToSend.isDone" label="Готовность" />
        <v-btn block class="mt-5" @click="sendData()">Отправить</v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import type { Task } from '@/utils/types'
  import axios from 'axios'
  import { onMounted, ref } from 'vue'
  import { TASK_GET_FILTERED_LIST } from '@/api/getObjects'
  import SwitcherComponent from '@/components/SwitcherComponent.vue'
  import { emitter } from '@/main'
  import { valid_rules } from '@/utils/validRules'
  import TaskListComponent from '../components/TaskListComponent.vue'

  const dataToSend = ref<Task>({
    title: '',
    description: '',
    isDone: false,
    priority: 'longDistance',
    dateCompleted: '',
  })

  const priorities = [
    {
      title: 'Приоритет',
      value: 'firstPlan',
    },
    {
      title: 'Второй план',
      value: 'secondplan',
    },
    {
      title: 'в долгую',
      value: 'longDistance',
    },
  ]

  const isEditItem = ref()

  const tasks = ref<{ done: any, unDone: any }>()

  function sendData () {
    axios.post('/api/task/create', dataToSend.value).then(() => {
      alert('Успех')
    }).catch(() => alert('Ошибка! Успех!'))
  }

  emitter.on('update', () => {
    getTaskList()
  })

  function getTaskList () {
    axios
      .get(TASK_GET_FILTERED_LIST)
      .then(r => {
        tasks.value = r.data
      })
      .catch(() => {
        console.log('Ошибка! Успех!')
      })
  }

  onMounted(() => {
    getTaskList()
  })
</script>
