<template>
  <div class="album py-3">
    <h1 class="text-center display-4">Notre sélection</h1>
    <div class="row m-2">
      <div v-for="movie in movies" :key="movie.id" class="col-md-4">
        <movie-card :movie="movie" :liked="liked"> </movie-card>
      </div>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li v-for="index in numberOfPages" :key="index" class="page-item">
          <a class="page-link" href="#">{{ index }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
const MovieCard = window.httpVueLoader("./components/MovieCard.vue");

module.exports = {
  components: { "movie-card": MovieCard },
  props: {
    movies: { type: Array, default: [] },
    liked: { type: Array, default: [] },
  },
  data() {
    return {
      moviesPerPage: 1,
    };
  },
  computed: {
    numberOfPages: function () {
      return this.movies.length / this.moviesPerPage;
    },
  },
};
</script>

<style scoped>
.album {
  border-radius: 5px;
  color: black;
  margin-top: 50px;
}
</style>
