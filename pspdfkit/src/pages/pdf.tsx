import { NextPage } from "next";
import { useRef } from "react";
import usePSPDFKit from "../hooks/usePSPDFKit";
const App: NextPage = () => {
  const containerRef = useRef(null);
  usePSPDFKit({
    containerRef,
    document: "/example.pdf"
  });
  return (
    <>
      <div ref={containerRef} style={{ height: "100vh" }} />
      <style global jsx>
        {`
          * {
            margin: 0;
            padding: 0;
          }
        `}
      </style>
    </>
  );
};
export default App;
