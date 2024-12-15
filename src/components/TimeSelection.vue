<template>
  <div class="calendar-container">
    <div class="office-item p-2 rounded" v-if="selectedOffices.length">
      <div class="d-flex">
        <i class="bi bi-building"></i>
        <div>
          <p class="badge bg-light me-2 mb-1">
            Office ( {{ selectedOffices.length }} selected )
          </p>
          <p class="cursor-pointer" @click="changeOffice">
            Click to change offices
          </p>
        </div>
      </div>
    </div>

    <div class="calendar-header">
      <h2>{{ currentMonth }} {{ currentYear }}</h2>
    </div>

    <div class="flex-container">
      <button
        @click="prevWeek"
        :disabled="visibleWeekIndex === 0"
        class="nav-button"
      >
        &lt;
      </button>

      <div class="calendar-dates">
        <div class="week">
          <div
            v-for="(date, idx) in visibleDates"
            :key="idx"
            class="date-box"
            :class="{
              available: date.isAvailable,
              unavailable: !date.isAvailable,
              selected: props.selectedDate === date.fullDate,
            }"
            @click="selectDate(date)"
          >
            <div class="day-content">
              <div class="day-name">{{ date.dayName }}</div>
              <div class="day-number">{{ date.dayNumber }}</div>
            </div>
          </div>
        </div>
      </div>

      <button
        @click="nextWeek"
        :disabled="isNextWeekDisabled"
        class="nav-button"
      >
        &gt;
      </button>
    </div>

    <div v-if="props.selectedDate" class="timeslots-container">
      <div class="timeslots">
        <div
          v-for="(slot, index) in timeslots"
          :key="index"
          class="timeslot"
          :class="{ selected: props.selectedTime === slot }"
          @click="selectTimeslot(slot)"
        >
          {{ slot }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed, onMounted, watch } from "vue";
import "../styles/style.scss";

const props = defineProps({
  selectedDate: {
    type: String,
    default: null,
  },
  selectedTime: {
    type: String,
    default: null,
  },
  selectedOffices: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["select-date", "select-time", "change-office"]);

const allDates = ref([]);
const visibleWeekIndex = ref(0);
const currentMonth = ref("");
const currentYear = ref("");
const timeslots = ref([]);
const isMobile = ref(window.innerWidth <= 768);

window.addEventListener("resize", () => {
  isMobile.value = window.innerWidth <= 768;
});

const visibleDates = computed(() => {
  const datesPerView = isMobile.value ? 5 : 7;
  const startIndex = visibleWeekIndex.value * datesPerView;
  return allDates.value.slice(startIndex, startIndex + datesPerView);
});

const isNextWeekDisabled = computed(() => {
  const datesPerView = isMobile.value ? 5 : 7;
  return (visibleWeekIndex.value + 1) * datesPerView >= allDates.value.length;
});

function generateDates() {
  const today = new Date();
  const dates = [];

  for (let i = 0; i < 141; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    dates.push({
      dayName: getDayName(date),
      dayNumber: date.getDate(),
      fullDate: date.toISOString().split("T")[0],
      isAvailable: isDateAvailable(date),
    });
  }

  allDates.value = dates;
}

function loadTimeslots() {
  timeslots.value = [
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];
}

function getDayName(date) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function isDateAvailable(date) {
  return date.getDay() !== 0;
}

function selectDate(date) {
  if (date.isAvailable) {
    emit("select-date", date.fullDate);
    loadTimeslots();
  }
}

function changeOffice() {
  emit("change-office");
}

function selectTimeslot(slot) {
  emit("select-time", slot);
}

function updateMonthAndYear() {
  if (visibleDates.value[0]) {
    const date = new Date(visibleDates.value[0].fullDate);
    currentMonth.value = date.toLocaleString("default", { month: "long" });
    currentYear.value = date.getFullYear();
  }
}

function nextWeek() {
  if (!isNextWeekDisabled.value) {
    visibleWeekIndex.value++;
    updateMonthAndYear();
  }
}

function prevWeek() {
  if (visibleWeekIndex.value > 0) {
    visibleWeekIndex.value--;
    updateMonthAndYear();
  }
}

function scrollToSelectedDate() {
  if (props.selectedDate) {
    const selectedIndex = allDates.value.findIndex(
      (date) => date.fullDate === props.selectedDate
    );
    if (selectedIndex !== -1) {
      const datesPerView = isMobile.value ? 5 : 7;
      visibleWeekIndex.value = Math.floor(selectedIndex / datesPerView);
      loadTimeslots();
    }
  }
}

onMounted(() => {
  generateDates();
  updateMonthAndYear();
  scrollToSelectedDate();
});

watch(
  () => props.selectedDate,
  (newDate) => {
    if (newDate) {
      scrollToSelectedDate();
    }
  }
);
</script>
