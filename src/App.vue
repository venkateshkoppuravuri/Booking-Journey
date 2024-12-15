<template>
  <div class="container-sm">
    <div class="card shadow">
      <div class="card-body">
        <ProgressBar :steps="steps" :currentStep="currentStep" />

        <div class="mt-2">
          <div v-if="currentStep === 0" class="text-center">
            <h4>Book Appointment with Financial Expert</h4>
            <h6>Please choose a date and time to meet Mr. Jonathan.</h6>
          </div>
          <TimeSelection
            v-if="currentStep === 0"
            :selectedDate="selectedDate"
            :selectedTime="selectedTime"
            @select-date="selectDate"
            @select-time="selectTime"
            :selectedOffices="selectedOffices"
            @change-office="showOfficeModal = true"
          />

          <DetailsForm
            v-if="currentStep === 1"
            :formData="formData"
            @update-form="updateForm"
            :selectedDate="selectedDate"
            :selectedTime="selectedTime"
          />

          <ConfirmationApp
            v-if="currentStep === 2"
            :selectedOffices="selectedOffices"
            :selectedDate="selectedDate"
            :selectedTime="selectedTime"
            :formData="formData"
          />
        </div>
        <div
          class="card-body text-center"
          v-if="currentStep == 0 && !selectedOffices.length"
        >
          <button
            class="btn-primary"
            @click="showOfficeModal = true"
            :disabled="!canSelectOffice"
          >
            {{
              selectedOffices.length
                ? "Change Office Selection"
                : "Select Offices"
            }}
          </button>
        </div>

        <NavigationButtons
          :currentStep="currentStep"
          :canProceed="canProceed"
          :isFormValid="isFormValid"
          @previous-step="previousStep"
          @next-step="nextStep"
        />
      </div>
    </div>

    <OfficeSelectionModal
      :show="showOfficeModal"
      :initialSelected="selectedOffices"
      @update:show="showOfficeModal = $event"
      @save="saveOfficeSelection"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { mockApi } from "@/services/api";
import ProgressBar from "./components/ProgressBar.vue";
import TimeSelection from "./components/TimeSelection.vue";
import DetailsForm from "./components/DetailsForm.vue";
import NavigationButtons from "./components/NavigationButtons.vue";
import ConfirmationApp from "./components/ConfirmationApp.vue";
import OfficeSelectionModal from "./components/OfficeSelectionModal.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.scss";

const steps = [
  { id: 1, title: "Time and Date" },
  { id: 2, title: "Visitor Details" },
  { id: 3, title: "Confirmation" },
];

const currentStep = ref(0);
const showOfficeModal = ref(false);
const selectedOffices = ref([]);
const selectedDate = ref(null);
const selectedTime = ref(null);

const formData = ref({
  name: "",
  email: "",
  phone: "",
  notes: "",
});

const canSelectOffice = computed(
  () => selectedDate.value && selectedTime.value
);

const canProceed = computed(() => {
  return currentStep.value === 0
    ? selectedDate.value &&
        selectedTime.value &&
        selectedOffices.value.length > 0
    : true;
});

const isFormValid = computed(() => {
  return !!(
    formData.value.name &&
    formData.value.email &&
    formData.value.phone
  );
});

onMounted(async () => {
  try {
    await mockApi.getOffices();
  } catch (error) {
    console.error("Error loading offices:", error);
  }
});

const selectDate = (date) => {
  selectedDate.value = date;
};
const selectTime = (time) => {
  selectedTime.value = time;
};

const updateForm = (newFormData) => {
  formData.value = { ...formData.value, ...newFormData };
};

const saveOfficeSelection = (selectedOfficesData) => {
  selectedOffices.value = selectedOfficesData;
  showOfficeModal.value = false;
};

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};
</script>

<style>
@import "bootstrap/dist/css/bootstrap.min.css";
@import "bootstrap-icons/font/bootstrap-icons.css";

.bg-primary {
  background-color: #6a4cc3 !important;
}

.text-primary {
  color: #6a4cc3 !important;
}
.s {
  width: 100%;
}
.goback {
  color: #6a4cc3;
}
.btn-outline-primary {
  color: #6a4cc3;
  border-color: #6a4cc3;
}

.btn-outline-primary:hover:not(:disabled) {
  background-color: #6a4cc3;
  border-color: #6a4cc3;
  color: white;
}

.btn-outline-primary:disabled {
  color: #a899db;
  border-color: #a899db;
}

.modal {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
}

.office-item {
  border: 1px solid #dee2e6;
  transition: all 0.2s;
}

.office-item.selected {
  background-color: #e9ecef;
  border-color: #6a4cc3;
}

.cursor-pointer {
  cursor: pointer;
}

.bi-circle {
  color: #dee2e6;
}

.modal-dialog {
  max-width: 500px;
}

.office-list {
  max-height: 400px;
  overflow-y: auto;
}

.modal-footer {
  display: grid;
  align-items: center;
  align-self: center;
  text-align: center;
}

.btn-primary {
  padding: 0.5rem 1rem;
  background-color: #6a4cc3;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  transition: background-color 0.2s;
}

.btn-primary:hover:not(:disabled) {
  background-color: #5a3eb3;
}

.btn-primary:disabled {
  background-color: #a899db;
  cursor: not-allowed;
  opacity: 0.7;
}

.btn-secondary {
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: #6b7280;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background-color: #f3f4f6;
  color: #374151;
}

@media (max-width: 768px) {
  .modal-content {
    position: absolute;
    bottom: 0;
  }
  .date-box {
    padding: 8px;
    font-size: 0.8rem;
  }
  i,
  .bi {
    color: #5a3eb3;
  }
  .txtColor {
    color: #5a3eb3 !important;
  }
}
</style>
