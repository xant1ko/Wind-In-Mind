<template>
    <v-container>
        <h1 class="text-center">
            Заметки
        </h1>
        <v-row class="justify-center">
            <NoteGroupComponent @click="openModal(value.uid)" :item="value" class="note-group"
                v-for="value in noteGroupList" />
            <v-col cols="3">
                <v-card @click="isEditNoteGroup = !isEditNoteGroup"
                    class="cursor-pointer aspect-square d-flex align-center justify-center">
                    <v-icon size="x-large" icon="mdi-plus" />
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <v-dialog height="1000" max-width="800" v-model="isNoteGroup">
        <NoteGroupModalComponent :uid-group="uidGroup" />
    </v-dialog>

    <v-dialog v-model="isEditNoteGroup" scrim="black" max-width="600">
        <v-form @submit.prevent="createNoteGroup()">
            <v-card class="pa-4 d-flex ga-4">
                <h2>Создать группу заметок</h2>
                <v-text-field v-model="noteGroupData.title" variant="solo-filled" label="Название"></v-text-field>
                <v-color-picker v-model="noteGroupData.color" style="width: 100%;" hide-title
                    hide-inputs></v-color-picker>
                <v-btn type="submit" block text="Создать группу заметок" color="#191919" />
            </v-card>
        </v-form>
    </v-dialog>
</template>


<script setup lang="ts">
import { NOTE_GROUP_CREATE, NOTE_GROUP_GET_LIST } from '@/api/getObjects';
import NoteGroupComponent from '@/components/NoteGroupComponent.vue';
import NoteGroupModalComponent from '@/components/NoteGroupModalComponent.vue';
import { emitter } from '@/main';
import type { NoteGroup } from '@/utils/types';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const isEditNoteGroup = ref(false)

const isNoteGroup = ref(false)

const uidGroup = ref()

const noteGroupData = ref<NoteGroup>({
    title: '',
    color: ''
})

const noteGroupList = ref<NoteGroup[]>()

function openModal(uidGroupLocal?: string) {
    isNoteGroup.value = true

    uidGroup.value = uidGroupLocal
}

emitter.on('close', () => {
    isNoteGroup.value = false
    getNoteGroupList()
})

async function getNoteGroupList() {
    axios.get(NOTE_GROUP_GET_LIST).then((r) => {
        noteGroupList.value = r.data
    })
}

async function createNoteGroup() {
    axios.post(NOTE_GROUP_CREATE, noteGroupData.value)
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