<template>
  <div class="jumbotron">
    <h1 class="display-4">Bienvenue sur Ciné+</h1>
    <p>
      Ciné+ est une plateforme et un service gratuit de renseignements sur des
      films. Vous y retrouverez les dernières sorties ainsi que notre sélections
      de films. Pensez à vous inscrire pour pouvoir profiter de toutes nos
      fonctionnalités !
    </p>
    <p>
      <router-link
        to="/register"
        class="btn btn-info btn-lg"
        href="#"
        role="button"
        >S'inscrire &raquo;</router-link
      >
    </p>
  </div>
</template>

<script>
module.exports = {};
</script>

<style scoped>
p {
  text-align: justify;
}

.jumbotron {
  background-color: white;
}
</style>