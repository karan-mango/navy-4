import React from 'react';
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <div className='footer bg-black relative bottom-0 text-white h-[220px] flex flex-col justify-center items-center'>
      <img src="../../public/navysub.svg" className='submarine w-60 h-60 absolute' alt="Submarine" />
      <img src="../../public/Indian Navy Logo Vector.svg" className="w-28" alt="" />
      <p className='mb-2'>All rights reserved to SO(IT) and NavCC</p>
      {/* <img src="../../public/wave (3).svg" alt="" className='w-full h-25 opacity-[.2] absolute top-5'/> */}
    </div>
  );
}
