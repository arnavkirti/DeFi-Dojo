"use client";

import { PrivyProvider as Provider } from "@privy-io/react-auth";
import { PropsWithChildren } from "react";

export function PrivyProvider({ children }: PropsWithChildren) {
  return (
    <Provider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      config={{
        loginMethods: ["wallet", "email"],
        appearance: {
          theme: "dark",
          accentColor: "#4D7FFA",
        },
      }}
    >
      {children}
    </Provider>
  );
}
