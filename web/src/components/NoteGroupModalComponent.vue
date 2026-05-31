<template>
  <v-card v-if="noteGroupData" class="d-flex ga-4 pa-4">
    <header class="d-flex justify-space-between">
      <h1>{{ noteGroupData.title }}</h1>
      <div class="d-flex ga-2">
        <!-- Список заметок -->
        <v-tooltip location="bottom center" text="Список заметок">
          <template #activator="{ props: activatorProps }">
            <v-btn
              :active="pageValue === '1'"
              :disabled="pageValue === '1'"
              v-bind="activatorProps"
              icon="mdi-note-outline"
              variant="text"
              @click="pageValue = '1'"
            />
          </template>
        </v-tooltip>
        <!-- Создать заметку -->
        <v-tooltip location="bottom center" text="Создать заметку">
          <template #activator="{ props: activatorProps }">
            <v-btn
              :active="pageValue === '2'"
              :disabled="pageValue === '2'"
              v-bind="activatorProps"
              icon="mdi-plus"
              variant="text"
              @click="pageValue = '2'"
            />
          </template>
        </v-tooltip>
        <!-- Удалить группу -->
        <v-tooltip location="bottom center" text="Удалить группу">
          <template #activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" icon="mdi-delete" variant="text" @click="deleteNoteGroup()" />
          </template>
        </v-tooltip>
        <!-- Изменить название группы -->
        <v-tooltip location="bottom center" text="Изменить название группы">
          <template #activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" icon="mdi-pencil" variant="text" />
          </template>
        </v-tooltip>
        <!-- Закрыть окно -->
        <v-tooltip location="bottom center" text="Закрыть окно">
          <template #activator="{ props: activatorProps }">
            <v-btn color="red" v-bind="activatorProps" icon="mdi-close" @click="closeModal()" />
          </template>
        </v-tooltip>
      </div>
    </header>

    <v-window v-model="pageValue">
      <v-window-item value="1">
        <v-row>
          <v-col v-for="value in noteGroupData.notes" cols="6">
            <v-card class="pa-4" color="#313131">
              <h2>{{ value.title }}</h2>
              <p>{{ value.description }}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-window-item>
      <v-window-item value="2">
        <div id="note-create">
          <v-form @submit.prevent="createNote()">
            <v-text-field v-model="dataToSend.title" label="Название" variant="solo-filled" />
            <v-textarea
              v-model="dataToSend.description"
              label="Описание"
              no-resize
              rows="10"
              variant="solo-filled"
            />
            <v-btn block type="submit">Создать</v-btn>
          </v-form>
        </div>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script setup lang="ts">
  import type { Note, NoteGroup } from '@/utils/types'
  import axios from 'axios'
  import { onMounted, ref } from 'vue'
  import { NOTE_CREATE, NOTE_GROUP_DELETE, NOTE_GROUP_GET } from '@/api/getObjects'
  import { emitter } from '@/main'

  const noteGroupData = ref<NoteGroup>()

  const pageValue = ref('1')

  const dataToSend = ref<Note>({
    title: '',
    description: '',
  })

  const props = defineProps<{
    uidGroup: string
  }>()

  function createNote () {
    dataToSend.value.uid_group = noteGroupData.value?.uid
    axios.post(NOTE_CREATE, dataToSend.value).then(() => {
      pageValue.value = '1'
      getGroup(props.uidGroup)
      clearModel()
    }).catch(() => {
      alert('Ошибка!')
    })
  }

  function clearModel () {
    dataToSend.value = {
      title: '',
      description: '',
    }
  }

  function closeModal () {
    emitter.emit('close')
  }

  function deleteNoteGroup () {
    axios.delete(`${NOTE_GROUP_DELETE}/${noteGroupData.value?.uid}`)
    emitter.emit('close')
  }

  function getGroup (uid: string): void {
    axios.post(NOTE_GROUP_GET, uid).then(r => {
      noteGroupData.value = r.data
    })
  }

  onMounted(() => {
    getGroup(props.uidGroup)
  })
</script>
