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
          <button
            @click="handleClick()"
            type="button"
            class="btn btn-sm btn-outline-secondary"
          >
            Voir plus
          </button>
          <button type="button" class="btn btn-sm btn-outline-secondary">
            Modifier
          </button>
          <button
            v-if="!setLiked"
            @click.prevent="like(movie.id)"
            type="button"
            class="btn btn-sm btn-outline-secondary bg-info text-light"
          >
            {{ movie.rating }}
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-suit-heart-fill"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"
              />
            </svg>
          </button>

          <button
            v-else
            type="button"
            class="btn btn-sm btn-outline-secondary bg-danger text-light"
          >
            {{ movie.rating }}
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-hand-thumbs-down"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28v1c.563 0 .901.272 1.066.56.086.15.121.3.121.416 0 .12-.035.165-.04.17l-.354.353.353.354c.202.202.407.512.505.805.104.312.043.44-.005.488l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.415-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.353.352.373.714.267 1.021-.122.35-.396.593-.571.651-.653.218-1.447.224-2.11.164a8.907 8.907 0 0 1-1.094-.17l-.014-.004H9.62a.5.5 0 0 0-.595.643 8.34 8.34 0 0 1 .145 4.725c-.03.112-.128.215-.288.255l-.262.066c-.306.076-.642-.156-.667-.519-.075-1.081-.239-2.15-.482-2.85-.174-.502-.603-1.267-1.238-1.977C5.597 8.926 4.715 8.23 3.62 7.93 3.226 7.823 3 7.534 3 7.28V3.279c0-.26.22-.515.553-.55 1.293-.138 1.936-.53 2.491-.869l.04-.024c.27-.165.495-.296.776-.393.277-.096.63-.163 1.14-.163h3.5v-1H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z"
              />
            </svg>
          </button>
        </div>
        <small class="text-muted"
          >{{ movie.hours }}h{{ movie.minutes }}min</small
        >
      </div>
    </div>

    <div v-if="showModal" class="modal" role="dialog">
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
                <p class="font-weight-bold">Bande annonce:</p>
                <div class="embed-responsive embed-responsive-16by9">
                  <iframe
                    class="embed-responsive-item"
                    v-bind:src="movie.video"
                    allowfullscreen
                  ></iframe>
                </div>
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
  </div>
</template>

<script>
const MovieModal = window.httpVueLoader("./MovieModal.vue");

module.exports = {
  props: {
    movie: { type: Object, default: {} },
    liked: { type: Array, default: [] },
  },

  data() {
    return {
      showModal: false,
      //internalLiked: this.liked,
    };
  },

  methods: {
    handleClick() {
      if (this.showModal === false) {
        this.showModal = !this.showModal;
      } else this.showModal = false;
    },

    async like() {
      try {
        await axios.put("/api/movie/like/" + this.movie.id);
        const currentUser = await axios.get("/api/auth/currentUser");
        this.liked = currentUser.data.liked;
      } catch (err) {
        console.log(err);
      }
    },
    /*   like(movieId) {
      this.$emit("like", movieId);
    },*/
  },

  computed: {
    setLiked: function () {
      const findLike = this.liked.find((element) => element === this.movie.id);
      if (findLike) return true;
      else return false;
    },
  },
};
</script>

<style scoped>
.card-text {
  text-align: justify;
}

.modal {
  display: flex;
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  max-height: 100vh;
  overflow: auto;
}
</style>