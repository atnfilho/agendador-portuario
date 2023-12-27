"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Home() {

   const router = useRouter();

   useEffect(() => {
      router.push('/agendamento');
   }, []);

   return (
      <h2></h2>
   )

}


export default Home;