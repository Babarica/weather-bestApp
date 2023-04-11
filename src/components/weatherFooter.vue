<template>
  <div class="footer" :class="{ dark: !isDark }">
    <div class="footer-social">
      <p class="footer-me">Made by Babarica</p>
      <a
        class="footer-inst"
        href="https://instagram.com/ikaamer?igshid=YmMyMTA2M2Y="
        >Instagramm</a
      >
      <a class="footer-vk" href="https://vk.com/iluxa512">Vkontakte</a>
      <a class="footer-git" href="https://github.com/Babarica">GitHub</a>
    </div>
    <div class="footer-switch">
      <a class="footer-lang" @click="setLocale">{{ $t("En") }}</a>
      <div @click="toggleDark()" class="footer-btn">
        <div class="button r" id="button-1">
          <input type="checkbox" :checked="!isDark" class="checkbox" />
          <div class="knobs"></div>
          <div class="layer"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useDark, useToggle } from "@vueuse/core";
export default {
  setup() {
    const isDark = useDark();
    const toggleDark = useToggle(isDark);
    return { toggleDark, isDark };
  },
  methods: {
    setLocale() {
      this.$i18n.locale === "en"
        ? (this.$i18n.locale = "ru")
        : (this.$i18n.locale = "en");
    },
  },
};
</script>
<style lang="scss">
a {
  font-family: "Inter";
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  text-decoration: none;
  line-height: 19px;
  margin-left: 65px;
  position: relative;
  &::after {
    content: "";
    width: 21px;
    height: 21px;
    position: absolute;
    display: block;
    background: #fff;
    left: -31px;
    top: 0;
  }
}

.footer {
  &.dark {
    color: #000;
  }
  color: #fff;
  a {
    color: #fff;
  }
  &.dark a {
    color: #000;
  }
  &.dark::after {
    background-color: #000;
  }
  &::after {
    width: 96%;
    height: 1px;
    content: "";
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 2%;
  }
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  padding: 31px 21px 24px 25px;
  &-social {
    display: flex;
    align-content: center;
    align-items: center;
  }
  &-lang {
    margin-right: 17px;
    z-index: 3;
    cursor: pointer;
    &::after {
      display: none;
    }
  }
  &-btn {
    position: relative;
  }
  &-switch {
    display: flex;
  }
  &-me {
    font-family: "Inter";
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 19px;
  }
  &-inst::after {
    background: url(../assets/images/UI/intagramm.png) no-repeat center;
  }
  &-vk::after {
    background: url(../assets/images/UI/vkontakte.png) no-repeat center;
  }
  &-git::after {
    background: url(../assets/images/UI/github.png) no-repeat center;
  }
}
.button-cover {
  height: 100px;
  margin: 20px;
  background-color: #fff;
  box-shadow: 0 10px 20px -8px #c5d6d6;
  border-radius: 4px;
}

.button-cover:before {
  counter-increment: button-counter;
  content: counter(button-counter);
  position: absolute;
  right: 0;
  bottom: 0;
  color: #d7e3e3;
  font-size: 12px;
  line-height: 1;
  padding: 5px;
}

.button-cover,
.knobs,
.layer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.button {
  position: relative;
  top: 70%;
  width: 67px;
  height: 32px;
  margin: -20px auto 0 auto;
  overflow: hidden;
}

.button.r,
.button.r .layer {
  border-radius: 100px;
}

.button.b2 {
  border-radius: 2px;
}

.checkbox {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 3;
}

.knobs {
  z-index: 2;
}

.layer {
  width: 100%;
  border: 1px solid #fff;
  transition: 0.3s ease all;
  z-index: 1;
}

/* Button 1 */
#button-1 .knobs:before {
  content: "";
  position: absolute;
  top: 0px;
  left: 0px;
  width: 31px;
  height: 32px;
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  line-height: 1;
  padding: 9px 4px;
  background-color: #fff;
  border-radius: 50%;
  transition: 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15) all;
}

#button-1 .checkbox:checked + .knobs:before {
  content: "";
  left: 36px;
  background-color: #000;
}

#button-1 .checkbox:checked ~ .layer {
  border: 1px solid #000;
}

#button-1 .knobs,
#button-1 .knobs:before,
#button-1 .layer {
  transition: 0.3s ease all;
}
@media (max-width: 700px) {
  .footer-git {
    font-size: 0px;
  }
  .footer-vk {
    font-size: 0px;
  }
  .footer-inst {
    font-size: 0px;
  }
}
@media (max-width: 475px) {
  .footer-lang {
    margin-left: 10px;
  }
  .footer-git {
    font-size: 0px;
  }
  .footer-vk {
    font-size: 0px;
  }
  .footer-inst {
    font-size: 0px;
  }
  a {
    margin-left: 40px;
  }
}
@media (max-width: 350px) {
  .footer-me {
    font-size: 12px;
  }
  a {
    margin-left: 30px;
  }
}
</style>
