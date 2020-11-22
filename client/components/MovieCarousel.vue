<template>
  <div id="carousel" class="carousel slide" data-ride="carousel">
    <div class="text-center display-4">Les films les mieux notés</div>
    <div class="carousel-inner">
      <div
        v-for="(movie, index) in mostLikedMovies"
        :key="movie.id"
        v-bind:class="setActiveItem(index)"
      >
        <img v-bind:src="movie.url" />
        <div class="carousel-caption d-none d-md-block">
          <h5>{{ movie.title }}</h5>
          <p>{{ movie.realisator }}</p>
          <p>{{ index + 1 }} / {{ mostLikedMovies.length }}</p>
        </div>
      </div>
    </div>
    <a
      class="carousel-control-prev"
      href="#carousel"
      role="button"
      data-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a
      class="carousel-control-next"
      href="#carousel"
      role="button"
      data-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
module.exports = {
  data() {
    return {
      mostLikedMovies: [],
    };
  },

  async mounted() {
    try {
      const res = await axios.get("/api/movie/carousel/most-liked");
      this.mostLikedMovies = res.data;
    } catch (err) {
      console.log(err);
      this.mostLikedMovies = [];
    }
  },

  methods: {
    setActiveItem(index) {
      if (index === 0) {
        return "carousel-item active";
      }
      return "carousel-item";
    },
  },
};
</script>

<style scoped>
.carousel-item.active,
.carousel-item img {
  width: 100%;
  height: 90vh;
  max-height: 90vh;
  object-fit: fill;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}

.text-center.display-4 {
  background-color: #e8ecef;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}

/* @media screen and (max-width: 600px) {
  .text-center.display-4 {
    font-size: 30px;
  }
} */
</style>