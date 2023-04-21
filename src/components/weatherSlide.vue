<template>
  <div class="weth-slider">
    <swiper
      :pagination="{ clickable: true }"
      :modules="modules"
      :autoplay="{
        delay: 2000,
        disableOnInteraction: false,
      }"
      class="mySwiper"
    >
      <swiper-slide v-for="image in this.images" :key="image">
        <img class="slide-image" :src="image.url" />
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue";
// Import Swiper styles
import "swiper/swiper-bundle.css";

import { mapGetters } from "vuex";
// import required modules
import { Pagination, Autoplay } from "swiper";

export default {
  data() {
    return {
      images: [],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  computed: {
    ...mapGetters(["pictures"]),
  },
  watch: {
    pictures: {
      handler() {
        if (this.pictures) {
          this.images = this.pictures;
        }
      },
      deep: true,
    },
  },
  setup() {
    return {
      modules: [Pagination, Autoplay],
    };
  },
};
</script>
<style lang="scss" scoped>
#mySlider .swiper-pagination-bullet {
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  color: #000;
  opacity: 1;
  background: rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 4;
}

#mySlider .swiper-pagination-bullet-active {
  color: #fff;
  background: #007aff;
}
.weth-slider {
  width: 100%;
  height: 100%;
}
.swiper {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &::after {
    position: absolute;
    display: block;
    z-index: 3;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: "";
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4));
  }
}
.swiper-slide img {
  display: block;
  width: 100%;
  height: 398px;
  object-fit: cover;
}
@media (max-width: 1440px) {
  .swiper {
    border-radius: 20px;
  }
  .weth-slider {
    max-width: 328px;
  }
  .swiper-slide {
    height: 281px;
    border-radius: 20px;
    &::after {
      border-radius: 20px;
    }
  }
}
@media (max-height: 1000px) {
  .swiper-slide {
    height: 275px;
  }
}
</style>
