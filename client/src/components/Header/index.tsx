"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Header = () => {
  const [currentUser, setUser] = useState();
  async function getData() {
    try {
      const res = await axios.get("https://ticketing.dev/api/users/current-user");
      if (res.status !== 200) {
        throw new Error("Failed to fetch data");
      }
      return res.data;
    } catch (error: any) {
      console.log("Error", error.message);
    }
  }

  const links = [
    !currentUser && { label: "Sign Up", href: "/signup" },
    !currentUser && { label: "Sign In", href: "/signin" },
    currentUser && { label: "Sign Out", href: "/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map((link: any) => {
      return (
        <li key={link.href} className="nav-item">
          <Link href={link.href}>
            <span className="nav-link">{link.label}</span>
          </Link>
        </li>
      );
    });

  useEffect(() => {
    (async () => {
      const data = await getData();
      if (data?.currentUser) {
        setUser(data.currentUser);
      }
    })();
  }, []);

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        <span className="navbar-brand">GitTix</span>
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};

export default Header;
