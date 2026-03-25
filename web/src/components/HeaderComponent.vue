<template>
  <v-app-bar>
    <template #prepend>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click="drawer = !drawer" />
        <h4 class="ml-4">Wind In Mind</h4>
      </div>
    </template>

    <template #append>
      <!-- <v-toolbar-title class="pa-2">
        <h4>{{ userName }}</h4>
      </v-toolbar-title> -->
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" app>
    <v-list>
      <v-list-item
        v-for="p in pages"
        :key="p.path"
        :active="route?.path == p.path"
        @click="router.push(p.path)"
      >
        {{ p.title }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vuetify/lib/composables/router.mjs";
import router from "@/router";

const drawer = ref(true);

const userName = ref("Самурай Дятлов");

const route = useRoute();

const pages = [
  {
    title: "Просто заглушка пока",
    path: "/",
  },
];
</script>
