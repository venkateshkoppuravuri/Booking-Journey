<template>
  <div class="progress-wrapper">
    <div class="progress" style="height: 4px">
      <div
        class="progress-bar bg-primary"
        role="progressbar"
        :style="progressBarStyle"
        :aria-valuenow="progressPercentage"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
    
    <div class="d-flex justify-content-between mt-2">
      <div
        v-for="(step, index) in steps"
        :key="step.id"
        class="text-center"
        :class="stepClass(index)"
      >
        {{ step.title }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  steps: Array,
  currentStep: Number,
});

const progressPercentage = computed(() => {
  return (props.currentStep + 1) * (100 / props.steps.length);
});


const progressBarStyle = computed(() => {
  return {
    width: `${progressPercentage.value}%`,
  };
});

const stepClass = (index) => {
  return {
    'text-primary fw-bold': props.currentStep === index,
    'text-muted': props.currentStep !== index,
  };
};
</script>

<style scoped>
.progress-wrapper {
  width: 100%;
}

.progress {
  height: 4px;
}

.text-primary {
  color: #6a4cc3;
}

.fw-bold {
  font-weight: 700;
}

.text-muted {
  color: #6c757d;
}
</style>
