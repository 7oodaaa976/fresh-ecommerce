import React from "react";
import Image from "next/image";

import notFoundImg from "../../public/images/404.jpg";


export default function Notfound() {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <Image src={notFoundImg} width={800} height={800} alt={"NotFoundImage"} />
      <h3 className="bg-[#99A1AF] text-4xl p-3 rounded-full hover:bg-red-400 transition-colors duration-600 ease-in-out ">Not Found Page</h3>
        
      
    </div>
  );
}
