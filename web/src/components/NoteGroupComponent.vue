<template>
  <v-col cols="3">
    <v-menu v-model="isOpenContextMenu" location="bottom">
      <template #activator>
        <div class="card-wrapper" :style="`background-color:${getNoteColor()}`" @contextmenu.prevent="openContextMenu()">
          <v-card class="pa-4 aspect-square note-wrapper">
            <div class="section-wrapper">
              <div class="top-section">
                <v-row>
                  <h2>{{ props.item.title }}</h2>
                </v-row>
                <v-divider class="my-4" />
              </div>
              <div class="default-section" />
              <div class="bottom-section">
                3 заметки
              </div>
            </div>
          </v-card>
        </div>
      </template>
      <template #default>
        <v-list variant="plain">
          <v-list-item append-icon="mdi-delete" style="color:red">
            Удалить группу
          </v-list-item>
          <v-list-item append-icon="mdi-pencil" @click="editNoteGroup()">
            Изменить группу
          </v-list-item>
        </v-list>
      </template>
    </v-menu>
  </v-col>

  <!-- <v-dialog v-model="isOpenConfirmModal">
        <v-card class="pa-4">
            <h2>Уверены в своем решении?</h2>
            <div class="d-flex ga-2">
                <v-btn block color="red">Уверен!</v-btn>
                <v-btn block>Дай ка подумаю!</v-btn>
            </div>
        </v-card>
    </v-dialog> -->
</template>

<script setup lang="ts">
  import type { NoteGroup } from '@/utils/types'
  import { ref } from 'vue'

  const props = defineProps<{
    item: NoteGroup
  }>()

  // const isOpenConfirmModal = ref(false)

  const isOpenContextMenu = ref(false)

  const emit = defineEmits(['delete', 'edit'])

  function editNoteGroup () {
    // emit('edit')
  }

  function getNoteColor () {
    return props.item.color
  }

  function openContextMenu () {
    isOpenContextMenu.value = true
  }

</script>

<style scoped>
.bottom-section {
    display: flex;
    justify-content: end;
}

.card-wrapper {
    border-radius: 9px;
    width: 100%;
    border: 1px solid transparent;
}

.section-wrapper {
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr auto;
}

.v-card {
    width: 100%;
    clip-path: polygon(0% 0%, 90% 0%, 100% 10%, 100% 100%, 0% 100%);
}
</style>
