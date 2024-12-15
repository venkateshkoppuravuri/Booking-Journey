<template>
  <button @click="handleClick" class="btn-secondary">Go back</button>
</template>
  
  <script setup>
import { defineEmits } from "vue";
import "../styles/style.scss";

const emit = defineEmits(["click"]);

const handleClick = () => {
  emit("click");
};
</script>
  