<template>
  <div
    @mouseover="rule = true"
    @mouseleave="rule = false"
    :class="{ active: followBell === num, dark: !isDark }"
    class="block"
  >
    <video
      :class="{ active: followBell === num, dark: !isDark }"
      class="video"
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
    <div class="text">
      <p class="text-title">
        {{ dayOfWeek }}
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
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { useDark } from "@vueuse/core";
export default {
  setup() {
    const isDark = useDark();
    return { isDark };
  },
  data() {
    return {
      rule: false,
    };
  },
  props: {
    day: {
      type: Object,
      required: true,
    },
    num: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["followBell"]),
    dayOfWeek() {
      var daysR = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
      var daysE = ["Su", "Mn", "Tu", "We", "Tu", "Fr", "Sa"];
      var myDate = new Date(this.day.dt_txt.split(" ")[0]);
      if (this.$i18n.locale === "en") {
        return daysE[myDate.getDay()];
      } else {
        return daysR[myDate.getDay()];
      }
    },
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
  mounted() {
    this.pauseVid();
  },
  methods: {
    pauseVid() {
      const video = document.querySelectorAll(".video");
      if (this.num !== this.followBell) {
        video[this.num].pause();
      } else {
        video[this.num].play();
      }
    },
  },
  watch: {
    followBell: function () {
      const video = document.querySelectorAll(".video");
      if (this.num !== this.followBell) {
        video[this.num].pause();
      } else {
        video[this.num].play();
      }
    },
    rule: function () {
      const video = document.querySelectorAll(".video");
      if (this.num !== this.followBell) {
        if (this.rule !== false) {
          video[this.num].play();
        } else {
          video[this.num].pause();
        }
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
  padding: 55px 0px 0px 0px;
  &-title {
    font-family: "Inter";
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    color: #ffffff;
    margin-bottom: 263px;
    text-shadow: 1px 4px 4px rgba(0, 0, 0, 0.25);
  }
  &-temp {
    font-family: "Inter";
    font-weight: 500;
    font-size: 51px;
    line-height: 62px;
    padding-left: 22px;
    color: #ffffff;
    margin-bottom: 20px;
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
.video {
  border-radius: 21.2px;
  height: 81vh;
  width: 195px;
  object-fit: cover;
  &.active {
    outline: 2px solid #fff;
    &.dark {
      outline: 2px solid #000;
    }
  }
}
.active {
  &::after {
    opacity: 0;
  }
}
.block {
  cursor: pointer;
  display: block;
  position: relative;
  &.dark::after {
    display: none;
  }
  &::after {
    position: absolute;
    content: "";
    border-radius: 20px;
    top: 0;
    left: 0;
    bottom: 7px;
    right: 0;
    display: block;
    background: linear-gradient(
      0deg,
      rgba(41, 43, 63, 0.8),
      rgba(41, 43, 63, 0.8)
    );
    transition: 0.3s all ease-in;
  }
  &:hover::after {
    opacity: 0;
    transition: 0.3s all ease-in;
  }
}
@media (max-width: 1550px) {
  .video {
    width: 184px;
    height: 76vh;
  }
}
@media (max-height: 1000px) {
  .text-title {
    margin-bottom: 128px;
  }
  .video {
    border-radius: 21.7px;
  }
  .block::after {
    border-radius: 20px;
  }
}
</style>
