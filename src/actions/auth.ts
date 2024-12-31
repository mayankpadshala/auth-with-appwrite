'user server';

import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { cookies, headers } from "next/headers";
import { ID, Query } from "node-appwrite";
import { OAuthProvider } from "node-appwrite"
import { redirect } from "next/navigation";

async function signUp(formData: FormData) {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
  
    const { account } = await createAdminClient();

    try {
      const { account, database } = await createAdminClient();
      const newUserAccount = await account.create(ID.unique(), email, password, username);
      if (!newUserAccount) throw new Error("Error creating new user account");

      // Since we know the user is created in the auth database, we can create a new user session
      const newUser = await database.createDocument(
        process.env.DATABASE_ID!,
        process.env.USERS_COLLECTION_ID!,
        ID.unique(),
        {
            userId: newUserAccount.$id,
            email: email,
            username: username,
        }
      );
      
      if (!newUser) throw new Error("Error creating new user in database");
  
      // Once the user is created, we can create a new session for them
      const session = await account.createEmailPasswordSession(email, password);
    
      cookies().set("my-custom-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });
    
      redirect("/account");

    } catch (error) {
      console.log(error);
    }
  }
