--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.2
-- Dumped by pg_dump version 9.6.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Likes; Type: TABLE; Schema: public; Owner: applaudo
--

CREATE TABLE "Likes" (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserId" integer NOT NULL,
    "ProductId" integer NOT NULL
);


ALTER TABLE "Likes" OWNER TO applaudo;

--
-- Name: PriceLogs; Type: TABLE; Schema: public; Owner: applaudo
--

CREATE TABLE "PriceLogs" (
    id integer NOT NULL,
    "oldPrice" double precision NOT NULL,
    "newPrice" double precision NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "ProductId" integer NOT NULL
);


ALTER TABLE "PriceLogs" OWNER TO applaudo;

--
-- Name: PriceLogs_id_seq; Type: SEQUENCE; Schema: public; Owner: applaudo
--

CREATE SEQUENCE "PriceLogs_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "PriceLogs_id_seq" OWNER TO applaudo;

--
-- Name: PriceLogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: applaudo
--

ALTER SEQUENCE "PriceLogs_id_seq" OWNED BY "PriceLogs".id;


--
-- Name: Products; Type: TABLE; Schema: public; Owner: applaudo
--

CREATE TABLE "Products" (
    id integer NOT NULL,
    name character varying(255),
    description character varying(1234),
    stock integer DEFAULT 0 NOT NULL,
    price double precision DEFAULT 0 NOT NULL,
    likes integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "Products" OWNER TO applaudo;

--
-- Name: Products_id_seq; Type: SEQUENCE; Schema: public; Owner: applaudo
--

CREATE SEQUENCE "Products_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Products_id_seq" OWNER TO applaudo;

--
-- Name: Products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: applaudo
--

ALTER SEQUENCE "Products_id_seq" OWNED BY "Products".id;


--
-- Name: Purchases; Type: TABLE; Schema: public; Owner: applaudo
--

CREATE TABLE "Purchases" (
    id integer NOT NULL,
    quantity integer,
    "currentPrice" double precision,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "ProductId" integer,
    "UserId" integer
);


ALTER TABLE "Purchases" OWNER TO applaudo;

--
-- Name: Purchases_id_seq; Type: SEQUENCE; Schema: public; Owner: applaudo
--

CREATE SEQUENCE "Purchases_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Purchases_id_seq" OWNER TO applaudo;

--
-- Name: Purchases_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: applaudo
--

ALTER SEQUENCE "Purchases_id_seq" OWNED BY "Purchases".id;


--
-- Name: Roles; Type: TABLE; Schema: public; Owner: applaudo
--

CREATE TABLE "Roles" (
    id integer NOT NULL,
    role character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "Roles" OWNER TO applaudo;

--
-- Name: Roles_id_seq; Type: SEQUENCE; Schema: public; Owner: applaudo
--

CREATE SEQUENCE "Roles_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Roles_id_seq" OWNER TO applaudo;

--
-- Name: Roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: applaudo
--

ALTER SEQUENCE "Roles_id_seq" OWNED BY "Roles".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: applaudo
--

CREATE TABLE "Users" (
    id integer NOT NULL,
    firstname character varying(255) NOT NULL,
    lastname character varying(255) NOT NULL,
    email character varying(255),
    username character varying(255),
    password character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "RoleId" integer
);


ALTER TABLE "Users" OWNER TO applaudo;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: applaudo
--

CREATE SEQUENCE "Users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "Users_id_seq" OWNER TO applaudo;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: applaudo
--

ALTER SEQUENCE "Users_id_seq" OWNED BY "Users".id;


--
-- Name: PriceLogs id; Type: DEFAULT; Schema: public; Owner: applaudo
--

ALTER TABLE ONLY "PriceLogs" ALTER COLUMN id SET DEFAULT nextval('"PriceLogs_id_seq"'::regclass);


--
-- Name: Products id; Type: DEFAULT; Schema: public; Owner: applaudo
--

ALTER TABLE ONLY "Products" ALTER COLUMN id SET DEFAULT nextval('"Products_id_seq"'::regclass);


--
-- Name: Purchases id; Type: DEFAULT; Schema: public; Owner: applaudo
--

ALTER TABLE ONLY "Purchases" ALTER COLUMN id SET DEFAULT nextval('"Purchases_id_seq"'::regclass);


--
-- Name: Roles id; Type: DEFAULT; Schema: public; Owner: applaudo
--

ALTER TABLE ONLY "Roles" ALTER COLUMN id SET DEFAULT nextval('"Roles_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: applaudo
--

ALTER TABLE ONLY "Users" ALTER COLUMN id SET DEFAULT nextval('"Users_id_seq"'::regclass);


--
-- Data for Name: Likes; Type: TABLE DATA; Schema: public; Owner: applaudo
--

COPY "Likes" ("createdAt", "updatedAt", "UserId", "ProductId") FROM stdin;
\.


--
-- Data for Name: PriceLogs; Type: TABLE DATA; Schema: public; Owner: applaudo
--

COPY "PriceLogs" (id, "oldPrice", "newPrice", "createdAt", "updatedAt", "ProductId") FROM stdin;
\.


--
-- Name: PriceLogs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: applaudo
--

SELECT pg_catalog.setval('"PriceLogs_id_seq"', 1, false);


--
-- Data for Name: Products; Type: TABLE DATA; Schema: public; Owner: applaudo
--

COPY "Products" (id, name, description, stock, price, likes, "createdAt", "updatedAt") FROM stdin;
1	Licensed Steel Shirt	Asperiores eum delectus. Aperiam aliquam magnam eos quibusdam quia aut eos. Quaerat quisquam tempore ut quibusdam eius quia earum.	33	4	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
2	Sleek Wooden Gloves	Possimus voluptatum quod quo qui optio nulla iusto inventore animi. Voluptatem suscipit et fugit sequi veniam.	41	0	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
3	Handmade Rubber Cheese	Esse ut expedita id reprehenderit molestias quia sit rerum. Et eaque occaecati distinctio odit omnis est repellendus explicabo eos. Esse debitis enim minima minima.	25	2	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
4	Practical Granite Gloves	Consequatur non libero quas minima. Omnis quasi aut dolore incidunt quibusdam ducimus quos eum assumenda. Quo asperiores unde quaerat nemo. Molestias enim occaecati et.	87	4	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
5	Fantastic Soft Table	Dolor voluptatem voluptate ea sed qui tempora rerum non cum. Dolorem reprehenderit quisquam atque officiis incidunt quidem cumque sit sed.	28	2	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
6	Tasty Frozen Mouse	Consectetur et voluptas qui. Magni quis earum culpa ipsam consequatur. Alias veniam adipisci vel. Quo dicta sed voluptatem ipsa omnis commodi qui quod voluptatem. Ducimus qui voluptate est molestiae repudiandae.	25	5	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
7	Generic Concrete Shirt	Dignissimos veniam et enim possimus. Aliquam distinctio eum quia corporis nisi quaerat.	87	2	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
8	Tasty Concrete Chair	Sapiente atque ut repellendus et. Ad veniam adipisci occaecati minus harum minus commodi voluptatem. Et eius quia ad.	35	7	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
9	Fantastic Metal Shirt	Molestias tempore deserunt quia fuga sit. Occaecati cupiditate dolorum iste cupiditate quidem quos nisi est. Hic asperiores qui sed omnis omnis. Voluptatum et voluptatum nam error dolor. Harum enim voluptatem est sunt voluptatum ipsum.	17	2	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
10	Incredible Granite Car	Rerum totam aliquam. Quasi recusandae sequi accusantium itaque maxime. Cumque qui eos sunt molestiae vero qui.	27	6	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
11	Practical Granite Cheese	Doloremque et non quo quae dolorem. Corporis enim facilis qui nemo. Facilis dolores repudiandae ex omnis et enim et laboriosam.	43	9	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
12	Unbranded Plastic Chicken	Ut tenetur in voluptatibus sed. Voluptas vitae cum assumenda omnis officiis provident voluptate facilis.	38	5	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
13	Refined Plastic Keyboard	Id sed et. Aut id qui id aut iure est aut dolorem. Consectetur possimus aperiam possimus minus saepe enim eos. Nulla quod id iure dolorem voluptatem. Rerum optio et repellat ipsum unde aut consectetur. Est deleniti est voluptatem animi ea incidunt qui ad.	98	3	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
14	Handmade Cotton Sausages	Minima illo mollitia veniam modi pariatur natus hic nihil. Dolorem officia vel quos quia qui. Voluptas debitis incidunt quod nihil minima adipisci nam.	3	8	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
15	Licensed Granite Keyboard	Sit quia temporibus eius quidem quasi et repellendus omnis. Animi maiores mollitia exercitationem quidem tempora et deserunt.	72	9	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
16	Practical Wooden Bike	Molestiae consequatur possimus. Accusantium quia deleniti pariatur. Dolores iure et nisi. Voluptas excepturi accusamus commodi est magnam. Et recusandae minima recusandae. Cum cumque magni numquam similique atque.	6	3	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
17	Generic Concrete Chicken	Quibusdam quo vel non odio. Rem consectetur praesentium et fugiat officia ducimus sunt nobis.	60	6	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
18	Gorgeous Granite Chicken	Qui eveniet numquam explicabo quae provident deleniti. Dolorem et vel qui sed quae omnis et iure.	18	3	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
20	Practical Granite Pants	Ut et repellat. Delectus aut autem ut quidem deserunt aut enim non.	49	10	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
21	Intelligent Plastic Pizza	Quisquam aut qui rerum aliquam omnis id eligendi. Ullam quo dolores autem. Voluptatem soluta perferendis iste non reprehenderit fugiat. Pariatur aut cumque saepe quae et. Animi nostrum est nesciunt.	63	2	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
22	Intelligent Rubber Tuna	Deleniti at omnis laborum quas delectus aut dolorem sunt et. Iusto soluta sunt ex expedita provident dignissimos vel sunt praesentium. Molestias molestiae voluptatem quibusdam cumque.	82	7	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
23	Gorgeous Steel Shirt	Illum suscipit doloremque suscipit harum. Quam et consequatur. Et id est soluta nihil consectetur. Maiores quibusdam repudiandae ea quo veniam a.	34	1	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
24	Generic Steel Shirt	Aperiam rem maxime. Aut voluptatem sit distinctio dicta eveniet eaque ea fugiat accusantium. Quos laboriosam architecto totam et vero dolor. Quo optio explicabo aspernatur eos eum est modi. Sapiente molestiae labore dolores eligendi.	35	4	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
25	Sleek Steel Bacon	Voluptas vitae consequuntur quaerat. Natus quia officia iste sint. Ea dolorem omnis atque voluptas animi. Repudiandae quo vitae alias. Qui voluptates modi debitis. Beatae corporis debitis odio tempora animi ut in beatae quibusdam.	12	3	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
26	Awesome Steel Pizza	Aperiam occaecati amet. Debitis dicta corporis quas.	86	6	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
27	Practical Frozen Bacon	Nihil omnis ut doloribus molestias non enim et non atque. Officiis blanditiis id ab et eligendi recusandae in voluptas. Dignissimos iure dolore delectus laborum laboriosam expedita praesentium non amet.	95	8	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
28	Practical Plastic Chair	Provident dignissimos et fuga aut blanditiis qui eveniet voluptatem. Voluptates eligendi eos quae harum veritatis pariatur aliquam non aut. Pariatur deleniti velit animi molestiae sunt et aliquid. Voluptatem corrupti debitis aliquam quam quis.	34	6	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
29	Gorgeous Steel Salad	Occaecati ea ea non accusantium. Voluptatem ducimus in nihil ipsa id non voluptatem aut. Ipsam porro cumque vel.	16	4	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
30	Handmade Wooden Bike	Qui et incidunt. Amet beatae nulla rerum ducimus aperiam dicta ipsa. Quos reprehenderit minima.	14	1	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
31	Handcrafted Rubber Cheese	Facilis ea non ut consequuntur quo voluptatem quos ab labore. Aperiam optio vel adipisci. Id iusto sunt. Facilis est qui amet sequi. Aut provident eum voluptatibus voluptatibus. Pariatur nesciunt minima enim quia totam.	39	3	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
32	Fantastic Rubber Pants	Hic maxime sapiente sit suscipit ut. Dolor doloribus consequatur quos eligendi et. Hic reprehenderit cupiditate veritatis. Perferendis expedita id deleniti aut officia dignissimos est ut voluptatem.	81	9	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
33	Incredible Frozen Mouse	Aut aut odit quas esse vitae iste. Necessitatibus quam neque dolores ad modi aut vel dicta.	93	10	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
34	Handmade Fresh Ball	Libero nemo quasi ipsam alias minima quo tenetur blanditiis. Et nobis aut odit commodi et.	81	9	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
35	Refined Steel Gloves	Eius porro odit dicta occaecati aut totam. Aut voluptatum dolore. Et ut dicta facilis distinctio. Dolorem quis ut labore.	5	8	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
36	Fantastic Rubber Shirt	Quisquam maxime error a nulla suscipit magnam dolore. Sed quia dolorum aliquam non est et officia. Ut est ea. Minima quia laudantium facilis est alias mollitia dolores.	41	10	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
37	Handmade Rubber Cheese 2	Voluptatem quia non ea. Error nesciunt esse error consequatur ut dolor neque. Maiores adipisci officia iusto. Eos rerum in alias. Tenetur exercitationem ducimus voluptatem velit excepturi qui.	60	5	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
38	Small Rubber Mouse	Dolor qui quod. Vel ut aperiam quaerat ipsum quasi.	97	10	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
39	Rustic Steel Shoes	Corporis deserunt velit magni sit et. Error vitae enim et. Velit in quaerat quia minima odio consequatur cumque. Illum magnam nihil. Qui id deleniti.	79	1	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
40	Intelligent Metal Tuna	Quis adipisci sunt aut sit et non dicta. Delectus alias beatae impedit dolor quidem et optio sed qui. Possimus corporis sed a. Dolor rerum fugit non culpa molestiae sed rem quibusdam consectetur. Quis optio dolorem voluptas exercitationem officiis nemo iusto. Quo tempore et earum.	9	0	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
42	Generic Concrete Gloves	Enim possimus nesciunt dolorem ut. Velit eaque dicta quo.	64	6	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
43	Generic Cotton Salad	Sunt recusandae ipsam placeat aut aut ipsum non qui aut. A alias voluptatum rerum. Sint nobis ut minima explicabo dignissimos quae.	51	5	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
44	Intelligent Frozen Ball	Adipisci rerum accusamus qui tempora sit corporis consequuntur accusantium qui. Sequi eius cumque quos illo et illo.	43	7	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
45	Sleek Plastic Towels	Amet consequatur corrupti enim et assumenda aliquam error veniam fugiat. Doloremque soluta suscipit eius.	60	6	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
46	Handmade Plastic Chips	At in vel sunt voluptatem repudiandae facilis. Qui harum ab quisquam ut.	83	6	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
47	Gorgeous Rubber Gloves	Incidunt vitae quia harum quo aut dolore voluptatem veritatis. Nam nihil inventore deleniti nulla. Sint qui maxime. Omnis quidem qui. Accusantium iste porro consectetur qui in. Dolor esse id aut ea suscipit dolor repudiandae et corrupti.	86	1	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
48	Sleek Granite Computer	Voluptatibus et voluptatem cupiditate mollitia quos. Hic voluptatem voluptatum et explicabo sint possimus debitis ut.	6	7	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
49	Handcrafted Steel Shirt	Blanditiis omnis odio voluptatum atque. Eos consequatur non dolor sequi ad eos ipsam. Ex ea consequuntur aut ex placeat molestias distinctio non. Exercitationem qui molestiae qui fuga.	16	3	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
50	Licensed Wooden Sausages	Dolore sit quis in nobis sed. Voluptatem minus doloremque ipsam aspernatur corrupti quia modi. Nam ea quia dolorum modi non nemo. Cumque voluptatem qui distinctio ab laudantium pariatur enim fuga iusto. Assumenda incidunt unde dolorem odit excepturi exercitationem ullam et. Vel commodi dolores qui quo quia itaque.	58	3	0	2017-11-14 19:53:45.639+00	2017-11-14 19:53:45.639+00
19	Unbranded Metal Gloves	Sunt nemo voluptatibus in reprehenderit repellendus voluptate optio. Doloremque dolorum quae placeat vel.	19	10	0	2017-11-14 19:53:45.639+00	2017-11-14 19:54:15.597+00
41	Gorgeous Concrete Computer	Reprehenderit ea recusandae sit aut enim qui. Aut qui modi. Non minus quibusdam repellendus. Velit aut debitis atque pariatur temporibus fugit. Voluptate dolore corrupti corporis hic aut.	11	6	0	2017-11-14 19:53:45.639+00	2017-11-14 19:58:07.984+00
\.


--
-- Name: Products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: applaudo
--

SELECT pg_catalog.setval('"Products_id_seq"', 50, true);


--
-- Data for Name: Purchases; Type: TABLE DATA; Schema: public; Owner: applaudo
--

COPY "Purchases" (id, quantity, "currentPrice", "createdAt", "updatedAt", "ProductId", "UserId") FROM stdin;
1	4	10	2017-11-14 19:54:14.857+00	2017-11-14 19:54:14.857+00	19	2
2	4	6	2017-11-14 19:57:33.596+00	2017-11-14 19:57:33.596+00	41	2
3	10	6	2017-11-14 19:58:06.529+00	2017-11-14 19:58:06.529+00	41	2
\.


--
-- Name: Purchases_id_seq; Type: SEQUENCE SET; Schema: public; Owner: applaudo
--

SELECT pg_catalog.setval('"Purchases_id_seq"', 3, true);


--
-- Data for Name: Roles; Type: TABLE DATA; Schema: public; Owner: applaudo
--

COPY "Roles" (id, role, "createdAt", "updatedAt") FROM stdin;
1	Administrator	2017-11-14 19:53:41.596+00	2017-11-14 19:53:41.596+00
2	User	2017-11-14 19:53:41.599+00	2017-11-14 19:53:41.599+00
\.


--
-- Name: Roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: applaudo
--

SELECT pg_catalog.setval('"Roles_id_seq"', 2, true);


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: applaudo
--

COPY "Users" (id, firstname, lastname, email, username, password, "createdAt", "updatedAt", "RoleId") FROM stdin;
1	Alberto	Reichel	Brycen.Ziemann@hotmail.com	mario	$2a$10$WjRQy9Nz7pEnw7vmDSrD7eLcgMjQg/FP.29sdcRHPFqIosDaDzGem	2017-11-14 19:53:43.967+00	2017-11-14 19:53:43.967+00	1
2	Jeromy	Satterfield	Rosalia74@gmail.com	luigi	$2a$10$CKHs1QoxhuJAio/Si0vV4OOvjT9pE.flYqWpgn3J12gYiL9yBk5O2	2017-11-14 19:53:44.245+00	2017-11-14 19:53:44.245+00	2
3	Ernestina	Koss	Caterina57@yahoo.com	peach	$2a$10$n4rKH4Q/RYNhzLZeunIBa.E.S2u89TxRIQHh//Wh/MWhecXzn9kEa	2017-11-14 19:53:44.245+00	2017-11-14 19:53:44.245+00	2
4	Ransom	Wolf	Edgardo_Hansen81@gmail.com	browser	$2a$10$EOGG5BuD97EhRAslISeQM.c8Ny9Z/2BoxLeJdv2V4SV9hRs8sDWZm	2017-11-14 19:53:44.246+00	2017-11-14 19:53:44.246+00	2
\.


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: applaudo
--

SELECT pg_catalog.setval('"Users_id_seq"', 4, true);


--
-- Name: Likes Likes_pkey; Type: CONSTRAINT; Schema: public; Owner: applaudo
--

ALTER TABLE ONLY "Likes"
    ADD CONSTRAINT "Likes_pkey" PRIMARY KEY ("UserId", "ProductId");


--
-- Name: PriceLogs PriceLogs_pkey; Type: CONSTRAINT; Schema: public; Owner: applaudo
--

ALTER TABLE ONLY "PriceLogs"
    ADD CONSTRAINT "PriceLogs_pkey" PRIMARY KEY (id);


--
-- Name: Products Products_name_key; Type: CONSTRAINT; Schema: public; Owner: applaudo
--

ALTER TABLE ONLY "Products"
    ADD CONSTRAINT "Products_name_key" UNIQUE (name);


--
-- Name: Products Products_pkey; Type: CONSTRAINT; Schema: public; Owner: applaudo
--

ALTER TABLE ONLY "Products"
    ADD CONSTRAINT "Products_pkey" PRIMARY KEY (id);


--
-- Name: Purchases Purchases_pkey; Type: CONSTRAINT; Schema: public; Owner: applaudo
--

ALTER TABLE ONLY "Purchases"
    ADD CONSTRAINT "Purchases_pkey" PRIMARY KEY (id);


--
-- Name: Roles Roles_pkey; Type: CONSTRAINT; Schema: public; Owner: applaudo
--

ALTER TABLE ONLY "Roles"
    ADD CONSTRAINT "Roles_pkey" PRIMARY KEY (id);


--
-- Name: Roles Roles_role_key; Type: CONSTRAINT; Schema: public; Owner: applaudo
--

ALTER TABLE ONLY "Roles"
    ADD CONSTRAINT "Roles_role_key" UNIQUE (role);


--
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: applaudo
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: applaudo
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_username_key; Type: CONSTRAINT; Schema: public; Owner: applaudo
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_username_key" UNIQUE (username);


--
-- Name: Likes Likes_ProductId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: applaudo
--

ALTER TABLE ONLY "Likes"
    ADD CONSTRAINT "Likes_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "Products"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Likes Likes_UserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: applaudo
--

ALTER TABLE ONLY "Likes"
    ADD CONSTRAINT "Likes_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PriceLogs PriceLogs_ProductId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: applaudo
--

ALTER TABLE ONLY "PriceLogs"
    ADD CONSTRAINT "PriceLogs_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "Products"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Purchases Purchases_ProductId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: applaudo
--

ALTER TABLE ONLY "Purchases"
    ADD CONSTRAINT "Purchases_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "Products"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Purchases Purchases_UserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: applaudo
--

ALTER TABLE ONLY "Purchases"
    ADD CONSTRAINT "Purchases_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Users Users_RoleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: applaudo
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_RoleId_fkey" FOREIGN KEY ("RoleId") REFERENCES "Roles"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

