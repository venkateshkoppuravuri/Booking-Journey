<template>
  <div class="details-form">
    <h3 class="mb-4">Your Details</h3>
    <form @submit.prevent>
      <FormField
        label="Full Name *"
        type="text"
        placeholder="Enter your full name"
        :value="formData.name"
        :error="errors.name"
        @update="(value) => updateField('name', value)"
        required
      />

      <FormField
        label="Email Address *"
        type="email"
        placeholder="Enter your email address"
        :value="formData.email"
        :error="errors.email"
        @update="(value) => updateField('email', value)"
        required
      />

      <FormField
        label="Phone Number *"
        type="tel"
        placeholder="(123) 456-7890"
        :value="formattedPhoneNumber"
        :error="errors.phone"
        @update="updatePhoneNumber"
        required
      />

      <FormField
        label="Additional Notes"
        type="textarea"
        placeholder="Enter any additional notes"
        :value="formData.notes"
        @update="(value) => updateField('notes', value)"
      />
    </form>
  </div>
</template>

<script setup>
import { ref, watch, computed, defineProps, defineEmits } from "vue";
import FormField from "@/components/FormField.vue"; // Reusable component
import { validateName, validateEmail, validatePhone } from "@/utils/validators";
import "../styles/style.scss";

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["update-form"]);

const errors = ref({
  name: "",
  email: "",
  phone: "",
});

const formatPhoneNumber = (phone) => {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (!match) return phone;

  const parts = [match[1], match[2], match[3]].filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return `(${parts[0]}`;
  if (parts.length === 2) return `(${parts[0]}) ${parts[1]}`;
  return `(${parts[0]}) ${parts[1]}-${parts[2]}`;
};

const formattedPhoneNumber = computed(() => formatPhoneNumber(props.formData.phone));

const updatePhoneNumber = (value) => {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length <= 10) {
    updateField("phone", cleaned);
  }
};

const updateField = (field, value) => {
  let error = "";
  switch (field) {
    case "email":
      error = validateEmail(value);
      break;
    case "phone":
      error = validatePhone(value);
      break;
    case "name":
      error = validateName(value);
      break;
  }

  errors.value[field] = error;

  const newFormData = {
    ...props.formData,
    [field]: value,
  };

  newFormData.isFormValid = Boolean(
    newFormData.name &&
    newFormData.email &&
    newFormData.phone &&
    !errors.value.name &&
    !errors.value.email &&
    !errors.value.phone
  );

  emit("update-form", newFormData);
};

watch(
  () => props.formData,
  (newFormData) => {
    errors.value.name = validateName(newFormData.name);
    errors.value.email = validateEmail(newFormData.email);
    errors.value.phone = validatePhone(newFormData.phone);
  },
  { deep: true }
);
</script>
