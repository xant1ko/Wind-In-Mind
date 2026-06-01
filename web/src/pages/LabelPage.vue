<template>

  <v-container>
    <h1 class="text-center">
      Настройка лейблов
    </h1>
    <div class="ga-4 my-4 d-flex justify-space-between align-center">
      <v-btn
        class="secondary"
        icon="mdi-plus"
        size="large"
        variant="text"
        @click="isEditItem = true"
      />
      <v-text-field hide-details label="Поиск по лейблам" rounded variant="outlined" />
    </div>
    <v-data-table :headers="headers" :items="labelsList">
      <template #item.title="{item}">
        <v-chip :color="item.color">
          {{ item.title }}
        </v-chip>
      </template>
    </v-data-table>

  </v-container>

  <v-dialog v-model="isEditItem" max-width="1000">
    <v-form v-model="valid" @submit.prevent="checkDataToValid(labelData,valid, handleCreateLabel)">
      <v-card class="pa-4 d-flex">
        <h2>Создать группу заметок</h2>

        <v-text-field v-model="labelData.title" label="Название" :rules="[valid_rules.required]" variant="solo-filled" />
        <v-textarea v-model="labelData.description" label="Описание" :rules="[valid_rules.required]" variant="solo-filled" />
        <v-select
          v-model="labelData.type"
          item.title="title"
          :items="labelTypes"
          label="Тип"
          :rules="[valid_rules.required]"
          variant="solo-filled"
        />
        <div class="d-flex ga-1 wrap mb-4">
          <v-chip
            v-for="value in colors"
            :color="value.color"
            size="small"
            :text="value.title"
            @click="labelData.color = value.color"
          />
        </div>
        <v-color-picker
          v-model="labelData.color"
          hide-inputs
          hide-title
          :rules="[valid_rules.required]"
          style="width: 100%;"
        />
        <v-btn block color="#191919" text="Создать лейбл" type="submit" />
      </v-card>
    </v-form>
  </v-dialog>

</template>

<script setup lang="ts">
  import type { Label } from '@/utils/types'
  import axios from 'axios'
  import { onMounted, ref } from 'vue'
  import { createLabel } from '@/api/getObjects'
  import { emitter } from '@/main'
  import { showVariableAlert } from '@/utils/alertErrorsUtils'
  import { colors, labelTypes } from '@/utils/generalUtils'
  import { checkDataToValid, valid_rules } from '@/utils/validRules'

  const labelsList = ref<Label[]>([])
  const isEditItem = ref(false)
  const valid = ref(false)

  async function handleCreateLabel () {
    createLabel(labelData.value).then(() => {
      emitter.emit('show-message', {
        type: 'info',
        title: 'Успешное создание группы заметок',
      })
      isEditItem.value = false
      handleGetlistLabels()
      labelData.value = {
        title: '',
        description: '',
        color: '',
        type: 'task',
      }
    }).catch(error => {
      showVariableAlert(error)
    })
  }

  const labelData = ref<Label>({
    title: '',
    description: '',
    color: '',
    type: 'task',
  })

  const headers = [
    {
      key: 'title',
      title: 'Название',
      width: '0',
    },
    {
      key: 'description',
      title: 'Описание',
    },
    {
      key: 'color',
      title: 'Цвет',
    },
    {
      key: 'type',
      title: 'Тип',
    },
    {
      key: 'actions',
      title: '',
    },

  ]

  function handleGetlistLabels () {
    axios.get('/api/label/get-list')
      .then(response => {
        labelsList.value = response.data
      })
  }

  onMounted(() => {
    handleGetlistLabels()
  })
</script>
