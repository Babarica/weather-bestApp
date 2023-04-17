<template>
  <div class="weather-info" :class="{ dark: !isDark }">
    <div class="weather-correct">
      <div class="weather-info__data">
        <div class="wether-input">
          <weth-input
            v-show="width > '1440'"
            v-focus
            :class="{ dark: !isDark }"
            :placeholder="$t('Cs')"
            type="text"
            class="weather-search"
          />
        </div>
        <p v-show="width > '1440'" class="weather-title">
          {{ town ? town.name : null }}
        </p>
        <div
          v-if="showWeather && !error"
          class="weather-group"
          v-auto-animate
          :class="{ dark: !isDark }"
        >
          <ul v-auto-animate class="weather-name">
            <li class="weather-item">{{ $t("Wd") }}</li>
            <li class="weather-item">{{ $t("Ap") }}</li>
            <li class="weather-item">{{ $t("Vs") }}</li>
            <li class="weather-item">{{ $t("Hm") }}</li>
            <li class="weather-item">{{ $t("Fl") }}</li>
            <li class="weather-item">{{ $t("Sl") }}</li>
          </ul>
          <ul v-auto-animate class="weather-data__group">
            <li class="weather-data">{{ Math.round(spe) }} {{ $t("Ms") }}</li>
            <li class="weather-data">
              {{ Math.round(main.grnd_level) }} {{ $t("AtmF") }}
            </li>
            <li class="weather-data">{{ Math.round(vis) }} {{ $t("Menr") }}</li>
            <li class="weather-data">
              {{ Math.round(main.humidity) }} {{ $t("Gm") }}
            </li>
            <li class="weather-data">{{ Math.round(main.feels_like) }}°</li>
            <li class="weather-data">{{ Math.round(main.sea_level) }}</li>
          </ul>
        </div>
        <div class="error" v-else>Данный город не найден</div>
      </div>
      <skeleton-loader v-if="!loading"></skeleton-loader>
      <weather-slide></weather-slide>
    </div>
    <weather-footer v-show="width <= '1440'"></weather-footer>
  </div>
</template>
<script setup>
import weatherFooter from "./weatherFooter.vue";
import skeletonLoader from "./skeletonLoader.vue";
import weatherSlide from "./weatherSlide.vue";
import { useDark } from "@vueuse/core";
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
const isDark = useDark();
const store = useStore();
const showWeather = computed(() => store.getters.showWeather);
const town = computed(() => store.getters.town);
const spe = computed(() => store.getters.spe);
const vis = computed(() => store.getters.vis);
const main = computed(() => store.getters.main);
const error = computed(() => store.getters.error);
const loading = computed(() => store.getters.loading);
const width = ref(0);
function updateWidth() {
  width.value = window.innerWidth;
}
onMounted(() => {
  window.addEventListener("resize", updateWidth);
  updateWidth();
});
onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});
</script>
<style lang="scss" scoped>
.error {
  color: red;
  font-family: "Inter";
}
.weather {
  &-item {
    margin-bottom: 34px;
    font-family: "Inter";
    font-weight: 300;
    font-size: 16px;
    line-height: 19px;
  }
  &-data {
    margin-bottom: 34px;
    font-family: "Inter";
    font-weight: 300;
    font-size: 16px;
    line-height: 19px;
    &__group {
      text-align: right;
    }
  }
  &-group {
    margin-top: 59px;
    display: flex;
    justify-content: space-between;
  }
  &-correct {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &-info {
    min-height: 100vh;
    max-width: 27rem;
    background-color: #292b3f;
    width: 100%;
    color: #fff;
    &.dark {
      color: #000;
      background-color: #d9d9d9;
    }
    &__data {
      padding: 59px 82px 52px 47px;
    }
  }
  &-search {
    border: none;
    border-bottom: 1px solid #ffffff;
    background: none;
    width: 100%;
    display: block;
    position: relative;
    padding-bottom: 9px;
    font-family: "Inter";
    color: #fff;
    &.dark {
      border-bottom: 1px solid #000;
      color: #000;
      &::placeholder {
        color: #130c0c;
      }
    }
    &::placeholder {
      font-family: "Inter";
      color: #9b9b9b;
      font-weight: 300;
      font-size: 16px;
    }
  }
  &-title {
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    margin-top: 59px;
  }
}
@media (max-width: 1440px) {
  .weather-info {
    order: 3;
    max-width: none;
    min-height: 0;
    &__data {
      padding: 0;
      width: 100%;
    }
  }
  .weather-group {
    margin-top: 25px;
  }
  .weather-correct {
    flex-direction: row;
    padding: 0px 23px 0px 23px;
    justify-content: space-between;
    margin-top: 37px;
    gap: 0 40px;
    margin-bottom: 36px;
  }
  .weather-item {
    margin-bottom: 21px;
  }
  .weather-data {
    margin-bottom: 21px;
  }
}
@media (max-width: 1040px) {
  .weather-info {
    &.dark {
      background-color: #fff;
    }
  }
}
@media (max-width: 700px) {
  .weather-correct {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
