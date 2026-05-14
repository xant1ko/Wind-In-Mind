<template>
  <v-container>
    <h1 class="text-center">
      Заметки
    </h1>
    <v-row class="justify-center">
      <NoteGroupComponent
        v-for="value in noteGroupList"
        class="note-group"
        :item="value"
        @click="openModal(value.uid)"
      />
      <v-col cols="3">
        <v-card
          class="cursor-pointer aspect-square d-flex align-center justify-center"
          @click="isEditNoteGroup = !isEditNoteGroup"
        >
          <v-icon icon="mdi-plus" size="x-large" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="isNoteGroup" height="1000" max-width="800">
    <NoteGroupModalComponent :uid-group="uidGroup" />
  </v-dialog>

  <v-dialog v-model="isEditNoteGroup" max-width="600" scrim="black">
    <v-form v-model="valid" @submit.prevent="checkDataToValid(noteGroupData,valid, handleCreateNoteGroup)">
      <v-card class="pa-4 d-flex ga-4">
        <h2>Создать группу заметок</h2>

        <v-text-field v-model="noteGroupData.title" label="Название" :rules="[valid_rules.required]" variant="solo-filled" />
        <div class="d-flex ga-1 wrap">
          <v-chip
            v-for="value in colors"
            :color="value.color"
            size="small"
            :text="value.title"
            @click="noteGroupData.color = value.color"
          />
        </div>
        <v-color-picker
          v-model="noteGroupData.color"
          hide-inputs
          hide-title
          :rules="[valid_rules.required]"
          style="width: 100%;"
        />
        <v-btn block color="#191919" text="Создать группу заметок" type="submit" />
      </v-card>
    </v-form>
  </v-dialog>

</template>

<script setup lang="ts">
  import type { NoteGroup } from '@/utils/types'
  import axios from 'axios'
  import { onMounted, ref } from 'vue'
  import { createNoteGroup, NOTE_GROUP_GET_LIST } from '@/api/getObjects'
  import NoteGroupComponent from '@/components/NoteGroupComponent.vue'
  import NoteGroupModalComponent from '@/components/NoteGroupModalComponent.vue'
  import { emitter } from '@/main'
  import { showVariableAlert } from '@/utils/alertErrorsUtils'
  import { checkDataToValid, valid_rules } from '@/utils/validRules'

  const valid = ref(false)

  const isEditNoteGroup = ref(false)

  const isNoteGroup = ref(false)

  const uidGroup = ref()

  const noteGroupData = ref<NoteGroup>({
    title: '',
    color: '',
  })

  const colors = [
    { title: 'Красный', color: '#FF4D4D' },
    { title: 'Синий', color: '#4D79FF' },
    { title: 'Зеленый', color: '#4DFF88' },
    { title: 'Желтый', color: '#FFE54D' },
    { title: 'Фиолетовый', color: '#B84DFF' },
    { title: 'Оранжевый', color: '#FFA64D' },
    { title: 'Розовый', color: '#FF6B9E' },
    { title: 'Голубой', color: '#4DE1FF' },
    { title: 'Серый', color: '#A9A9A9' },
    { title: 'Бирюзовый', color: '#4DFFD9' },
  ]

  const noteGroupList = ref<NoteGroup[]>()

  function openModal (uidGroupLocal?: string) {
    isNoteGroup.value = true
    uidGroup.value = uidGroupLocal
  }

  const emit = defineEmits(['close'])

  emitter.on('close', () => {
    isNoteGroup.value = false
    getNoteGroupList()
  })

  async function getNoteGroupList () {
    axios.get(NOTE_GROUP_GET_LIST).then(r => {
      noteGroupList.value = r.data
    })
  }

  async function handleCreateNoteGroup () {
    createNoteGroup(noteGroupData.value).then(() => {
      emitter.emit('show-message', {
        type: 'info',
        title: 'Успешное создание группы заметок',
      })
      isEditNoteGroup.value = false
      getNoteGroupList()
      noteGroupData.value = {
        title: '',
        color: '',
        notes: undefined,
        uid: undefined,
      }
    }).catch(error => {
      showVariableAlert(error)
    })
  }

  onMounted(() => {
    getNoteGroupList()
  })

</script>

<style scoped>
.note-group {
    transition: 0.2s ease;
    cursor: pointer;
}

.note-group:hover {
    transform: translateY(-10px);
}
</style>
