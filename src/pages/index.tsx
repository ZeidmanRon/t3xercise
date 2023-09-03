import { SignInButton, useUser } from "@clerk/nextjs";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "~/components/ui/sheet";
import {Menu} from "lucide-react";
import Image from "next/image";
import God from "/public/koolcool.jpg";

export default function Home() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user.isLoaded && user.isSignedIn) {
      router
        .push("/home")
        .then(() => {
          // The navigation was successful
        })
        .catch((error) => {
          // Handle any errors that occurred during navigation
          console.error(error);
        });
    }
  }, [user, router]);

  return (
    <>
      <Head>
        <title>T3xercise</title>
        <meta
          name="description"
          content="Unleash Your Trainer Potential: Effortlessly Craft Customized Workouts, Share Exercises, and Organize Your Fitness Arsenal – All in One Place!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-1 justify-center">
          <Sheet>
              <div className="absolute right-0 top-0 p-4">
              <SheetTrigger><Menu /></SheetTrigger>
              </div>
              <SheetContent className="w-3/4">
                  <SheetHeader>
                      <SheetTitle>תחנק 💓</SheetTitle>
                      <SheetDescription>
                      ותגיד תודה לאלוהים שלך
                      </SheetDescription>
                  </SheetHeader>
                  <Image src={God} alt="koolcool" />
              </SheetContent>
          </Sheet>
        <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
          <div className="flex h-full justify-center border-b border-slate-400 p-4">
            {!user.isLoaded || !user.isSignedIn ? (
              <div className=" flex flex-col justify-center text-center text-white">
                <div className="flex h-1/4 flex-col justify-center">
                  <h1 className="handwrite text-[4rem] tracking-tight">
                    T3XERCISE
                  </h1>
                  <h1 className="handwrite -mt-5 text-[3rem] tracking-tight">
                    Build a{" "}
                    <span className="handwrite text-[hsl(280,100%,70%)]">
                      Workout
                    </span>
                  </h1>
                </div>
                <div className="h-1/4 flex-col justify-normal">
                  <SignInButton>
                    <button className="handwrite rounded-full border border-dashed border-transparent px-3 py-1 text-[3rem]">
                      sign in
                    </button>
                  </SignInButton>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
}
