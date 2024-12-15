<template>
  <div class="confirmation-container">
    <h1>Booking Confirmation</h1>
    <p>Please review your booking details below:</p>

    <div class="confirmation-details">
      <DetailItem label="Date" :value="selectedDate || 'Monday, 19 Dec 2024'" />
      <DetailItem label="Time" :value="selectedTime || '10.00'" />

      <div class="detail-item">
        <h3>Office(s):</h3>
        <div v-if="selectedOffices.length" class="selected-offices">
          <div
            v-for="office in selectedOffices"
            :key="office.id"
            class="office-item"
          >
            <i class="bi bi-building me-3" style="color: blueviolet"></i>
            <span style="color: #5a3eb3" class="me-2 mb-1">
              {{ office.name }}
            </span>
          </div>
        </div>
        <p v-else>No offices selected</p>
      </div>

      <DetailItem label="Visitor Name" :value="formData.name || 'N/A'" />
      <DetailItem label="Visitor Email" :value="formData.email || 'N/A'" />
    </div>

    <button @click="confirmBooking" class="confirm-button">
      Confirm Booking
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import DetailItem from "@/components/DetailItem.vue"; // Import reusable component
import "../styles/style.scss";

defineProps({
  selectedOffices: { type: Array, default: () => [] },
  selectedDate: { type: String, default: "" },
  selectedTime: { type: String, default: "" },
  formData: { type: Object, required: true },
});

const emit = defineEmits(["reset-booking"]);
const confirmBooking = () => {
  alert("Your booking is confirmed!");
  emit("reset-booking");
};
</script>
