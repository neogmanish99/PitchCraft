import StartupForm from "@/components/StartupForm";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
    const session = await getServerSession(authOptions);

    if (!session) redirect("/");
    return (
        <>
            <section className="w-full bg-primary-200 min-h-[230px] flex justify-center items-center flex-col py-10 px-6 [background-image:repeating-linear-gradient(to_right,transparent,transparent_23px,rgba(255,255,255,0.2)_24px,transparent_25px)]">
                <div className="container mx-auto flex justify-center items-center flex-col ">
                    <h1 className="heading">Submit Your StartUp</h1>
                </div>
            </section>
            <StartupForm />
        </>
    );
};

export default page;
