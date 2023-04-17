<template>
  <div class="spinner-box">
    <div class="circle-border">
      <div :class="{ dark: !isDark }" class="circle-core"></div>
    </div>
  </div>
</template>

<script setup>
import { useDark } from "@vueuse/core";
const isDark = useDark();
</script>

<style lang="scss" scoped>
.spinner-box {
  width: 100%;
  margin-top: 100px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}
.circle-border {
  width: 150px;
  height: 150px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: rgb(63, 249, 220);
  background: linear-gradient(
    0deg,
    rgba(60, 61, 74, 0.1) 33%,
    rgba(63, 249, 220, 1) 100%
  );
  animation: spin 0.8s linear 0s infinite;
}

.circle-core {
  width: 100%;
  height: 100%;
  background-color: #292b3f;
  border-radius: 50%;
  &.dark {
    background: #d9d9d9;
  }
}
@keyframes spin {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(359deg);
  }
}
@media (max-width: 1440px) {
  .spinner-box {
    margin-top: 59px;
    width: 328px;
  }
}
@media (max-width: 400px) {
  .spinner-box {
    width: 300px;
  }
}
</style>
