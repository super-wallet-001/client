import type { NextPage } from "next";
import { useEffect } from "react";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {

  // useEffect

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        Building
      </div>
    </>
  );
};

export default Home;
