<template>
  <div class="weather-show" :class="{ dark: !isDark }">
    <div v-show="width <= '1440'" class="weather-find">
      <weth-input
        v-focus
        :class="{ dark: !isDark }"
        :placeholder="$t('Cs')"
        type="text"
        class="weather-search"
      ></weth-input>
    </div>
    <div class="wether-header" v-show="width <= '1440' && width > 1040">
      <p class="weather-title" :class="{ dark: !isDark }">
        {{ town ? town.name : null }}
      </p>
    </div>
    <weather-big-block v-show="width <= '1040'" :day="day"></weather-big-block>
    <ul v-show="width > '1040'" class="weather-blocks" v-auto-animate>
      <li
        @click="makeActive(index)"
        v-for="(day, index) in showWeather"
        :key="day"
      >
        <weather-block :num="index" :day="day"></weather-block>
      </li>
    </ul>
    <weather-footer v-show="width > '1440'"></weather-footer>
  </div>
</template>
<script setup>
import weatherBlock from "./weatherBlock.vue";
import weatherFooter from "./weatherFooter.vue";
import weatherBigBlock from "./weatherBigBlock.vue";
import { useDark } from "@vueuse/core";
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
const isDark = useDark();
const store = useStore();
const showWeather = computed(() => store.getters.showWeather);
const town = computed(() => store.getters.town);
const day = computed(() => store.getters.day);
const makeActive = (index) => store.commit("updateActive", index);
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
.weather-show {
  background: #3c3d4a;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 41px 21px 28px 25px;
  &.dark {
    background: #fff;
  }
}
.weather-title {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  color: #fff;
  margin-top: 59px;
  &.dark {
    color: #000;
  }
}
.weather-blocks {
  display: flex;
  justify-content: center;
  gap: 0px 40px;
  align-items: center;
}
.weather-find {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    display: block;
    width: 21px;
    right: 0;
    height: 21px;
    background: url(../assets/images/UI/search.png) no-repeat;
    top: 15%;
  }
}
.weather-search {
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
@media (max-width: 1650px) {
  .weather-blocks {
    gap: 0 20px;
  }
  .weather-show {
    padding: 41px 21px 4px 21px;
  }
}
@media (max-width: 1650px) {
  .weather-blocks {
    gap: 0 12px;
  }
  .weather-show {
    padding: 41px 21px 4px 16px;
  }
}
@media (max-width: 1440px) {
  .weather-show {
    order: 2;
    background: #292b3f;
    justify-content: inherit;
    min-height: 0;
  }
  .weather-blocks {
    justify-content: space-between;
    margin-top: 32px;
  }
  .weather-title {
    margin-top: 32px;
  }
}
@media (max-width: 1040px) {
  .weather-find {
    margin-bottom: 29px;
  }
}
</style>
