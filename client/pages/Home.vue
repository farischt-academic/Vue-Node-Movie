<template>
  <div class="container">
    <home-header> </home-header>
    <movie-carousel :movies="movies"> </movie-carousel>
    <movie-container :movies="movies"> </movie-container>
  </div>
</template>

<script>
const HomeHeader = window.httpVueLoader("./components/HomeHeader.vue");
const MovieContainer = window.httpVueLoader("./components/MovieContainer.vue");
const MovieCarousel = window.httpVueLoader("./components/MovieCarousel.vue");

module.exports = {
  props: {
    userId: { type: Number, default: null },
    userName: { type: String, default: "" },
    isLoggedIn: { type: Boolean, default: false },
  },

  components: {
    "home-header": HomeHeader,
    "movie-container": MovieContainer,
    "movie-carousel": MovieCarousel,
  },

  data() {
    return {
      movies: [],
    };
  },

  async mounted() {
    try {
      const fetchedMovies = await axios.get("/api/movie/");
      this.movies = fetchedMovies.data;
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style scoped>
.container {
  margin-top: 15vh;
}
</style>