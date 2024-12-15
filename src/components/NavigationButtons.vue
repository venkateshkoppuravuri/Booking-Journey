<template>
  <div
    class="flex justify-between items-center mt-4"
    style="display: flex; justify-content: space-between"
  >
    <button
      v-if="currentStep > 0"
      @click="$emit('previous-step')"
      class="btn-secondary"
    >
      Go back
    </button>

    <div class="flex gap-2 ml-auto">
      <button
        v-if="currentStep < 1"
        @click="$emit('next-step')"
        :disabled="!canProceed"
        class="btn-primary"
      >
        Continue
        <span> &gt;</span>
      </button>

      <button
        v-if="currentStep == 1"
        @click="$emit('next-step')"
        :disabled="!isFormValid"
        class="btn-primary"
      >
        Continue
        <span> &gt;</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import '../styles/style.scss'

defineProps({
  currentStep: {
    type: Number,
    required: true,
  },
  canProceed: {
    type: Boolean,
    default: true,
  },
  isFormValid: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["previous-step", "next-step", "submit-booking"]);
</script>

