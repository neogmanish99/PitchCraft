import React from "react";
import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { StartupCardType } from "../types";
import { STARTUP_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import Navbar from "@/components/Navbar";

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
            <div className="relative w-full min-h-[100vh] overflow-hidden">
                {/* Background Image with Blur */}
                <div
                    className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat filter blur-md scale-105"
                    style={{
                        backgroundImage: `url('/images/mario-gogh-VBLHICVh-lI-unsplash.jpg')`,
                    }}
                />

                {/* Optional Indigo Overlay */}
                <div className="absolute inset-0 z-10 bg-indigo-900/40 mix-blend-multiply" />

                {/* Content Layer */}
                <div className="relative z-20">
                    <Navbar />
                    <section className="w-full flex justify-center items-center flex-col py-10 px-6">
                        <div className="container mx-auto flex justify-center items-center flex-col text-white">
                            <h1 className="font-bold text-[3.125rem] leading-16 text-center p-5 mt-7">
                                Pitch Your Startup, <br />
                                Connect with Entrepreneurs
                            </h1>
                            <p className="sub-heading mt-5 !max-w-3xl">
                                Smart Ideas, Vote on Pitches, and Get Noticed in
                                Virtual Competitions.
                            </p>
                            <SearchForm query={query} />
                        </div>
                    </section>
                </div>
            </div>

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
