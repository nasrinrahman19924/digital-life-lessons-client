import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js"; 
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_DB_URI);


await client.connect();

const db = client.db(process.env.AUTH_DB_NAME || process.env.DB_NAME);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,

  
 advanced: {
        crossSubdomainCookie: {
            enabled: true, 
        }
    },
    
    cookie: {
        secure: true,
        sameSite: "none"
    },

  
  trustedOrigins: [
    "https://digital-life-lessons-client-b987.vercel.app",
    "http://localhost:3000",
  ],

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        defaultValue: "user",
      },
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  plugins: [
    nextCookies(), 
  ],
});
