<template>
    <v-card :class="[getBorderColor(task.priority), task.isDone ? 'doneTaskCard' : '']"
        class="pa-4 d-flex justify-space-between align-start">
        <div>
            <h3>{{ task.title }}</h3>
            <p>{{ task.description }}</p>
        </div>
        <div class="d-flex ga-1">
            <v-btn @click="markTaskIsDone(task.uid)" icon="mdi-check"></v-btn>
            <v-btn @click="deleteTask(task.uid)" icon="mdi-delete-outline"></v-btn>
            <v-btn icon="mdi-arrow-right"></v-btn>

        </div>
    </v-card>
</template>

<script setup lang="ts">
import { emitter } from '@/main'
import type { Task } from '@/utils/types';
import axios from 'axios'

defineProps<{
    task: Task
}>()

async function markTaskIsDone(uid: string | undefined) {
    await axios.post(`/api/task/resolve/${uid}`)
    await emitter.emit('update')
}

async function deleteTask(uid: string | undefined) {
    await axios.post(`/api/task/delete/${uid}`)
    await emitter.emit('update')
}

function getBorderColor(priority?: string) {
    if (priority === 'firstPlan') {
        return 'borderFirstPlan'
    } else if (priority === 'secondplan') {
        return 'borderSecondplan'
    } else if (priority === 'longDistance') {
        return 'borderLongDistance'
    }

}
</script>