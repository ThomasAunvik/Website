CREATE SCHEMA "thaun-website";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "thaun-website"."UserCredential" (
	"credentialId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" text NOT NULL,
	"userId" uuid NOT NULL,
	"createdDate" timestamp DEFAULT now(),
	"userLabel" text DEFAULT '' NOT NULL,
	"secretData" json NOT NULL,
	"credentialsData" json NOT NULL,
	"priority" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "thaun-website"."PostRevision" (
	"revisionId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"postId" uuid NOT NULL,
	"field" text NOT NULL,
	"value" text NOT NULL,
	"description" text,
	"createdAt" timestamp DEFAULT now(),
	"createdById" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "thaun-website"."Post" (
	"postId" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"createdById" uuid NOT NULL,
	"title" text NOT NULL,
	"undertitle" text NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "thaun-website"."Account" (
	"userId" uuid NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" uuid NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT Account_provider_providerAccountId PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "thaun-website"."Session" (
	"sessionToken" text PRIMARY KEY NOT NULL,
	"userId" uuid NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "thaun-website"."User" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text,
	"admin" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "thaun-website"."VerificationToken" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT VerificationToken_identifier_token PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "thaun-website"."UserCredential" ADD CONSTRAINT "UserCredential_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "thaun-website"."User"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "thaun-website"."PostRevision" ADD CONSTRAINT "PostRevision_postId_Post_postId_fk" FOREIGN KEY ("postId") REFERENCES "thaun-website"."Post"("postId") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "thaun-website"."PostRevision" ADD CONSTRAINT "PostRevision_createdById_User_id_fk" FOREIGN KEY ("createdById") REFERENCES "thaun-website"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "thaun-website"."Post" ADD CONSTRAINT "Post_createdById_User_id_fk" FOREIGN KEY ("createdById") REFERENCES "thaun-website"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "thaun-website"."Account" ADD CONSTRAINT "Account_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "thaun-website"."User"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "thaun-website"."Session" ADD CONSTRAINT "Session_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "thaun-website"."User"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
