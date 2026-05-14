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
        <v-form @submit.prevent="checkDataToValid(noteGroupData,valid, handleCreateNoteGroup)" v-model="valid">
            <v-card class="pa-4 d-flex ga-4">
                <h2>Создать группу заметок</h2>

                <v-text-field v-model="noteGroupData.title" :rules="[valid_rules.required]" variant="solo-filled" label="Название"></v-text-field>
                <div class="d-flex ga-1 wrap">
                    <v-chip 
                        @click="noteGroupData.color = value.color"
                        v-for="value in colors" 
                        :color="value.color" 
                        :text="value.title"
                        size="small"
                        />
                </div>
                <v-color-picker v-model="noteGroupData.color" :rules="[valid_rules.required]" style="width: 100%;" hide-title
                    hide-inputs></v-color-picker>
                <v-btn type="submit" block text="Создать группу заметок" color="#191919" />
            </v-card>
        </v-form>
    </v-dialog>
</template>


<script setup lang="ts">
import { createNoteGroup, NOTE_GROUP_GET_LIST } from '@/api/getObjects';
import NoteGroupComponent from '@/components/NoteGroupComponent.vue';
import NoteGroupModalComponent from '@/components/NoteGroupModalComponent.vue';
import { emitter } from '@/main';
import { showVariableAlert } from '@/utils/alertErrorsUtils';
import type { NoteGroup } from '@/utils/types';
import { checkDataToValid, valid_rules } from '@/utils/validRules';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const valid = ref(false)

const isEditNoteGroup = ref(false)

const isNoteGroup = ref(false)

const uidGroup = ref()

const noteGroupData = ref<NoteGroup>({
    title: '',
    color: ''
})

const colors = [
  { title: "Красный", color: "#FF4D4D" },
  { title: "Синий", color: "#4D79FF" },
  { title: "Зеленый", color: "#4DFF88" },
  { title: "Желтый", color: "#FFE54D" },
  { title: "Фиолетовый", color: "#B84DFF" },
  { title: "Оранжевый", color: "#FFA64D" },
  { title: "Розовый", color: "#FF6B9E" },
  { title: "Голубой", color: "#4DE1FF" },
  { title: "Серый", color: "#A9A9A9" },
  { title: "Бирюзовый", color: "#4DFFD9" }
];

const noteGroupList = ref<NoteGroup[]>()

function openModal(uidGroupLocal?: string) {
    isNoteGroup.value = true

    uidGroup.value = uidGroupLocal
}

const emit = defineEmits(['close'])

emitter.on('close', () => {
    isNoteGroup.value = false
    getNoteGroupList()
})

async function getNoteGroupList() {
    axios.get(NOTE_GROUP_GET_LIST).then((r) => {
        noteGroupList.value = r.data
    })
}

async function handleCreateNoteGroup() {
    createNoteGroup(noteGroupData.value).then(()=>{
        emitter.emit('show-message',{
            type: 'info',
            title: 'Успешное создание группы заметок'
        })
        isEditNoteGroup.value = false
        getNoteGroupList()
        noteGroupData.value = {
            title: '',
            color: '',
            notes:undefined, 
            uid:  undefined
        }
    }).catch((error)=>{
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