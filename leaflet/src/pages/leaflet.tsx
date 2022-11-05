import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
const LeafletMap: NextPage = () => {
  const Map = dynamic(() => import("../ui/Map"), {
    ssr: false
  });
  return (
    <>
      <Head>
        <title>Maps</title>
        <meta name="description" content="A demo map app for demonstrating software techniques." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Map />
    </>
  );
};
export default LeafletMap;
