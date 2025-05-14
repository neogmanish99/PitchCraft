import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { client, writeClient } from "./sanity/lib/client";

interface GitHubProfile {
    id: number;
    login: string;
    bio: string | null;
    email: string | null;
    avatar_url: string;
    [key: string]: any;
}

export const authOptions: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET as string,
        }),
    ],
    callbacks: {
        // so here we taking out the github user info and using it for creating new author
        async signIn({ user, profile }) {
            if (!profile) {
                // You can return false or throw here, depending on your needs
                console.error("GitHub profile not provided");
                return false;
            }

            const { id, login, bio } = profile as GitHubProfile;

            // first we are checking if is there any user with the github id

            const existingUser = await client
                .withConfig({ useCdn: false })
                .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
                    id,
                });

            if (!existingUser) {
                await writeClient.create({
                    _type: "author",
                    _id: id,
                    name: user.name,
                    username: login,
                    email: user.email,
                    image: user.image,
                    bio: bio || "",
                });
            }

            return true; // Always return true to continue sign-in
        },

        // in this callback we have to create an author ID as tokenID from sanity to use it for our profile or when creating a new Startup
        // which will allow us to connect a specific Github user with a sanity author that can create a startup....
        async jwt({ token, account, profile }) {
            try {
                if (account && profile) {
                    const githubProfile = profile as GitHubProfile;

                    if (!githubProfile.id) {
                        console.error("GitHub profile ID missing");
                        return token;
                    }

                    const user = await client
                        .withConfig({ useCdn: false })
                        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
                            id: githubProfile.id,
                        });

                    if (!user) {
                        console.warn(
                            "No user found in Sanity for GitHub ID:",
                            githubProfile.id
                        );
                    } else {
                        console.log("User fetched from Sanity:", user);
                    }
                    // If a user is found, we inject the Sanity author's id into the JWT.
                    token.id = user?.id || githubProfile.id;
                }
            } catch (err) {
                console.error("JWT callback error:", err);
            }

            return token;
        },

        // finally we are sending the author ID by updating the jwt-token and sending it to the front-end through session
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
};
