import type { NextPage } from "next";
import { useEffect } from "react";
import TypewriterComponent from "typewriter-effect";
import { useDarkMode } from "usehooks-ts";
import { MetaHeader } from "~~/components/MetaHeader";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const Home: NextPage = () => {

  // useEffect
  const { isDarkMode } = useDarkMode();

  return (


    <>
      <MetaHeader />
      <div className={`${!isDarkMode ? 'text-black' : 'text-white'} font-blod py-32 text-center space-y-5`}>
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
          <h1>One wallet, multiple chains</h1>
          <div className="text-transparent pb-6 bg-clip-text bg-gradient-to-r from-blue-300 to-blue-700">
            <TypewriterComponent
              options={{
                strings: [
                  "Ethereum.",
                  "Polygon.",
                  "Scroll.",
                  "Mantle.",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        </div>
        <Link href={"/create-scw"}>
          <div className="btn btn-primary btn-md font-normal cursor-pointer gap-0 mt-10">
            <span>Get started</span>
            <ArrowRightIcon className="h-4 w-4 ml-2" />
          </div>
        </Link>
      </div>
    </>
  );
};

export default Home;
