<template>
  <div :class="{ dark: !isDark }" class="weth-slider">
    <swiper
      :slidesPerView="12"
      :breakpoints="{
        '@0.20': {
          slidesPerView: 3,
        },
        '@0.35': {
          slidesPerView: 6,
        },
        '@0.75': {
          slidesPerView: 12,
        },
        '@1.50': {
          slidesPerView: 12,
        },
      }"
      :pagination="{ clickable: true }"
      class="mySwiper"
    >
      <swiper-slide v-for="(clock, index) in this.time" :key="index">
        <div class="weth-group">
          <p class="weth-time">
            {{
              index == 0 ? $t("Td") : clock.dt_txt.split(" ")[1].split(":")[0]
            }}
          </p>
          <img class="weth-img" :src="getImage(index)" alt="" />
          <p class="weth-temp">{{ Math.round(clock.main.temp) }}°</p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue";
import { useDark, useToggle } from "@vueuse/core";
// Import Swiper styles
import "swiper/swiper-bundle.css";

import { mapGetters } from "vuex";
// import required modules

export default {
  setup() {
    const isDark = useDark();
    const toggleDark = useToggle(isDark);
    return { toggleDark, isDark };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  computed: {
    ...mapGetters(["time"]),
  },
  methods: {
    getImage(index) {
      if (this.time[index].weather[0].main == "Clouds") {
        return require(`../assets/images/UI/cloud.png`);
      } else if (this.time[index].weather[0].main == "Rain") {
        return require(`../assets/images/UI/rain.svg`);
      } else if (this.time[index].weather[0].main == "Clear") {
        return require(`../assets/images/UI/sun.png`);
      } else if (this.time[index].weather[0].main == "Snow") {
        return require(`../assets/images/UI/snow.svg`);
      }
    },
  },
};
</script>
<style scoped lang="scss">
.weth-slider {
  padding: 33px 25px;
  margin: 128px 27px 0px 27px;
  background: radial-gradient(
      138.09% 2223.47% at -26.74% -25.32%,
      rgba(255, 255, 255, 0.3364) 0%,
      rgba(255, 255, 255, 0.1798) 100%
    )
    /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  filter: blur(0.5px);
  border-radius: 20px;
  &.dark {
    background: radial-gradient(
      138.09% 2223.47% at -26.74% -25.32%,
      rgba(0, 0, 0, 0.3364) 0%,
      rgba(0, 0, 0, 0.1798) 100%
    );
  }
}
.mySwiper {
  cursor: pointer;
}
.weth-img {
  text-shadow: 1px 4px 4px rgba(0, 0, 0, 0.25);
}
.weth-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px 0px;
  font-family: "Inter";
  text-shadow: 1px 4px 4px rgba(0, 0, 0, 0.25);
  color: #fff;
}
</style>
