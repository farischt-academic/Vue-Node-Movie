<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
    <a class="navbar-brand" href="#">Ciné +</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarCollapse"
      aria-controls="navbarCollapse"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/"> Accueil </router-link>
        </li>
        <li v-if="!isLoggedIn" class="nav-item">
          <router-link class="nav-link" to="/register">
            S'inscrire
          </router-link>
        </li>
        <li v-if="!isLoggedIn" class="nav-item">
          <router-link class="nav-link" to="/login"> Se connecter </router-link>
        </li>
      </ul>
      <button @click="logout()" v-if="isLoggedIn" class="btn btn-md btn-danger">
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-power"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M5.578 4.437a5 5 0 1 0 4.922.044l.5-.866a6 6 0 1 1-5.908-.053l.486.875z"
          />
          <path fill-rule="evenodd" d="M7.5 8V1h1v7h-1z" />
        </svg>
      </button>
    </div>
  </nav>
</template>

<script>
module.exports = {
  props: {
    userId: { type: Number, default: null },
    userName: { type: String, default: "" },
    isLoggedIn: { type: Boolean, default: false },
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
  },
};
</script>

<style scoped>
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>