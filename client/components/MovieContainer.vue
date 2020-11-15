<template>
  <div class="album py-5">
    <h1 class="text-center">Notre séléction de films !</h1>
    <div class="container">
      <div class="row">
        <div v-for="movie in movies" :key="movie.id" class="col-md-4">
          <movie-card :movie="movie"> </movie-card>
        </div>
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
  border-radius: 10px;
  color: black;
}
</style>
