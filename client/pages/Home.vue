<template>
  <div class="container">
    <home-header> </home-header>
    <movie-container :movies="movies"> </movie-container>
  </div>
</template>

<script>
const HomeHeader = window.httpVueLoader("./components/HomeHeader.vue");
const MovieContainer = window.httpVueLoader("./components/MovieContainer.vue");

module.exports = {
  props: {
    userId: { type: Number, default: null },
    userName: { type: String, default: "" },
    isLoggedIn: { type: Boolean, default: false },
  },
  components: { "home-header": HomeHeader, "movie-container": MovieContainer },
  data() {
    return {
      movies: [
        {
          title: "MOVIE TITLE",
          description: "gargraegaergaergeargaerg",
          duration: "1 h 47 min",
          id: 1,
        },
        {
          title: "MOVIE TITLE",
          description: "gargraegaergaergeargaerg",
          duration: "1 h 47 min",
          id: 2,
        },
        {
          title: "MOVIE TITLE",
          description: "gargraegaergaergeargaerg",
          duration: "1 h 47 min",
          id: 3,
        },
        {
          title: "MOVIE TITLE",
          description: "gargraegaergaergeargaerg",
          duration: "1 h 47 min",
          id: 4,
        },
        {
          title: "MOVIE TITLE",
          description: "gargraegaergaergeargaerg",
          duration: "1 h 47 min",
          id: 5,
        },
        {
          title: "MOVIE TITLE",
          description: "gargraegaergaergeargaerg",
          duration: "1 h 47 min",
          id: 6,
        },
      ],
    };
  },
};
</script>

<style scoped>
.container {
  margin-top: 15vh;
}
</style>