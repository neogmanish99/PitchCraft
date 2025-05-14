import React from "react";
import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { StartupCardType } from "../types";
import { STARTUP_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

const Home = async ({
    searchParams,
}: {
    searchParams: Promise<{ query?: string }>;
}) => {
    const session = await getServerSession(authOptions);
    const query = (await searchParams).query;
    const params = { search: query || null };

    const { data: posts } = await sanityFetch({ query: STARTUP_QUERY, params });

    console.log(JSON.stringify(posts, null, 2));
    console.log("session", session);

    return (
        <>
            <section className="w-full bg-primary-200 min-h-[600px] flex justify-center items-center flex-col py-10 px-6 [background-image:repeating-linear-gradient(to_right,transparent,transparent_23px,rgba(255,255,255,0.2)_24px,transparent_25px)]">
                <div className="container mx-auto flex justify-center items-center flex-col ">
                    <h1 className="bg-black font-bold text-[3.125rem] leading-16 text-center p-5  text-white">
                        Pitch Your Startup, <br />
                        Connect with Entrepreneurs
                        {session?.user?.name}
                    </h1>
                    <p className="sub-heading mt-5 !max-w-3xl">
                        Smart Ideas, Vote on Pitches, and Get Noticed in Virtual
                        Competitions.
                    </p>
                    <SearchForm query={query} />
                </div>
            </section>
            <section className="container mx-auto px-6 py-2">
                <p className="text-30-semibold">
                    {query ? `Search results for "${query}"` : "All Startups"}
                </p>

                <ul className="mt-7 card_grid">
                    {posts?.length > 0 ? (
                        posts.map((post: StartupCardType) => (
                            <StartupCard key={post?._id} post={post} />
                        ))
                    ) : (
                        <p className="no-results">No startup founds</p>
                    )}
                </ul>
            </section>
            <SanityLive />
        </>
    );
};

export default Home;
