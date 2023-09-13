import Head from "next/head";
import { useUser, SignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SignInPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user && isLoaded && isSignedIn) {
      void router.push("/home");
    }
  }, [isLoaded, isSignedIn, router, user]);

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
        <div className="flex flex-1 flex-col items-center justify-center text-center text-stone-600">
          <div dir="ltr">
            <h1 className="handwrite text-[4rem] tracking-tight">T3XERCISE</h1>
            <h1 className="handwrite -mt-5 text-[3rem] tracking-tight">
              Build a
              <span className="handwrite text-[hsl(247,100%,70%)]">
                Workout
              </span>
            </h1>
            <div className="mt-10">{isSignedIn ? "" : <SignIn />}</div>
          </div>
        </div>
      </main>
    </>
  );
}
