import { Client, Account, ID, Avatars, Databases, Query } from "react-native-appwrite";

export const config = {
  endPoint: "https://cloud.appwrite.io/v1",
  platform: "com.messay.zynk",
  projectId: "66a400c100302c8e1de6",
  databaseId: "66a4daf900288d35b3b0",
  userCollectionId: "66a4db36000d2b5fba0c",
  videoCollectionId: "66a4db77000f9c733bc5",
  storageId: "66a50a010033b7a4e727",
};

const {
  endPoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config

const client = new Client();

client
  .setEndpoint(config.endPoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

export async function signIn(email, password) {
  try {
    // Check if a session already exists
    const currentSession = await account.getSession("current");

    if (currentSession) {
      return currentSession;
    }

    // Create a new session if none exists
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    if (
      error.message.includes(
        "creation of a session is prohibited when a session is active"
      )
    ) {
      // Handle case where a session is already active
      const currentSession = await account.getSession("current");
      return currentSession;
    } else {
      throw new Error(error);
    }
  }
}

export async function getAccount() {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error) {
      throw new Error(error);
    }
  }

export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Get video posts created by user
export async function getUserPosts(userId) {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}


// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
}


export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}


// Get video posts that matches search query
export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.search("title", query)]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}


export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}
