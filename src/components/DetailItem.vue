<template>
  <div class="detail-item">
    <h3>{{ label }}:</h3>
    <p>{{ value }}</p>
  </div>
</template>
  
  <script setup>
import { defineProps } from "vue";
import "../styles/style.scss";

defineProps({
  label: { type: String, required: true },
  value: { type: String, default: "" },
});
</script>
  