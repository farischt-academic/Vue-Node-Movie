<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
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
      <div v-if="!isLoggedIn" class="form-inline m-2">
        <label class="sr-only" for="email">Email</label>
        <input
          v-model="userInfo.email"
          type="text"
          name="email"
          class="form-control mb-2 mr-sm-2"
          id="email"
          placeholder="Email"
        />
        <label class="sr-only" for="password">Mot de passe</label>
        <div class="input-group mb-2 mr-sm-2">
          <input
            v-model="userInfo.password"
            type="password"
            class="form-control"
            id="password"
            placeholder="Mot de passe"
          />
        </div>
        <button @click="login(userInfo)" class="btn btn-info mb-2">
          Se connecter
        </button>
      </div>
      <button @click="logout()" v-if="isLoggedIn" class="btn btn-md btn-danger">
        Déconnexion
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
  data() {
    return {
      userInfo: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    logout() {
      this.$emit("logout");
    },

    login(userInfo) {
      this.$emit("login", userInfo);
    },
  },
};
</script>

<style scoped>
nav {
  background-color: black;
}

li {
  margin-right: 5px;
  border-radius: 5px;
}

li:hover {
  background-color: grey;
}
</style>