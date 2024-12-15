<template>
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
          <small class="d-block text-muted">{{ office.address }}</small>
        </div>
        <div class="ms-auto">
          <i
            class="bi"
            :class="{
              'bi-check-circle-fill text-primary': selectedOffices.includes(
                office.id
              ),
              'bi-circle': !selectedOffices.includes(office.id),
            }"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  offices: Array,
  selectedOffices: Array,
});

const emit = defineEmits(["toggle-office"]);

const toggleOffice = (officeId) => {
  emit("toggle-office", officeId);
};
</script>
  
  <style scoped>
.office-item {
  border: 1px solid #dee2e6;
  transition: all 0.2s;
  cursor: pointer;
}

.office-item.selected {
  background-color: #e9ecef;
  border-color: #6a4cc3;
}

.bi-circle {
  color: #dee2e6;
}

.office-list {
  max-height: 400px;
  overflow-y: auto;
}
</style>
  