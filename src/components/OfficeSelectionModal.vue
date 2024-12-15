<template>
  <div class="modal" v-if="show">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Select Offices</h5>
          <button type="button" class="btn-close" @click="close"></button>
        </div>
        <div class="modal-body">
          <LoadingSpinner v-if="loading" />
          <div v-else>
            <p class="text-muted mb-3">Select one or more offices for your appointment</p>
            <OfficeList
              :offices="offices"
              :selectedOffices="selectedOffices"
              @toggle-office="toggleOffice"
            />
          </div>
        </div>
        <div class="modal-footer">
          <BackButton @click="close" />
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
import { ref, onMounted, defineProps, defineEmits } from "vue";
import { mockApi } from "@/services/api";
import LoadingSpinner from "./LoadingSpinner.vue";
import OfficeList from "./OfficeList.vue";
import BackButton from "./BackButton.vue";

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
</style>
