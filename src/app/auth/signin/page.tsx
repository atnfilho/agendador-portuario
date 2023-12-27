"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Signin() {
  
  const router = useRouter();
  const { status } = useSession();
  const searchParams = useSearchParams();
  
  const callbackUrl = searchParams.get('callbackUrl');
    
  
  useEffect(() => {
    if (status === "unauthenticated") {
      void signIn("keycloak");
    } else if (status === "authenticated") {
      void router.push(callbackUrl || "/agendamento");
    }
  }, [status]);

  return <div></div>;
}