<template>
  <button :disabled="disabled" @click="handleClick" class="btn-primary">
    Continue
    <span> &gt;</span>
  </button>
</template>
  
  <script setup>
import { defineEmits } from "vue";
import "../styles/style.scss";

const emit = defineEmits(["click"]);

const handleClick = () => {
  emit("click");
};
</script>
  