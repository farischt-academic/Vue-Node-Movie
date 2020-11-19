<template>
  <div class="card mb-4 shadow-sm">
    <img
      class="bd-placeholder-img card-img-top"
      v-bind:src="movie.url"
      width="100%"
      height="225"
    />
    <div class="card-body">
      <h1>{{ movie.title }}</h1>
      <p class="card-text">{{ movie.description }}</p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
          <button type="button" class="btn btn-sm btn-outline-secondary">
            Voir plus
          </button>
          <button type="button" class="btn btn-sm btn-outline-secondary">
            Modifier
          </button>
        </div>
        <small class="text-muted"
          >{{ movie.hours }}h{{ movie.minutes }}min</small
        >
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    movie: { type: Object, default: {} },
  },
};
</script>

<style scoped>
.card-text {
  text-align: justify;
}
</style>