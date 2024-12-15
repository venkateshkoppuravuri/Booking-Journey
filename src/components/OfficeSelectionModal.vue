<template>
  <div class="modal" v-if="show">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Select Offices</h5>
          <button type="button" class="btn-close" @click="close"></button>
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
                :class="{ selected: selectedOffices.includes(office.id) }"
                @click="toggleOffice(office.id)"
              >
                <div class="d-flex align-items-center">
                  <div class="me-3" style="color: blue">
                    <i class="bi bi-building"></i>
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
                        selectedOffices.includes(office.id)
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
          <button class="btn btn-secondary" @click="close">Go back</button>
          <button
            class="btn btn-primary"
            @click="save"
            :disabled="!selectedOffices.length"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { mockApi } from "@/services/api";
import { ref, onMounted, defineProps, defineEmits } from "vue";

const props = defineProps({
  show: Boolean,
  initialSelected: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:show", "save"]);

const offices = ref([]);
const selectedOffices = ref([...props.initialSelected]);
const loading = ref(true);

onMounted(async () => {
  try {
    offices.value = await mockApi.getOffices();
  } catch (error) {
    console.error("Error loading offices:", error);
  } finally {
    loading.value = false;
  }
});

const toggleOffice = (officeId) => {
  const index = selectedOffices.value.indexOf(officeId);
  if (index === -1) {
    selectedOffices.value.push(officeId);
  } else {
    selectedOffices.value.splice(index, 1);
  }
};

const close = () => {
  selectedOffices.value = [...props.initialSelected];
  emit("update:show", false);
};

const save = () => {
  const selectedOfficeData = offices.value.filter((office) =>
    selectedOffices.value.includes(office.id)
  );
  emit("save", selectedOfficeData);
  emit("update:show", false);
};
</script>

<style scoped>
.modal {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
}

.office-item {
  border: 1px solid #dee2e6;
  transition: all 0.2s;
  cursor: pointer;
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
</style>
