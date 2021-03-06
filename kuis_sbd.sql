--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: music; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.music (
    id integer NOT NULL,
    title character varying(100),
    genre character varying(10),
    singer character varying(50),
    time_length character varying(10)
);


ALTER TABLE public.music OWNER TO postgres;

--
-- Name: music_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.music_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.music_id_seq OWNER TO postgres;

--
-- Name: music_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.music_id_seq OWNED BY public.music.id;


--
-- Name: music id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.music ALTER COLUMN id SET DEFAULT nextval('public.music_id_seq'::regclass);


--
-- Data for Name: music; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.music (id, title, genre, singer, time_length) FROM stdin;
3	Hot Sauce	pop	NCT Dream	00:03:15
6	Alcohol-Free	pop	Twice	00:03:31
7	Closure	pop	Hayd	00:03:16
8	Talk	pop	Khalid	00:03:18
9	Fake	pop	Lauv	00:02:26
10	Cheating On You	pop	Charlie Puth	00:03:18
5	Good 4 U	pop	Olivia Rodrigo	00:02:26
11	After School	pop	Weeekly	00:03:25
12	365	pop	LOONA	00:03:41
\.


--
-- Name: music_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.music_id_seq', 12, true);


--
-- PostgreSQL database dump complete
--

