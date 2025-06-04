"use client";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 bg-slate-800 py-3 rounded-lg">
      <Link href={"/"} className="text-white font-bold ">
        GTCoding.
      </Link>
      <Link href={"/addTopic"} className="bg-white p-2 rounded-md">
        Add Topic
      </Link>
    </nav>
  );
};

export default Navbar;
