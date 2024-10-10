import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";

import ToastPlugin from "vue-toast-notification";
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import "vue-toast-notification/dist/theme-bootstrap.css";

createApp(App).use(router).use(ToastPlugin).mount("#app");
