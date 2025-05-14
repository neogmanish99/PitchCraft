import { StartupCardType } from "@/app/types";
import { client } from "@/sanity/lib/client";
import { STARTUPS_AUTHOR } from "@/sanity/lib/queries";
import React from "react";
import StartupCard from "./StartupCard";

export const UserStartups = async ({ id }: { id: string }) => {
    const startups = await client.fetch(STARTUPS_AUTHOR, { id });
    return (
        <>
            {startups.length > 0 ? (
                startups.map((startup: StartupCardType) => (
                    <StartupCard key={startup._id} post={startup} />
                ))
            ) : (
                <p className="no-result">No posts yet</p>
            )}
        </>
    );
};
