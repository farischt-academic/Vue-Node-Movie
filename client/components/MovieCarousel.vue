<template>
  <div
    id="carouselExampleIndicators"
    class="carousel slide"
    data-ride="carousel"
  >
    <div class="text-center display-4">Les films à la une</div>
    <ol class="carousel-indicators">
      <li
        data-target="#carouselExampleIndicators"
        data-slide-to="0"
        class="active"
      ></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
      <div
        v-for="(movie, index) in movies"
        :key="movie.id"
        v-bind:class="setActiveImg(index)"
      >
        <img v-bind:src="movie.url" />
        <div class="carousel-caption d-none d-md-block">
          <h5>{{ movie.title }}</h5>
          <p>{{ movie.realisator }}</p>
        </div>
      </div>
    </div>
    <a
      class="carousel-control-prev"
      href="#carouselExampleIndicators"
      role="button"
      data-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a
      class="carousel-control-next"
      href="#carouselExampleIndicators"
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
  props: {
    movies: { type: Array, default: [] },
  },

  methods: {
    setActiveImg(index) {
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
  height: 600px;
  max-height: 600px;
  object-fit: fill;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}

.text-center.display-4 {
  background-color: #e8ecef;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
</style>