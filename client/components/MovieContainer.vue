<template>
  <div class="album py-3">
    <h1 class="text-center display-4">Notre sélection</h1>
    <nav>
      <ul class="pagination justify-content-center">
        <li v-for="index in maxPages" :key="index" class="page-item">
          <button @click="fetchActualPageMovies(index)" class="page-link">
            {{ index }}
          </button>
        </li>
      </ul>
    </nav>
    <div class="row m-2">
      <div v-for="movie in actualPageMovies" :key="movie.id" class="col-md-4">
        <movie-card :movie="movie" :liked="liked"> </movie-card>
      </div>
    </div>
  </div>
</template>

<script>
const MovieCard = window.httpVueLoader("./components/MovieCard.vue");

module.exports = {
  components: { "movie-card": MovieCard },
  props: {
    liked: { type: Array, default: [] },
  },
  data() {
    return {
      moviesPerPage: 3,
      maxPages: 0,
      actualPageMovies: [],
      initialPage: 1,
    };
  },

  async mounted() {
    try {
      const res = await axios.get("/api/movie/number/" + this.moviesPerPage);
      this.maxPages = res.data.numberOfPages;
    } catch (err) {
      console.log(err);
      this.maxPages = 0;
    }

    try {
      const res = await axios.get(
        "/api/movie/page/nbmovies=" +
          this.moviesPerPage +
          "&pagenumber=" +
          this.initialPage
      );
      this.actualPageMovies = res.data;
    } catch (err) {
      console.log(err);
      this.actualPageMovies = [];
    }
  },

  methods: {
    async fetchActualPageMovies(pageNumber) {
      try {
        const res = await axios.get(
          "/api/movie/page/nbmovies=" +
            this.moviesPerPage +
            "&pagenumber=" +
            pageNumber
        );
        this.actualPageMovies = res.data;
        //window.scrollTo(10, 10);
      } catch (err) {
        console.log(err);
        this.actualPageMovies = [];
      }
    },
  },

  /*computed: {
    numberOfPages: function () {
      return this.movies.length / this.moviesPerPage;
    },
  },*/
};
</script>

<style scoped>
.album {
  border-radius: 5px;
  color: black;
  margin-top: 50px;
}
</style>
