import { createStore } from "vuex";
import { useWeather } from "../api/useWeather";
export default createStore({
  state: {
    city: "",
    data: [],
    pictures: [],
    weekWeather: [],
    show: true,
    town: [],
    bell: 0,
    miss: [],
  },
  getters: {
    showPop: (state) => state.show,
    showWeather: (state) => state.data.weatherDays,
    town: (state) => state.data.town,
    followBell: (state) => state.bell,
    miss: (state) => state.data.weatherDays[state.bell],
    day: (state) => state.data.day,
    pictures: (state) => state.data.pictures,
    error: (state) => state.data.error,
    time: (state) => state.data.time,
    loading: (state) => state.data.loading,
  },
  mutations: {
    updateCity(state, city) {
      state.city = city;
    },
    takeWeather(state) {
      state.bell = 0;
      localStorage.setItem("city", state.city);
      state.data = useWeather(state.city);
    },
    takeFromLocal(state) {
      state.data = useWeather(localStorage.getItem("city"));
      state.bell = 0;
    },
    disablePop(state) {
      state.show = false;
    },
    updateActive(state, bell) {
      state.bell = bell;
      try {
        state.miss = state.data.weatherDays[bell];
      } catch {
        console.log("Unknow city");
      }
    },
  },
  actions: {
    takeData({ commit }) {
      commit("takeWeather");
    },
    takeSomeLocale({ commit }) {
      commit("disablePop");
      commit("takeFromLocal");
      setTimeout(() => {
        commit("updateActive", 0);
      }, 800);
    },
    async takeInfo({ dispatch, commit }) {
      await dispatch("takeData");
      commit("disablePop");
      setTimeout(() => {
        commit("updateActive", 0);
      }, 800);
    },
  },
});
