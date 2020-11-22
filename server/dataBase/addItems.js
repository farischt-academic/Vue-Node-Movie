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
    rating: 109,
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
    rating: 209,
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
    rating: 356,
    casting: ["Daisy Ridley", "Adam Driver", "Oscar Isaac"],
    url:
      "https://lumiere-a.akamaihd.net/v1/images/riseofskywalker-moviepage-emeagrid-m_a2600ffe.jpeg?region=0,0,800,600",
    hours: 2,
    minutes: 22,
    realisator: "J.J Abrams",
    video: "https://www.youtube.com/embed/pHgwf2eMFnA",
  },
  {
    title: "Connectés",
    description:
      "Un samedi soir pendant le confinement, un groupe de très bons amis se connecte en ligne pour partager un apéritif virtuel. Soudain, l’un d’entre eux est agressé et séquestré en direct par un inconnu sous les yeux de ses amis qui assistent à la scène, impuissants derrière leurs écrans. Ils ne vont pas tarder à découvrir que ce mystérieux inconnu connaît parfaitement tous leurs pires secrets, qu’il compte faire éclater au grand jour les uns après les autres.",
    rating: 95,
    casting: ["Nadia Farès", "François-Xavier Demaison", "Stéphane De Groodt"],
    url: "https://fr.web.img3.acsta.net/pictures/20/10/15/14/41/1405738.jpg",
    hours: 1,
    minutes: 25,
    realisator: "Romuald Boulanger",
    video: "https://www.youtube.com/embed/xeV2hMqzlmc",
  },
  {
    title: "The Room",
    description:
      "Kate et Matt quittent la ville pour s'installer à la campagne dans une grande maison isolée et délabrée. Peu après leur déménagement, ils découvrent une chambre qui a le pouvoir d'exaucer tous leurs désirs... ",
    rating: 109,
    casting: ["Olga Kurylenko", "Kevin Janssens", "Joshua Wilson"],
    url: "https://fr.web.img6.acsta.net/pictures/20/04/29/09/48/4213998.jpg",
    hours: 1,
    minutes: 40,
    realisator: "Christian Volckman",
    video: "https://www.youtube.com/embed/Q2LMw-YvynE",
  },
  {
    title: "Shutter Island",
    description:
      "En 1954, le marshal Teddy Daniels et son coéquipier Chuck Aule sont envoyés enquêter sur l'île de Shutter Island, dans un hôpital psychiatrique où sont internés de dangereux criminels. L'une des patientes, Rachel Solando, a inexplicablement disparu. Comment la meurtrière a-t-elle pu sortir d'une cellule fermée de l'extérieur ? Le seul indice retrouvé dans la pièce est une feuille de papier sur laquelle on peut lire une suite de chiffres et de lettres sans signification apparente. Oeuvre cohérente d'une malade, ou cryptogramme ?",
    rating: 76,
    casting: ["Leonardo DiCaprio", "Mark Ruffalo", "Ben Kingsley"],
    url:
      "https://fr.web.img2.acsta.net/c_310_420/medias/nmedia/18/69/96/84/19151192.jpg",
    hours: 2,
    minutes: 17,
    realisator: "Martin Scorsese",
    video: "https://www.youtube.com/embed/vIBNLBX9S_0",
  },
  {
    title: "Le Parrain",
    description:
      "En 1945, à New York, les Corleone sont une des cinq familles de la mafia. Don Vito Corleone, parrain de cette famille, marie sa fille à un bookmaker. Sollozzo,  parrain  de la famille Tattaglia, propose à Don Vito une association dans le trafic de drogue, mais celui-ci refuse. Sonny, un de ses fils, y est quant à lui favorable. Afin de traiter avec Sonny, Sollozzo tente de faire tuer Don Vito, mais celui-ci en réchappe. Michael, le frère cadet de Sonny, recherche alors les commanditaires de l attentat et tue Sollozzo et le chef de la police, en représailles. Michael part alors en Sicile, où il épouse Apollonia, mais celle-ci est assassinée à sa place. De retour à New York, Michael épouse Kay Adams et se prépare à devenir le successeur de son père...",
    rating: 56,
    casting: ["Marlon Brando", "Al Pacino", "James Caan"],
    url:
      "https://fr.web.img2.acsta.net/c_310_420/medias/nmedia/18/35/57/73/18660716.jpg",
    hours: 2,
    minutes: 55,
    realisator: "Francis Ford Coppola",
    video: "https://www.youtube.com/embed/fF6Bc75HVBI",
  },
  {
    title: "La liste de Schindler",
    description:
      "Evocation des années de guerre d'Oskar Schindler, fils d'industriel d'origine autrichienne rentré à Cracovie en 1939 avec les troupes allemandes. Il va, tout au long de la guerre, protéger des juifs en les faisant travailler dans sa fabrique et en 1944 sauver huit cents hommes et trois cents femmes du camp d'extermination de Auschwitz-Birkenau.",
    rating: 103,
    casting: ["Liam Neeson", "Ben Kingsley", "Ralph Fiennes"],
    url:
      "https://fr.web.img4.acsta.net/c_310_420/pictures/19/03/14/10/37/5927961.jpg",
    hours: 3,
    minutes: 15,
    realisator: "Steven Spielberg",
    video: "https://www.youtube.com/embed/ONWtyxzl-GE",
  },
  {
    title: "Renaissances",
    description:
      "Que feriez-vous si on vous proposait de vivre éternellement ? Damian Hale, un richissime homme d’affaire new yorkais atteint d’une maladie incurable, se voit proposer une opération révolutionnaire par le mystérieux groupe Phénix : transférer son esprit dans un corps de substitution, « une enveloppe vide », un nouveau corps jeune et athlétique pour prolonger sa vie. Comment résister à une telle proposition ? Damian Hale procède au transfert et redécouvre les joies de la jeunesse, du luxe et des femmes dans son nouveau corps. Jusqu’au jour où Damian découvre un terrible secret sur l’opération. Un secret pour lequel Phénix est prêt à tuer.",
    rating: 112,
    casting: ["Ryan Reynolds", "Ben Kingsley", "Natalie Martinez"],
    url:
      "https://fr.web.img5.acsta.net/c_310_420/pictures/15/06/08/12/13/510747.jpg",
    hours: 1,
    minutes: 58,
    realisator: "Tarsem Singh",
    video: "https://www.youtube.com/embed/ybEIT9hHTBs",
  },
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
