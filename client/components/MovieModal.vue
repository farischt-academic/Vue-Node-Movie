<template>
  <div class="modal" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ movie.title }}</h5>
          <button
            @click="handleClick()"
            type="button"
            class="close"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <p class="font-weight-bold">Réalisateur:</p>
              {{ movie.realisator }}
            </li>
            <li class="list-group-item">
              <p class="font-weight-bold">Acteurs:</p>
              {{ movie.casting.join(", ") }}
            </li>
            <li class="list-group-item">
              <p class="font-weight-bold">Résumé:</p>
              {{ movie.description }}
            </li>
          </ul>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="handleClick()"
          >
            Close
          </button>
        </div>
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
.modal {
  display: flex;
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
</style>