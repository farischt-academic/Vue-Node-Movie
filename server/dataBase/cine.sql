--
-- PostgreSQL database dump
--

-- Dumped from database version 10.14
-- Dumped by pg_dump version 10.14

-- Started on 2020-11-22 22:28:36

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12924)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2817 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 199 (class 1259 OID 16469)
-- Name: movies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movies (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    rating integer NOT NULL,
    url text NOT NULL,
    hours integer,
    minutes integer,
    realisator text NOT NULL,
    casting text[],
    video text
);


ALTER TABLE public.movies OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 16467)
-- Name: movies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.movies_id_seq OWNER TO postgres;

--
-- TOC entry 2818 (class 0 OID 0)
-- Dependencies: 198
-- Name: movies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movies_id_seq OWNED BY public.movies.id;


--
-- TOC entry 197 (class 1259 OID 16425)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text,
    email text,
    password text,
    liked integer[] DEFAULT ARRAY[]::integer[]
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 16423)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 2819 (class 0 OID 0)
-- Dependencies: 196
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2680 (class 2604 OID 16472)
-- Name: movies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies ALTER COLUMN id SET DEFAULT nextval('public.movies_id_seq'::regclass);


--
-- TOC entry 2678 (class 2604 OID 16428)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2809 (class 0 OID 16469)
-- Dependencies: 199
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movies (id, title, description, rating, url, hours, minutes, realisator, casting, video) FROM stdin;
84	Inception	Dom Cobb est un voleur expérimenté – le meilleur qui soit dans l’art périlleux de l’extraction : sa spécialité consiste à s’approprier les secrets les plus précieux d’un individu, enfouis au plus profond de son subconscient, pendant qu’il rêve et que son esprit est particulièrement vulnérable. Très recherché pour ses talents dans l’univers trouble de l’espionnage industriel, Cobb est aussi devenu un fugitif traqué dans le monde entier qui a perdu tout ce qui lui est cher.	109	https://images-na.ssl-images-amazon.com/images/I/81CgNB2mglL._SL1425_.jpg	3	1	Christopher Nolan	{"Leonardo Dicaprio","Marion Cotillard","Ellen Page"}	https://www.youtube.com/embed/CPTIgILtna8
85	Interstellar	Le film raconte les aventures d’un groupe d’explorateurs qui utilisent une faille récemment découverte dans l’espace-temps afin de repousser les limites humaines et partir à la conquête des distances astronomiques dans un voyage interstellaire. 	209	https://cinemadauphine.fr/wp-content/uploads/2014/11/matthew-mcconaughey-in-interstellar-wide.jpg	2	10	Christopher Nolan	{"Matthew McConaughey","Anne Hathaway","Michael Caine","Michael Caine"}	https://www.youtube.com/embed/VaOijhK3CRU
86	Star Wars IX	Environ un an après la mort de Luke Skywalker2, la Résistance tente de survivre face au Premier Ordre, désormais mené par un nouveau Suprême Leader, Kylo Ren. Une rumeur agite cependant toute la galaxie : l'Empereur Palpatine serait de retour. Tandis que Rey s'entraîne sous la houlette de la Générale Leia Organa, Kylo Ren cherche à défier Palpatine, qu'il considère comme une menace à son pouvoir.	356	https://lumiere-a.akamaihd.net/v1/images/riseofskywalker-moviepage-emeagrid-m_a2600ffe.jpeg?region=0,0,800,600	2	22	J.J Abrams	{"Daisy Ridley","Adam Driver","Oscar Isaac"}	https://www.youtube.com/embed/pHgwf2eMFnA
87	Connectés	Un samedi soir pendant le confinement, un groupe de très bons amis se connecte en ligne pour partager un apéritif virtuel. Soudain, l’un d’entre eux est agressé et séquestré en direct par un inconnu sous les yeux de ses amis qui assistent à la scène, impuissants derrière leurs écrans. Ils ne vont pas tarder à découvrir que ce mystérieux inconnu connaît parfaitement tous leurs pires secrets, qu’il compte faire éclater au grand jour les uns après les autres.	95	https://fr.web.img3.acsta.net/pictures/20/10/15/14/41/1405738.jpg	1	25	Romuald Boulanger	{"Nadia Farès","François-Xavier Demaison","Stéphane De Groodt"}	https://www.youtube.com/embed/xeV2hMqzlmc
88	The Room	Kate et Matt quittent la ville pour s'installer à la campagne dans une grande maison isolée et délabrée. Peu après leur déménagement, ils découvrent une chambre qui a le pouvoir d'exaucer tous leurs désirs... 	109	https://fr.web.img6.acsta.net/pictures/20/04/29/09/48/4213998.jpg	1	40	Christian Volckman	{"Olga Kurylenko","Kevin Janssens","Joshua Wilson"}	https://www.youtube.com/embed/Q2LMw-YvynE
89	Shutter Island	En 1954, le marshal Teddy Daniels et son coéquipier Chuck Aule sont envoyés enquêter sur l'île de Shutter Island, dans un hôpital psychiatrique où sont internés de dangereux criminels. L'une des patientes, Rachel Solando, a inexplicablement disparu. Comment la meurtrière a-t-elle pu sortir d'une cellule fermée de l'extérieur ? Le seul indice retrouvé dans la pièce est une feuille de papier sur laquelle on peut lire une suite de chiffres et de lettres sans signification apparente. Oeuvre cohérente d'une malade, ou cryptogramme ?	76	https://fr.web.img2.acsta.net/c_310_420/medias/nmedia/18/69/96/84/19151192.jpg	2	17	Martin Scorsese	{"Leonardo DiCaprio","Mark Ruffalo","Ben Kingsley"}	https://www.youtube.com/embed/vIBNLBX9S_0
90	Le Parrain	En 1945, à New York, les Corleone sont une des cinq familles de la mafia. Don Vito Corleone, parrain de cette famille, marie sa fille à un bookmaker. Sollozzo,  parrain  de la famille Tattaglia, propose à Don Vito une association dans le trafic de drogue, mais celui-ci refuse. Sonny, un de ses fils, y est quant à lui favorable. Afin de traiter avec Sonny, Sollozzo tente de faire tuer Don Vito, mais celui-ci en réchappe. Michael, le frère cadet de Sonny, recherche alors les commanditaires de l attentat et tue Sollozzo et le chef de la police, en représailles. Michael part alors en Sicile, où il épouse Apollonia, mais celle-ci est assassinée à sa place. De retour à New York, Michael épouse Kay Adams et se prépare à devenir le successeur de son père...	56	https://fr.web.img2.acsta.net/c_310_420/medias/nmedia/18/35/57/73/18660716.jpg	2	55	Francis Ford Coppola	{"Marlon Brando","Al Pacino","James Caan"}	https://www.youtube.com/embed/fF6Bc75HVBI
91	La liste de Schindler	Evocation des années de guerre d'Oskar Schindler, fils d'industriel d'origine autrichienne rentré à Cracovie en 1939 avec les troupes allemandes. Il va, tout au long de la guerre, protéger des juifs en les faisant travailler dans sa fabrique et en 1944 sauver huit cents hommes et trois cents femmes du camp d'extermination de Auschwitz-Birkenau.	103	https://fr.web.img4.acsta.net/c_310_420/pictures/19/03/14/10/37/5927961.jpg	3	15	Steven Spielberg	{"Liam Neeson","Ben Kingsley","Ralph Fiennes"}	https://www.youtube.com/embed/ONWtyxzl-GE
92	Renaissances	Que feriez-vous si on vous proposait de vivre éternellement ? Damian Hale, un richissime homme d’affaire new yorkais atteint d’une maladie incurable, se voit proposer une opération révolutionnaire par le mystérieux groupe Phénix : transférer son esprit dans un corps de substitution, « une enveloppe vide », un nouveau corps jeune et athlétique pour prolonger sa vie. Comment résister à une telle proposition ? Damian Hale procède au transfert et redécouvre les joies de la jeunesse, du luxe et des femmes dans son nouveau corps. Jusqu’au jour où Damian découvre un terrible secret sur l’opération. Un secret pour lequel Phénix est prêt à tuer.	112	https://fr.web.img5.acsta.net/c_310_420/pictures/15/06/08/12/13/510747.jpg	1	58	Tarsem Singh	{"Ryan Reynolds","Ben Kingsley","Natalie Martinez"}	https://www.youtube.com/embed/ybEIT9hHTBs
\.


--
-- TOC entry 2807 (class 0 OID 16425)
-- Dependencies: 197
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, liked) FROM stdin;
23	User	user@user.fr	$2b$10$zWbalFyguFeoAkaDV3YX/OzYzIn4SmmCeK4k2zf.fy7rXFqzvliQO	{}
\.


--
-- TOC entry 2820 (class 0 OID 0)
-- Dependencies: 198
-- Name: movies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movies_id_seq', 92, true);


--
-- TOC entry 2821 (class 0 OID 0)
-- Dependencies: 196
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 23, true);


--
-- TOC entry 2684 (class 2606 OID 16477)
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (id);


--
-- TOC entry 2682 (class 2606 OID 16433)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


-- Completed on 2020-11-22 22:28:36

--
-- PostgreSQL database dump complete
--

