<template>
  <div class="details-form">
    <h3 class="mb-4">Your Details</h3>
    <form @submit.prevent>
      <div class="mb-3">
        <label class="form-label">Full Name *</label>
        <input
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.name }"
          :value="formData.name"
          @input="updateField('name', $event.target.value)"
          required
        />
        <div class="invalid-feedback" v-if="errors.name">
          {{ errors.name }}
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label">Email Address *</label>
        <input
          type="email"
          class="form-control"
          :class="{ 'is-invalid': errors.email }"
          :value="formData.email"
          @input="updateField('email', $event.target.value)"
          required
        />
        <div class="invalid-feedback" v-if="errors.email">
          {{ errors.email }}
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label">Phone Number *</label>
        <input
          type="tel"
          class="form-control"
          :class="{ 'is-invalid': errors.phone }"
          :value="formatPhoneNumber(formData.phone)"
          @input="updatePhoneNumber($event.target.value)"
          placeholder="(123) 456-7890"
          required
        />
        <div class="invalid-feedback" v-if="errors.phone">
          {{ errors.phone }}
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label">Additional Notes</label>
        <textarea
          class="form-control"
          rows="3"
          :value="formData.notes"
          @input="updateField('notes', $event.target.value)"
        ></textarea>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";
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


const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return "Email is required";
  }
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  return "";
};

const validatePhone = (phone) => {
  const cleanPhone = phone.replace(/\D/g, "");
  if (!phone) {
    return "Phone number is required";
  }
  if (cleanPhone.length !== 10) {
    return "Please enter a valid 10-digit phone number";
  }
  return "";
};

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

const updatePhoneNumber = (value) => {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length <= 10) {
    updateField("phone", cleaned);
  }
};

const validateName = (name) => {
  if (!name) {
    return "Name is required";
  }
  if (name.length < 2) {
    return "Name must be at least 2 characters long";
  }
  return "";
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
