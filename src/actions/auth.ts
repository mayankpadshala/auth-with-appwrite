'use server';

import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { ID, Query } from "node-appwrite";
import { redirect } from "next/navigation";

export const getUserDetails = async (userId: string) => {
    try {
      const { database } = await createAdminClient();
      const user = await database.listDocuments(
        process.env.DATABASE_ID!,
        process.env.USERS_COLLECTION_ID!,
        [Query.equal("userId", [userId])]
      );
      return JSON.parse(JSON.stringify(user.documents[0]));
    } catch (error) {
      console.log(error);
    }
  }

export async function getLoggedInUser() {
    const sessionClient = await createSessionClient();
    if (!sessionClient) return null;
    try {
      const { account } = sessionClient;
      const result = await account.get();
      if (!result) return null;
      const user = await getUserDetails(result.$id);
      return JSON.parse(JSON.stringify(user));
    } catch (error) {
      console.log(error);
      return null;
    }
  }

export async function signUp(formData: FormData) {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
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
    
      (await cookies()).set("appwrite-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });
    
      return { success: true };
    } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      console.log(error);
      return { error: error.message };
    }
  }

  export async function signIn(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { account } = await createAdminClient();
      const session = await account.createEmailPasswordSession(email, password);
      if (!session) throw new Error("Error creating user session");
      (await cookies()).set("appwrite-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });
      return { success: true };
    } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      console.log(error);
      return { error: error.message };
    }
  }

export async function signOut(): Promise<void> { 
    const sessionClient = await createSessionClient();
    if (!sessionClient) redirect("/sign-in");
    const { account } = sessionClient;
    (await cookies()).delete("appwrite-session");
    await account.deleteSession("current");
    redirect("/sign-in");
}