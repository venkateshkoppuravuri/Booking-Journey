## Project Overview
This project is a Vue.js application designed to facilitate time and office slot selection. The application allows users to select dates, times, and offices from a predefined set of options, with a focus on providing an intuitive user interface and accurate functionality.

## Features
- **Date and Time Selection:** Users can select available dates and times, with proper highlighting for selected and available slots.
- **Progress Bar:** Displays the current step in the selection process and updates dynamically.
- **Office Selection:** Allows users to select offices (currently supports single selection; multi-select functionality is planned).

## Technologies Used
- **Vue.js:** Options API for component management.
- **Bootstrap & Custom CSS:** For styling and layout.
- **JavaScript:** For logic and state management.

## Setup Guide

1. **Install Vue.js:**
   If Vue.js is not already installed, install the Vue CLI globally:
   ```bash
   npm install -g @vue/cli
   ```
   
2. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```
4. **Run the Application:**
``` npm install vuex@4 bootstrap@5 bootstrap-icons sass sass-loader1```
   Add Dependencies

5. **Run the Application:**
   ```bash
   npm run serve
   ```
   The application will be accessible at `http://localhost:8080/`.

6. **Build for Production:**
   ```bash
   npm run build
   ```
   This will generate a production-ready build in the `dist` folder.

## Projector Structure
src/
├── components/
│   ├── ConfirmationApp.vue
│   ├── DetailsForm.vue
│   ├── NavigationButtons.vue
│   └── OfficeSelectionModal.vue
│   └── ProgressBar.vue
│   └── TimeSelection.vue
├── services/
│   └── api.js
├── App.vue
└── main.js
