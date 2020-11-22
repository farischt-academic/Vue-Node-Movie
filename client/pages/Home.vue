<template>
  <div class="container">
    <home-header> </home-header>
    <movie-carousel> </movie-carousel>
    <movie-container :liked="liked"> </movie-container>
  </div>
</template>

<script>
const HomeHeader = window.httpVueLoader("./components/HomeHeader.vue");
const MovieContainer = window.httpVueLoader("./components/MovieContainer.vue");
const MovieCarousel = window.httpVueLoader("./components/MovieCarousel.vue");

module.exports = {
  props: {
    liked: { type: Array, default: [] },
  },

  components: {
    "home-header": HomeHeader,
    "movie-container": MovieContainer,
    "movie-carousel": MovieCarousel,
  },
};
</script>

<style scoped>
.container {
  margin-top: 15vh;
}
</style>