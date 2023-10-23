import { app } from "@storybook/vue3";
import { createApp } from "vue";

// Create a new Vue app instance
const vueApp = createApp({});

// Register the app instance with Storybook
app.use(vueApp);
