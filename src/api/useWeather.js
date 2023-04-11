import axios from "axios";
import { ref } from "vue";

export function useWeather(city) {
  const weatherDays = ref([]);
  const pictures = ref([]);
  const town = ref([]);
  const error = ref(false);
  const day = ref([]);
  const time = ref([]);
  const fetching = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=ef1997cc54103c25f43ed4a7059f612c`,
        {
          headers: {
            accept: "application/json",
          },
        }
      );
      time.value = response.data.list;
      weatherDays.value = response.data.list.filter(
        (day) => day.dt_txt.split(" ")[1] === "18:00:00"
      );
      town.value = response.data.city;
      day.value = response.data.list[0];
      if (weatherDays.value) {
        const responsePic = await axios.get(
          `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI`,
          {
            params: {
              q: city + " city",
              pageNumber: "1",
              pageSize: "10",
              autoCorrect: "true",
            },
            headers: {
              "X-RapidAPI-Key":
                "fc7bb6c517msh9f32d9b8749a14dp10f7c9jsn9799be1db12d",
              "X-RapidAPI-Host":
                "contextualwebsearch-websearch-v1.p.rapidapi.com",
            },
          }
        );
        pictures.value = responsePic.data.value.splice(0, 3);
      }
    } catch (e) {
      error.value = true;
    }
  };
  fetching();
  return {
    weatherDays,
    error,
    pictures,
    town,
    day,
    time,
  };
}
