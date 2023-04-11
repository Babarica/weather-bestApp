<template>
  <div class="weather-app">
    <weather-info></weather-info>
    <weather-show></weather-show>
    <weth-pop>
      <div class="wether-input" :class="{ dark: !isDark }">
        <p class="wether-input__title">{{ $t("Es") }}</p>
        <weth-input
          v-focus
          :placeholder="$t('Es')"
          type="text"
          class="weather-search"
          :class="{ dark: !isDark }"
        >
        </weth-input>
      </div>
    </weth-pop>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { onMounted } from "vue";
import weatherInfo from "./components/weatherInfo.vue";
import weatherShow from "./components/weatherShow.vue";
import { useDark } from "@vueuse/core";
const store = useStore();
const isDark = useDark();

onMounted(() => {
  if (localStorage.getItem("city")) {
    store.dispatch("takeSomeLocale");
  }
});
</script>

<style scoped lang="scss">
@import url(./assets/fonts/stylesheet.css);
p {
  font-family: "Inter";
  font-size: 14px;
}
.weather-search {
  border: none;
  border: 1px solid #ffffff;
  border-radius: 20px;
  background: none;
  max-width: 488px;
  width: 100%;
  display: block;
  position: relative;
  padding: 14px 0px 14px 25px;
  font-family: "Inter";
  color: #fff;
  &.dark {
    color: #000;
    border: 1px solid #000;
    &::placeholder {
      color: #000;
    }
  }
  &::placeholder {
    font-family: "Inter";
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
    line-height: 15px;
    color: #9b9b9b;
  }
}
.wether-input {
  display: block;
  color: #fff;
  position: relative;
  &.dark {
    color: #000;
  }
  &::before {
    position: absolute;
    display: block;
    top: 64%;
    right: 3%;
    content: "";
    background: url(./assets/images/UI/search.png) no-repeat;
    width: 20px;
    height: 20px;
    background-color: 23px;
  }
  &__title {
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    margin-bottom: 25px;
    line-height: 24px;
  }
}
.weather-app {
  display: flex;
}
@media (max-width: 1440px) {
  .weather-app {
    flex-direction: column;
  }
}
</style>
