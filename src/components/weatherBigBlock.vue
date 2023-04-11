<template>
  <div v-if="day" :class="{ dark: !isDark }" class="block">
    <video
      v-if="day.weather"
      :class="{ dark: !isDark }"
      class="videos"
      Pause
      playsinline
      autoplay
      muted
      loop
      disabled
      id="myVideo"
    >
      <source class="weather" :src="itemVideo" type="video/mp4" />
      Your browser does not support HTML5 video.
    </video>
    <div v-if="day.weather" class="text">
      <p class="text-title">
        {{ town.name }}
      </p>
      <p class="text-temp">{{ Math.round(this.day.main.temp) }}°</p>
      <p class="text-weather">
        {{ weatherOfWeek }}
      </p>
      <div class="text-group">
        <p class="text-max">
          {{ $t("Mx") }}: {{ Math.round(this.day.main.temp_max) }}°,
        </p>
        <p class="text-min">
          {{ $t("Mn") }}: {{ Math.round(this.day.main.temp_min) }}°
        </p>
      </div>
      <weather-slide-small></weather-slide-small>
    </div>
  </div>
</template>
<script>
import weatherSlideSmall from "./weatherSlideSmall.vue";
import { useDark } from "@vueuse/core";
import { mapGetters } from "vuex";
export default {
  components: {
    weatherSlideSmall,
  },
  setup() {
    const isDark = useDark();
    return { isDark };
  },
  props: {
    day: {
      type: Object,
      required: false,
    },
  },
  computed: {
    ...mapGetters(["town"]),
    weatherOfWeek() {
      if (this.$i18n.locale === "en") {
        return this.day.weather[0].main;
      } else {
        if (this.day.weather[0].main === "Clouds") {
          return "Облака";
        } else if (this.day.weather[0].main === "Rain") {
          return "Дождь";
        } else if (this.day.weather[0].main === "Clear") {
          return "Чистое небо";
        } else if (this.day.weather[0].main === "Snow") {
          return "Снег";
        } else {
          return false;
        }
      }
    },
    itemVideo() {
      if (this.day.weather[0].main == "Clouds") {
        return require(`../assets/videos/cumulus-cloud-on-a-blue-sky-free-video.mp4`);
      } else if (this.day.weather[0].main == "Rain") {
        return require(`../assets/videos/heavy-rain-droplets-hit-the-cement-floor-free-video.mp4`);
      } else if (this.day.weather[0].main == "Clear") {
        return require(`../assets/videos/clouds-moving-over-the-sun-free-video.mp4`);
      } else if (this.day.weather[0].main == "Snow") {
        return require(`../assets/videos/heavy-snow-background-falling-free-video.mp4`);
      } else {
        return false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.text {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 34px 0px 37px;
  &-title {
    font-family: "Inter";
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    color: #ffffff;
    margin-bottom: 6px;
    text-shadow: 1px 4px 4px rgba(0, 0, 0, 0.25);
  }
  &-temp {
    font-family: "Inter";
    font-weight: 500;
    font-size: 51px;
    line-height: 62px;
    padding-left: 22px;
    color: #ffffff;
    margin-bottom: 12px;
    text-shadow: 1px 4px 4px rgba(0, 0, 0, 0.25);
  }
  &-weather {
    font-family: "Inter";
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    color: #ffffff;
    text-shadow: 1px 4px 4px rgba(0, 0, 0, 0.25);
    margin-bottom: 14px;
  }
  &-group {
    display: flex;
    justify-content: center;
  }
  &-max {
    margin-right: 12px;
    font-family: "Inter";
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    text-shadow: 1px 4px 4px rgba(0, 0, 0, 0.25);
  }
  &-min {
    font-family: "Inter";
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    text-shadow: 1px 4px 4px rgba(0, 0, 0, 0.25);
  }
}
.weather {
  height: 100%;
}
.videos {
  border-radius: 21.2px;
  max-height: 535px;
  height: 100%;
  width: 100%;
  object-fit: cover;
  outline: 2px solid #fff;
}
.block {
  display: block;
  position: relative;
  &.dark::after {
    display: none;
  }
}
</style>
