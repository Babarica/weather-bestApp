<template>
  <input
    v-on:keyup.enter="searchCity"
    :value="city"
    @input="updateMessage"
    class="input"
    type="text"
  />
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "weth-input",
  methods: {
    ...mapMutations(["takeWeather", "disablePop"]),
    updateMessage(e) {
      this.$store.commit("updateCity", e.target.value);
    },
    searchCity(e) {
      this.$store.dispatch("takeInfo");
      e.target.value = "";
    },
  },
  computed: {
    ...mapState({
      city: (state) => state.message,
    }),
  },
};
</script>
<style lang="scss" scoped>
.input {
  outline: none;
}
</style>
