<template>
  <div 
  @click="model = !model"
    class="v-field v-field--active v-field--appended v-field--center-affix v-field--variant-solo-filled v-theme--dark v-field--dirty"
    style="
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;
    "
  >
    <div class="v-field__overlay" />
    <div class="v-field__loader">
      <div class="v-progress-linear" style="width: 100%; height: 0px" />
    </div>
    <div class="v-field__field">
      <label
        class="v-label v-field-label"
        style="
          left: 16px;
          right: auto;
          position: absolute;
          pointer-events: none;
        "
      >Interacrion Type</label>
      <div
        class="v-field__input justify-space-between"
        style="min-height: 56px; padding-top: 0px; padding-bottom: 0px"
      >
        <v-label style="height: fit-content">{{ props.label }}</v-label>
        <v-switch v-model="model" hide-details />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const model = defineModel<boolean>()

  const props = defineProps<{
    label: string
  }>()
</script>
