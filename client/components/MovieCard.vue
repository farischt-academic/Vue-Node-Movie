<template>
  <div class="card mb-4 shadow-sm">
    <svg
      class="bd-placeholder-img card-img-top"
      width="100%"
      height="225"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
      role="img"
      aria-label="Placeholder: Thumbnail"
    >
      <title>{{ movie.title }}</title>
      <rect width="100%" height="100%" fill="#55595c" />
      <text x="50%" y="50%" fill="#eceeef" dy=".3em">
        {{ movie.title }}
      </text>
    </svg>
    <div class="card-body">
      <p class="card-text">
        {{ movie.description }}
      </p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
          <button type="button" class="btn btn-sm btn-outline-secondary">
            View
          </button>
          <button type="button" class="btn btn-sm btn-outline-secondary">
            Edit
          </button>
        </div>
        <small class="text-muted">{{ movie.duration }}</small>
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
</style>