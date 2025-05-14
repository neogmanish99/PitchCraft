import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_INFO_BY_ID } from "@/sanity/lib/queries";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

const md = markdownit();

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const post = await client.fetch(STARTUP_INFO_BY_ID, { id });

    if (!post) return notFound();

    const parsedContent = md.render(post?.pitch);
    console.log(post.pitch);
    return (
        <>
            <section className="w-full bg-primary-200 !min-h-[230px] flex justify-center items-center flex-col py-10 px-6 ">
                <p className="tag">{formatDate(post?._createdAt)}</p>
                <h1 className="bg-black font-bold text-[3.125rem] leading-16 text-center p-5 m-5  text-white">
                    {post.title}
                </h1>
                <p className="sub-heading !max-w-5xl">{post.description}</p>
            </section>
            <section className="section_container">
                <img
                    src={post.image}
                    alt="thumbnail"
                    className="w-[50rem] mx-auto h-auto rounded-xl"
                />
                <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                    <div className="flex-between gap-5">
                        <Link
                            href={`/user/${post.author?.id}`}
                            className="flex gap-2 items-center mb-3"
                        >
                            <div className="w-20 h-20">
                                <img
                                    src={post.author.image}
                                    alt="User avatar"
                                    width={96}
                                    height={96}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-20-medium">
                                    {post.author.name}
                                </p>
                                <p className="text-16-medium !text-black-300">
                                    @{post.author.username}
                                </p>
                            </div>
                        </Link>
                        <p className="category-tag">{post.category}</p>
                    </div>
                    <h3 className="text-30-bold">Pitch Details</h3>
                    {parsedContent ? (
                        <article
                            className="prose max-w-4xl font-sans break-words p-6 bg-white rounded-lg shadow-lg shadow-gray-300 my-6 mx-auto"
                            dangerouslySetInnerHTML={{ __html: parsedContent }}
                        />
                    ) : (
                        <p className="no-result">No details provided</p>
                    )}
                    {/*TODO: EDITOR SELECTED STARTUPS */}
                    <Suspense fallback={<Skeleton className="view_skeleton" />}>
                        <View id={id} />
                    </Suspense>
                </div>
            </section>
        </>
    );
};

export default page;
