CREATE TABLE "transactions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "transactions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(30) NOT NULL,
	"date" date NOT NULL,
	"category" varchar(255) NOT NULL,
	"amount" integer NOT NULL,
	"recurring" boolean NOT NULL
);
