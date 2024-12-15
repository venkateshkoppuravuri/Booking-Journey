<template>
  <div class="flex justify-between items-center mt-4">
    <BackButton v-if="currentStep > 0" @click="onPreviousStep" />

    <div class="flex gap-2 ml-auto">
      <ContinueButton
        v-if="currentStep < 1"
        :disabled="!canProceed"
        @click="onNextStep"
      />

      <ContinueButton
        v-if="currentStep === 1"
        :disabled="!isFormValid"
        @click="onNextStep"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import BackButton from "./BackButton.vue";
import ContinueButton from "./ContinueButton.vue";

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

const emit = defineEmits(["previous-step", "next-step"]);

const onPreviousStep = () => {
  emit("previous-step");
};

const onNextStep = () => {
  emit("next-step");
};
</script>
