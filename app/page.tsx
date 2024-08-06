"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default async function Home() {
  const route = useRouter();

  const { data: session } = useSession();
  if (session) {
    route.replace("/admin/dashboard");
  } else {
    route.replace("/sign-up");
  }

  return <div>Hi</div>;
}
