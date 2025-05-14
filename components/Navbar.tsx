"use client"; // Required since you're using hooks and client-side interactivity

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    const { data: session } = useSession();
    console.log(session);

    return (
        <header>
            <nav className="container mx-auto flex justify-between items-center px-6 py-2 rounded">
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
                        <>
                            <Link href="/startup/create">
                                <span>Create</span>
                            </Link>
                            <button onClick={() => signOut()}>
                                <span>Logout</span>
                            </button>
                            <Link href={`/user/${session.user.id}`}>
                                <span>{session.user.name}</span>
                            </Link>
                        </>
                    ) : (
                        <button
                            className="cursor-pointer bg-black text-white-100 px-2 py-1.5 rounded-sm"
                            onClick={() =>
                                signIn("github", { prompt: "login" })
                            }
                        >
                            <span>Login</span>
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
