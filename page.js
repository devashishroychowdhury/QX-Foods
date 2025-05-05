"use client"
import { useSession, signIn, signOut } from "next-auth/react"

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "./components/navbar";
import services from "./services";
import Typed from "typed.js";

import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  weight: ["300", "400", "700"], 
  subsets: ["latin"],
});


const TypedText = () => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["<h1>Welcome to Quick Food </h1>", " <h1> Have Something Delcious Today </h1>"],
      typeSpeed: 25,
      loop: true,
      loopCount: Infinity
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return <span ref={el} />;
};

// Separate Service Item into a component
const ServiceItem = ({ item }) => (
  <div className="display-items" key={item.id}>
    <img
      src={item.image || "/default-image.png"}
      alt={item.description || "Service image"}
      className="service-img"
      loading="lazy"
    />
    <div className="details">
      <h1>{item.heading}</h1>
      <p>{item.description}</p>
    </div>
  </div>
);

export default function Home() {
  return (
    <div className={ubuntu.className}>  
      <Navbar />
      <div className="flex justify-center items-center absolute top-28 left-1/2 transform -translate-x-1/2">
  <TypedText className="block text-center w-full" />
</div>


      <div className="relative top-40">
        {services.map((item) => (
          <ServiceItem key={item.id} item={item} />
        ))}

        </div>
      <div className="home">
      </div>
    </div>
  );
}