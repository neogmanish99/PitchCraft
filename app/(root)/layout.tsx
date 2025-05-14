import React from "react";
import Navbar from "../../components/Navbar";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <main className="font-playwrite font-normal">
            <Navbar />
            {children}
        </main>
    );
};

export default layout;
