const Register = window.httpVueLoader("./pages/Register.vue");
const Home = window.httpVueLoader("./pages/Home.vue");
const User = window.httpVueLoader("./pages/User.vue");
const NavBar = window.httpVueLoader("./components/NavBar.vue");
const Footer = window.httpVueLoader("./components/Footer.vue");

const routes = [
  { path: "/", component: Home },
  { path: "/register", component: Register },
  { path: "/user", component: User },
];

const router = new VueRouter({
  routes,
});

var app = new Vue({
  router,
  el: "#app",
  components: { "nav-bar": NavBar, "footer-component": Footer },
  data: {
    userId: null,
    userName: "",
    isLoggedIn: false,
    liked: [],
  },
  async mounted() {
    try {
      const currentUser = await axios.get("/api/auth/currentUser");
      this.userId = currentUser.data.id;
      this.userName = currentUser.data.name;
      this.isLoggedIn = true;
      this.liked = currentUser.data.liked;
    } catch (err) {
      console.log(err);
      this.isLoggedIn = false;
    }
  },
  methods: {
    async register(userInfo) {
      try {
        await axios.post("/api/auth/register", userInfo);
        alert("Votre inscription est enregistrée");
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },

    async login(userInfo) {
      try {
        const loginResponse = await axios.post("/api/auth/login", userInfo);
        this.userId = loginResponse.data.id;
        this.userName = loginResponse.data.name;
        this.isLoggedIn = true;
        this.liked = loginResponse.data.liked;
        if (this.$route.path !== "/") this.$router.push("/");
      } catch (err) {
        console.log(err);
        this.isLoggedIn = false;
      }
    },

    async logout() {
      try {
        await axios.get("/api/auth/logout");
        this.userId = null;
        this.userName = "";
        this.isLoggedIn = false;
        this.liked = [];
        if (this.$route.path !== "/") this.$router.push("/");
      } catch (err) {
        console.log(err);
        this.isLoggedIn = true;
      }
    },

    async addMovie(movieInfos) {
      try {
        await axios.post("/api/movie/", movieInfos);
        alert("Votre ajout a été enregistré");
      } catch (err) {
        console.log(err);
        alert("Une erreur est survenu");
      }
    },

    async deleteMovie(movieId) {
      try {
        await axios.delete("/api/movie/delete/" + movieId);
        const currentUser = await axios.get("/api/auth/currentUser");
        this.liked = currentUser.data.liked;
        alert("Le film a bien été supprimé !");
      } catch (err) {
        console.log(err);
      }
    },

    async like(movieId) {
      try {
        await axios.put("/api/movie/like/" + movieId);
        const currentUser = await axios.get("/api/auth/currentUser");
        this.liked = currentUser.data.liked;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
