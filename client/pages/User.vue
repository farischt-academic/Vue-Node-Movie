<template>
  <div v-if="isLoggedIn" class="container">
    <!-- <h1>USER PAGE</h1>
    <h2> {{ userId }} <h2>
    <h2> {{ userName }} <h2>
    <div class="container-fluid"> 
        <ul>
           <li v-for="movie in equivalentMovie" :key="movie.id">
               <h3>{{ movie.title }}</h3>
           </li>
        </ul>
    </div>  -->
    <div class="row">
      <div class="col-sm-12">
        <h1 class="page-header text-center">Mon espace</h1>

        <div class="row placeholders">
          <div class="col-xs-6 col-sm-3 placeholder">
            <img
              src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
              width="200"
              height="200"
              class="img-responsive"
              alt="Generic placeholder thumbnail"
            />
            <h4>{{ userName }}</h4>
            <span class="text-muted">{{ userId }}</span>
          </div>
        </div>

        <form @submit.prevent="handleUpdatePassword()">
          <h2 class="sub-header">Changez mon mot de passe</h2>
          <div class="form-row">
            <div class="form-group col-md-4">
              <input
                @keyup="handlePasswordChange()"
                type="password"
                class="form-control"
                v-model="userInfos.currentPassword"
                placeholder="Mot de passe actuel"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <input
                @keyup="handlePasswordChange()"
                type="password"
                class="form-control"
                v-model="userInfos.newPassword"
                placeholder="Nouveau mot de passe"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <input
                @keyup="handlePasswordChange()"
                type="password"
                class="form-control"
                v-model="userInfos.repeatedPassword"
                placeholder="Nouveau mot de passe"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col">
              <button
                v-if="disabled"
                class="btn btn-danger my-2 my-sm-0 disabled"
                type="submit"
              >
                Modifier le mot de passe
              </button>
              <button v-else class="btn btn-info my-2 my-sm-0" type="submit">
                Modifier le mot de passe
              </button>
            </div>
          </div>
        </form>

        <form @submit.prevent="addMovie(movieInfos)">
          <h2 class="sub-header">Ajouter un film</h2>
          <div class="form-row">
            <div class="form-group col-md-4">
              <input
                v-model="movieInfos.title"
                type="text"
                class="form-control"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <input
                v-model="movieInfos.description"
                type="text"
                class="form-control"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <input
                v-model="movieInfos.url"
                type="text"
                class="form-control"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <input
                v-model="movieInfos.hours"
                type="number"
                class="form-control"
                placeholder="heures"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <input
                v-model="movieInfos.minutes"
                type="number"
                class="form-control"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <input
                v-model="movieInfos.realisator"
                type="text"
                class="form-control"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <input
                v-model="movieInfos.casting"
                type="text"
                class="form-control"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <input
                v-model="movieInfos.video"
                type="text"
                class="form-control"
              />
            </div>
          </div>
          <button class="btn btn-info my-2 my-sm-0" type="submit">
            Ajouter mon film
          </button>
        </form>

        <h2 class="sub-header">Mes likes</h2>
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Réalisateur</th>
                <th>Like</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="movie in equivalentMovie" :key="movie.id">
                <td>{{ movie.title }}</td>
                <td>{{ movie.realisator }}</td>
                <td>{{ movie.rating }}</td>
                <td>
                  <button
                    @click="deleteMovie(movie.id)"
                    class="btn btn-lg btn-danger btn-block"
                  >
                    Supprimer le film
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="container">
    <h1>Acces denied, please log in in order to access this page</h1>
  </div>
</template>

<script>
module.exports = {
  props: {
    userId: { type: Number, default: null },
    userName: { type: String, default: "" },
    isLoggedIn: { type: Boolean, default: false },
    liked: { type: Array, default: [] },
  },

  data() {
    return {
      equivalentMovie: [],
      userInfos: {
        currentPassword: "",
        newPassword: "",
        repeatedPassword: "",
      },
      movieInfos: {
        title: "Mon film",
        description: "Ma description",
        url: "Mon image",
        hours: 1,
        minutes: 10,
        realisator: "Mon réalisateur",
        casting: "John Doe, John Doe, John Doe",
        video: "https://www.youtube.com/embed/videoId",
      },
      disabled: true,
    };
  },

  mounted() {
    if (!this.isLoggedIn) this.$router.push("/register");
    else {
      this.liked.forEach(async (element) => {
        try {
          const movie = await axios.get("api/movie/" + element);
          this.equivalentMovie = [...this.equivalentMovie, movie.data];
        } catch (err) {
          console.log(err);
        }
      });
    }
  },

  methods: {
    handlePasswordChange() {
      if (
        this.userInfos.newPassword === this.userInfos.repeatedPassword &&
        this.userInfos.newPassword != "" &&
        this.userInfos.currentPassword != ""
      ) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },

    async handleUpdatePassword() {
      try {
        await axios.put("/api/auth/update-password", this.userInfos);
        alert("Votre mot de passe a été modifié avec succès");
      } catch (err) {
        console.log(err);
        alert("Une erreur est survenu, veuillez réssayer");
      }
    },

    deleteMovie(movieId) {
      this.$emit("delete-movie", movieId);
    },

    addMovie(movieInfos) {
      const cast = this.movieInfos.casting.split(", ");
      this.movieInfos.casting = cast;
      this.$emit("add-movie", movieInfos);
      this.movieInfos.casting = "John Doe, John Doe, John Doe";
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 15vh;
}

.sub-header {
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.placeholders {
  margin-bottom: 30px;
  text-align: center;
}
.placeholders h4 {
  margin-bottom: 0;
}
.placeholder {
  margin-bottom: 20px;
}
.placeholder img {
  display: inline-block;
  border-radius: 50%;
}
</style>