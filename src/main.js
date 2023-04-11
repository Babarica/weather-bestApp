import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import components from "@/components/UI";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import directives from "./directives";
import i18n from "./translations";

const app = createApp(App);
components.forEach((component) => {
  app.component(component.name, component);
});
directives.forEach((directive) => {
  app.directive(directive.name, directive);
});
app.use(i18n).use(store).use(autoAnimatePlugin).mount("#app");
