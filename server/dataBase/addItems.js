const { Client } = require("pg");

client = new Client({
  user: "postgres", //process.env.DB_USER,
  host: "localhost", //process.env.DB_HOST,
  password: "lolilollpb", //process.env.DB_PASSWORD,
  database: "PROJETWEB", //process.env.DB_NAME,
});

client.connect();

const movies = [
  {
    title: "Inception",
    description:
      "Dom Cobb est un voleur expérimenté – le meilleur qui soit dans l’art périlleux de l’extraction : sa spécialité consiste à s’approprier les secrets les plus précieux d’un individu, enfouis au plus profond de son subconscient, pendant qu’il rêve et que son esprit est particulièrement vulnérable. Très recherché pour ses talents dans l’univers trouble de l’espionnage industriel, Cobb est aussi devenu un fugitif traqué dans le monde entier qui a perdu tout ce qui lui est cher.",
    rating: 0,
    casting: ["Leonardo Dicaprio", "Marion Cotillard", "Ellen Page"],
    url:
      "https://images-na.ssl-images-amazon.com/images/I/81CgNB2mglL._SL1425_.jpg",
    hours: 3,
    minutes: 1,
    realisator: "Christopher Nolan",
    video: "https://www.youtube.com/embed/CPTIgILtna8",
  },
  {
    title: "Interstellar",
    description:
      "Le film raconte les aventures d’un groupe d’explorateurs qui utilisent une faille récemment découverte dans l’espace-temps afin de repousser les limites humaines et partir à la conquête des distances astronomiques dans un voyage interstellaire. ",
    rating: 0,
    casting: [
      "Matthew McConaughey",
      "Anne Hathaway",
      "Michael Caine",
      "Michael Caine",
    ],
    url:
      "https://cinemadauphine.fr/wp-content/uploads/2014/11/matthew-mcconaughey-in-interstellar-wide.jpg",
    hours: 2,
    minutes: 10,
    realisator: "Christopher Nolan",
    video: "https://www.youtube.com/embed/VaOijhK3CRU",
  },
  {
    title: "Star Wars IX",
    description:
      "Environ un an après la mort de Luke Skywalker2, la Résistance tente de survivre face au Premier Ordre, désormais mené par un nouveau Suprême Leader, Kylo Ren. Une rumeur agite cependant toute la galaxie : l'Empereur Palpatine serait de retour. Tandis que Rey s'entraîne sous la houlette de la Générale Leia Organa, Kylo Ren cherche à défier Palpatine, qu'il considère comme une menace à son pouvoir.",
    rating: 0,
    casting: ["Daisy Ridley", "Adam Driver", "Oscar Isaac"],
    url:
      "https://lumiere-a.akamaihd.net/v1/images/riseofskywalker-moviepage-emeagrid-m_a2600ffe.jpeg?region=0,0,800,600",
    hours: 2,
    minutes: 22,
    realisator: "J.J Abrams",
    video: "https://www.youtube.com/embed/pHgwf2eMFnA",
  },
  /*{
    title: "",
    description: "",
    rating: 0,
    cast: [""],
    url: "",
    duration: "",
    realisator: "",
  },
  {
    title: "",
    description: "",
    rating: 0,
    cast: [""],
    url: "",
    duration: "",
    realisator: "",
  },
  {
    title: "",
    description: "",
    rating: 0,
    cast: [""],
    url: "",
    duration: "",
    realisator: "",
  },
  {
    title: "",
    description: "",
    rating: 0,
    cast: [""],
    url: "",
    duration: "",
    realisator: "",
  },
  {
    title: "",
    description: "",
    rating: 0,
    cast: [""],
    url: "",
    duration: "",
    realisator: "",
  },
  {
    title: "",
    description: "",
    rating: 0,
    cast: [""],
    url: "",
    duration: "",
    realisator: "",
  },*/
];

movies.forEach(async (movie) => {
  const sql = await client.query({
    text:
      "INSERT INTO movies (title, description, rating, url, hours, minutes, realisator, casting, video) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
    values: [
      movie.title,
      movie.description,
      movie.rating,
      movie.url,
      movie.hours,
      movie.minutes,
      movie.realisator,
      movie.casting,
      movie.video,
    ],
  });
  console.log(sql);
});
