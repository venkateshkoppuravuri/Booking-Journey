<template>
  <div class="confirmation-container">
    <h1>Booking Confirmation</h1>
    <p>Please review your booking details below:</p>
    <div class="confirmation-details">
      <div class="detail-item">
        <h3>Date:</h3>
        <p>{{ selectedDate ? selectedDate : "Monday, 19 Dec 2024" }}</p>
      </div>

      <div class="detail-item">
        <h3>Time:</h3>
        <p>{{ selectedTime ? selectedTime : "10.00" }}</p>
      </div>

      <div class="detail-item">
        <h3>Office(s):</h3>
        <div
          class="selected-offices"
          v-for="office in selectedOffices"
          :key="office.id"
        >
          <i class="bi bi-building me-3" style="color: blueviolet"></i>
          <span style="color: #5a3eb3" class="me-2 mb-1">
            {{ office.name }}
          </span>
        </div>
      </div>

      <div class="detail-item">
        <h3>Visitor Details:</h3>
        <p><strong>Name:</strong> {{ formData.name }}</p>
        <p><strong>Email:</strong> {{ formData.email }}</p>
      </div>
    </div>

    <button @click="confirmBooking" class="confirm-button">
      Confirm Booking
    </button>
  </div>
</template>

<script>
import '../styles/style.scss'
export default {
  props: {
    selectedOffices: [],
    selectedDate: String,
    selectedTime: String,
    formData: Object,
  },

  methods: {
    confirmBooking() {
      alert("Your booking is confirmed!");
      this.$emit("reset-booking");
    },
  },
};
</script>

