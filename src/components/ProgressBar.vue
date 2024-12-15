<template>
  <div class="progress-wrapper">
    <div class="progress" style="height: 4px">
      <div
        class="progress-bar bg-primary"
        role="progressbar"
        :style="{ width: `${(currentStep + 1) * (100 / steps.length)}%` }"
        :aria-valuenow="(currentStep + 1) * (100 / steps.length)"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
    <div class="d-flex justify-content-between mt-2">
      <div
        v-for="(step, index) in steps"
        :key="step.id"
        class="text-center"
        :class="{
          'text-primary fw-bold': currentStep === index,
          'text-muted': currentStep !== index,
        }"
      >
        {{ step.title }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  steps: Array,
  currentStep: Number,
});
</script>
