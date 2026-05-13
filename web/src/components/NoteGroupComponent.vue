<template>
    <v-col cols="3">
        <div class="card-wrapper" :style="`background-color:${getNoteColor()}`">
            <v-card class="pa-4 aspect-square note-wrapper">
                <div class="section-wrapper">
                    <div class="top-section">
                        <v-row>
                            <h2>{{ props.item.title }}</h2>
                        </v-row>
                        <v-divider class="my-4"></v-divider>
                    </div>
                    <div class="default-section">

                    </div>
                    <div class="bottom-section">
                        3 заметки
                    </div>
                </div>
            </v-card>
        </div>
    </v-col>
</template>

<script setup lang="ts">
import type { NoteGroup } from '@/utils/types';


const props = defineProps<{
    item: NoteGroup
}>()

function getNoteColor() {
    return props.item.color
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