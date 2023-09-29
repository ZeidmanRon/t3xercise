import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ClerkProvider, RedirectToSignUp, SignedOut } from "@clerk/nextjs";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider
      {...pageProps}
      appearance={{
        elements: {
          headerSubtitle: "hidden",
        },
        layout: {},
      }}
    >
      <Component {...pageProps} />
      <SignedOut>
        <RedirectToSignUp />
      </SignedOut>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
