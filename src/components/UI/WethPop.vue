<template>
  <div class="pop" v-if="showPop">
    <div :class="{ dark: !isDark }" class="pop__content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { useDark } from "@vueuse/core";
export default {
  name: "weth-pop",
  computed: {
    ...mapGetters(["showPop"]),
  },
  setup() {
    const isDark = useDark();
    return { isDark };
  },
};
</script>
<style lang="scss" scoped>
.pop {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(91, 91, 91, 0.58);
  position: fixed;
  display: flex;
  &__content {
    margin: auto;
    background: #292b3f;
    border-radius: 20px;
    min-height: 176px;
    min-width: 600px;
    padding: 36px 54px 48px 65px;
    &.dark {
      background: #fff;
      color: #000;
    }
  }
}
@media (max-width: 620px) {
  .pop__content {
    min-width: 400px;
  }
}
@media (max-width: 620px) {
  .pop__content {
    padding: 36px 20px 48px 20px;
  }
}
@media (max-width: 620px) {
  .pop__content {
    min-width: 310px;
  }
}
</style>
