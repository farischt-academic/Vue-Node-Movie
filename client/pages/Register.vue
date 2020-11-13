<template>
  <div class="container">
    <div v-if="!isLoggedIn" class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">Inscrivez-vous !</h1>
      <input
        v-model="userInfo.name"
        name="name"
        type="text"
        class="form-control"
        placeholder="Prénom"
        required
        autoFocus
      />
      <input
        v-model="userInfo.email"
        name="email"
        type="email"
        class="form-control"
        placeholder="Adresse e-mail"
        required
      />
      <input
        v-model="userInfo.password"
        @keyup="handlePasswordChange()"
        name="password"
        type="password"
        class="form-control"
        placeholder="Mot de passe"
        required
      />
      <input
        v-model="userInfo.repeatedPassword"
        @keyup="handlePasswordChange()"
        name="repeatedPassword"
        type="password"
        class="form-control"
        placeholder="Répétez votre mot de passe"
        required
      />
      <div className="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Se souvenir de moi
        </label>
      </div>
      <button
        v-if="!disabled"
        @click.prevent="register(userInfo)"
        class="btn btn-lg btn-primary btn-block"
        type="submit"
      >
        S'inscrire
      </button>
      <button
        v-else
        type="submit"
        class="btn btn-lg btn-primary btn-block"
        disabled
      >
        S'inscrire
      </button>
      <p class="mt-5 mb-3 text-muted">&copy; 2020-2020</p>
    </div>

    <div v-else class="container-fluid">
      <h1>Acces denied, Redirecting you...</h1>
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
        name: "",
        email: "",
        password: "",
        repeatedPassword: "",
      },

      disabled: true,
    };
  },

  mounted() {
    if (this.isLoggedIn) this.$router.push("/");
  },

  methods: {
    handlePasswordChange() {
      if (
        this.userInfo.password === this.userInfo.repeatedPassword &&
        this.userInfo.password != ""
      ) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },

    register(userInfo) {
      this.$emit("register", userInfo);
    },
  },
};
</script>

<style scoped>
h1,
p {
  text-align: center;
}

.container {
  margin-top: 15vh;
}

.form-signin {
  background-color: #353a40;
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
  border-radius: 20px;
  color: white;
}
.form-signin .checkbox {
  font-weight: 400;
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
.form-signin input[name="name"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[name="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[name="password"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[name="repeatedPassword"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
