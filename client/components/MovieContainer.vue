<template>
  <div class="album py-3">
    <h1 class="text-center display-4">Notre selection</h1>
    <div class="row m-2">
      <div v-for="movie in movies" :key="movie.id" class="col-md-4">
        <movie-card :movie="movie"> </movie-card>
      </div>
    </div>
  </div>
</template>

<script>
const MovieCard = window.httpVueLoader("./components/MovieCard.vue");

module.exports = {
  components: { "movie-card": MovieCard },
  props: {
    movies: { type: Array, default: [] },
  },
};
</script>

<style scoped>
.album {
  background-color: #e8ecef;
  border-radius: 5px;
  color: black;
  margin-top: 50px;
}
</style>
