import React from "react";
import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { StartupCardType } from "@/app/types";
import { Skeleton } from "./ui/skeleton";

const StartupCard = ({ post }: { post: StartupCardType }) => {
    const {
        _createdAt,
        views,
        author: { _id: authorId, name: authorName, image: authorImage },
        title,
        category,
        _id,
        image,
        description,
    } = post;
    return (
        <li className="startup-card group">
            <div className="flex-between">
                <p className="startup_card_date">{formatDate(_createdAt)}</p>
                <div className="flex gap-1.5">
                    <EyeIcon className="size-6 text-primary" />
                    <span className="text-16-medium">{views}</span>
                </div>
            </div>

            <div className="flex-between mt-5 gap-5">
                <div className="flex-1">
                    <Link href={`/user/${authorId}`}>
                        <p className="text-16-medium line-clamp-1">
                            {authorName}
                        </p>
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <h3 className="text-26-semibold line-clamp-1">
                            {title}
                        </h3>
                    </Link>
                </div>
                <Link href={`/user/${authorId}`}>
                    <div className="w-12 h-12">
                        <img
                            src={authorImage}
                            alt="User avatar"
                            width={96}
                            height={96}
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                </Link>
            </div>
            <Link href={`/startup/${_id}`}>
                <p className="startup-card_desc">{description}</p>
                <img src={image} alt="holder" className="startup-card_img" />
            </Link>
            <div className="flex-between gap-3 mt-5">
                <Link href={`/?query=${category.toLowerCase()}`}>
                    <p className="text-16-medium">{category}</p>
                </Link>
                <Button className="startup-card_btn" asChild>
                    <Link href={`/startup/${_id}`}>Details</Link>
                </Button>
            </div>
        </li>
    );
};

export const StartupCardSkeleton = () => (
    <>
        {[0, 1, 2, 3, 4].map((index: number) => (
            <li key={cn("skeleton", index)}>
                <Skeleton className="startup-card_skeleton" />
            </li>
        ))}
    </>
);

export default StartupCard;
