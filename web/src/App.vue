<template>
  <v-app>
    <v-alert
      v-model="showDialog"
      class="outer-alert"
      :closable="true"
      :color="getAlertColor(alertType)"
      max-width="600px"
      position="fixed"
      :title="alertTitle"
      :type="alertType"
      variant="flat"
    >
      {{ alertMessage }}
    </v-alert>
    <header-component />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import type { Emitter } from "mitt";
import axios from "axios";
import { inject, onMounted, ref } from "vue";
import { VFooter } from "vuetify/components";
import appPackageInfo from "@/../package.json";
import { API_VERSION } from "./api/getObjects";
import HeaderComponent from "./components/HeaderComponent.vue";

type Events = {
  "show-message": {
    type: "info" | "error" | "success" | "warning" | undefined;
    title: string;
    message: string;
  };
};

const emitter = inject<Emitter<Events>>("emitter");
const alertMessage = ref("");
const alertTitle = ref("");
const alertType = ref<"info" | "error" | "success" | "warning" | undefined>(
  "info",
);
const webVersion = appPackageInfo.version;
const apiVersion = ref<string>("");

const showDialog = ref(false);

function showAlert() {
  showDialog.value = true;
  setTimeout(() => {
    showDialog.value = false;
  }, 5000);
}

function getAlertColor(
  alertType: "info" | "error" | "success" | "warning" | undefined,
) {
  if (alertType == "info") {
    return "#00B0FF80"; // Яркий голубой
  } else if (alertType == "error") {
    return "#FF174480"; // Яркий красный
  } else if (alertType == "success") {
    return "#00E67680"; // Яркий зеленый
  } else if (alertType == "warning") {
    return "#FFC40080"; // Яркий желтый
  }
  return "#9E9E9E80";
}

onMounted(() => {
  if (emitter) {
    emitter.on(
      "show-message",
      (value: {
        type: "info" | "error" | "success" | "warning" | undefined;
        title: string;
        message: string;
      }) => {
        alertTitle.value = value.title;
        alertMessage.value = value.message;
        alertType.value = value.type;
        showAlert();
      },
    );
  }
 
  // axios.get(`${API_VERSION}`).then((r) => {
  //   apiVersion.value = r.data.back_version;
  // });
});
</script>
