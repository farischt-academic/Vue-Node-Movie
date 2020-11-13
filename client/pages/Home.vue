<template>
  <div class="container">
    <home-header />
  </div>
</template>

<script>
const HomeHeader = window.httpVueLoader("./components/HomeHeader.vue");
module.exports = {
  components: { "home-header": HomeHeader },
};
</script>

<style scoped>
.container {
  margin-top: 15vh;
}
</style>