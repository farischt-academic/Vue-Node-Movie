<template>
  <div class="container">
    <div v-if="!isLoggedIn" class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">Connectez-vous !</h1>
      <input
        v-model="userInfo.email"
        name="email"
        type="text"
        class="form-control"
        placeholder="Email"
        required
        autoFocus
      />
      <input
        v-model="userInfo.password"
        name="password"
        type="password"
        class="form-control"
        placeholder="Mot de passe"
        required
      />
      <button
        @click.prevent="login(userInfo)"
        type="submit"
        class="btn btn-lg btn-primary btn-block"
      >
        Se connecter
      </button>
    </div>
  </div>
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
  mounted() {
    if (this.isLoggedIn) this.$router.push("/");
  },

  methods: {
    login(userInfo) {
      this.$emit("login", userInfo);
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 15vh;
}

h1 {
  text-align: center;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
  border-radius: 20px;
  background-color: #353a40;
  color: white;
}

.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}

.form-signin input[name="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[name="password"] {
  margin-bottom: 10px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.btn {
  margin-top: 10px;
}
</style>