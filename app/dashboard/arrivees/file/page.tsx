import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";


const page = () => {
    const router = useRouter();
    const { fileUrl } = router.query; // Access the `pdfFile` query parameter
  
    if (!fileUrl) {
        console.log("no file");
        router.push("");

    }
  

  return (
    <div>
      <h1>PDF Viewer</h1>
      {

          <iframe
          typeof="_blank"
          src={'uploads/arrivee'+fileUrl} // Path to your PDF in the public directory
          width="100%"
          height="600px"
          title="Sample PDF"
          />
        }
    </div>
  );
};

export default page;
