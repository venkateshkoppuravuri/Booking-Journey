<template>
    <div class="mb-3">
      <label class="form-label">{{ label }}</label>
      <template v-if="type === 'textarea'">
        <textarea
          class="form-control"
          :rows="rows"
          :class="{ 'is-invalid': error }"
          :value="value"
          :placeholder="placeholder"
          @input="$emit('update', $event.target.value)"
        ></textarea>
      </template>
      <template v-else>
        <input
          :type="type"
          class="form-control"
          :class="{ 'is-invalid': error }"
          :value="value"
          :placeholder="placeholder"
          @input="$emit('update', $event.target.value)"
          :required="required"
        />
      </template>
      <div class="invalid-feedback" v-if="error">
        {{ error }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from "vue";

  defineProps({
    label: { type: String, required: true },
    type: { type: String, default: "text" },
    value: { type: [String, Number], default: "" },
    error: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    rows: { type: Number, default: 3 }, // For textarea rows
    required: { type: Boolean, default: false },
  });
  </script>
  