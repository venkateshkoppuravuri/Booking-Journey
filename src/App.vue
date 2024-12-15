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
          <div class="my-0">
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


    <div class="modal" v-if="showOfficeModal && currentStep == 0">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Select Offices</h5>
            <button
              type="button"
              class="btn-close"
              @click="closeOfficeModal"
            ></button>
          </div>
          <div class="modal-body">
            <div v-if="loading" class="text-center py-4">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <div v-else>
              <p class="text-muted mb-3">
                Select one or more offices for your appointment
              </p>
              <div class="office-list">
                <div
                  v-for="office in offices"
                  :key="office.id"
                  class="office-item p-3 mb-2 rounded cursor-pointer"
                  :class="{ selected: selectedOfficeIds.includes(office.id) }"
                  @click="toggleOffice(office.id)"
                >
                  <div class="d-flex align-items-center">
                    <div class="me-3">
                      <i class="bi bi-building" style="color: blueviolet"></i>
                    </div>
                    <div>
                      <h6 class="mb-1">{{ office.name }}</h6>
                      <small class="text-muted"
                        >{{ office.distance }} miles from your location</small
                      >
                      <small class="d-block text-muted">{{
                        office.address
                      }}</small>
                    </div>
                    <div class="ms-auto">
                      <i
                        class="bi"
                        :class="
                          selectedOfficeIds.includes(office.id)
                            ? 'bi-check-circle-fill text-primary'
                            : 'bi-circle'
                        "
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn-primary s"
              @click="saveOfficeSelection"
              :disabled="!selectedOfficeIds.length"
            >
              Save
              <span> &gt;</span>
            </button>
            <p @click="closeOfficeModal" class="goback">
              <span>&lt; </span> Go back
            </p>
          </div>
        </div>
      </div>
    </div>
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
import "bootstrap/dist/css/bootstrap.min.css";
import './styles/style.scss'

const steps = [
  { id: 1, title: "1. Time and Date" },
  { id: 2, title: "2. Visitor Details" },
  { id: 3, title: "3. Confirmation" },
];

const currentStep = ref(0);
const showOfficeModal = ref(false);
const selectedOffices = ref([]);
const selectedOfficeIds = ref([]);
const selectedDate = ref(null);
const selectedTime = ref(null);
const offices = ref([]);
const loading = ref(true);

const formData = ref({
  name: "",
  email: "",
  phone: "",
  notes: "",
});

const canSelectOffice = computed(() => {
  return selectedDate.value && selectedTime.value;
});

const canProceed = computed(() => {
  if (currentStep.value === 0) {
    return (
      selectedDate.value &&
      selectedTime.value &&
      selectedOffices.value.length > 0
    );
  }
  return true;
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
    offices.value = await mockApi.getOffices();
  } catch (error) {
    console.error("Error loading offices:", error);
  } finally {
    loading.value = false;
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

const toggleOffice = (officeId) => {
  const index = selectedOfficeIds.value.indexOf(officeId);
  if (index === -1) {
    selectedOfficeIds.value.push(officeId);
  } else {
    selectedOfficeIds.value.splice(index, 1);
  }
};

const closeOfficeModal = () => {
  selectedOfficeIds.value = selectedOffices.value.map((office) => office.id);
  showOfficeModal.value = false;
};

const saveOfficeSelection = () => {
  const selectedOfficeData = offices.value.filter((office) =>
    selectedOfficeIds.value.includes(office.id)
  );
  selectedOffices.value = selectedOfficeData;
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
  /* cursor: pointer; */
}

.office-item:hover {
  background-color: #f8f9fa;
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
