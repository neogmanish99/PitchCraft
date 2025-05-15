"use client"; // Required since you're using hooks and client-side interactivity

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
    const { data: session } = useSession();
    console.log(session);

    return (
        <header>
            <nav className="container  mx-auto flex justify-around items-center px-6 py-2 rounded">
                <Link href="/">
                    <Image
                        src="/images/logo.png"
                        alt="logo"
                        width={150}
                        height={0}
                    />
                </Link>
                <div className="flex items-center gap-5">
                    {session && session.user ? (
                        <div className="bg-[#00041F] flex justify-around w-[350px] p-2.5 text-amber-50 outline-1 outline-indigo-800 rounded-4xl">
                            <Link href="/startup/create">
                                <span className="hover:scale-105 hover:text-indigo-300 transition-all duration-300 ease-in-out">
                                    Create
                                </span>
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="cursor-pointer hover:scale-105 hover:text-indigo-300 transition-all duration-300 ease-in-out "
                            >
                                <span>Logout</span>
                            </button>
                            <Link href={`/user/${session.user.id}`}>
                                <span className="hover:scale-105 hover:text-indigo-300 transition-all duration-300 ease-in-out">
                                    {session.user.name}
                                </span>
                            </Link>
                        </div>
                    ) : (
                        <button
                            className="cursor-pointer w-[6.25rem] bg-[#00041f] p-2.5 text-amber-50 outline-1 outline-indigo-800 rounded-4xl"
                            onClick={() =>
                                signIn("github", { prompt: "login" })
                            }
                        >
                            <span>Login</span>
                        </button>
                    )}
                </div>
                <Button className="cursor-pointer bg-indigo-500">
                    Contact us
                </Button>
            </nav>
        </header>
    );
};

export default Navbar;
