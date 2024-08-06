"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AdminNavLinks } from "../Constants";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className="leftsidebar">
      <div className=" flex w-full flex-1 gap-6 px-6 flex-col">
        {AdminNavLinks.map((links) => {
          const isActive = pathname === links.route;

          return (
            <Link
              href={links.route}
              key={links.label}
              className={`leftsidebar_link text-white ${isActive && "bg-[#528ae2]"}`}
            >
              <Image
                src={links.icon}
                alt="nav icons"
                width={26}
                height={26}/>
              <p className=" text-light-1 max-xl:hidden">{links.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
