const Register = window.httpVueLoader("./pages/Register.vue");
const Login = window.httpVueLoader("./pages/Login.vue");
const Home = window.httpVueLoader("./pages/Home.vue");
const NavBar = window.httpVueLoader("./components/NavBar.vue");
const Footer = window.httpVueLoader("./components/Footer.vue");

const routes = [
  { path: "/", component: Home },
  { path: "/register", component: Register },
  { path: "/login", component: Login },
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
  },
  async mounted() {
    try {
      const currentUser = await axios.get("/api/auth/currentUser");
      this.userId = currentUser.data.id;
      this.userName = currentUser.data.name;
      this.isLoggedIn = true;
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
        this.$router.push("/");
      } catch (err) {
        console.log(err);
        this.isLoggedIn = true;
      }
    },
  },
});
