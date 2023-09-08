import { WorkoutList } from "~/components/workout/workoutList";
import Layout from "~/components/layout/layout";
import { api } from "~/utils/api";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import LoadingPage from "~/components/layout/loading";
import { useRouter } from "next/router";

export default function HomePage() {
  const { user, isLoaded: userLoaded } = useUser();
  const { data, isLoading: workoutsLoading } = api.workouts.getTop10.useQuery();

  if (!user || !userLoaded) return <div />;
  if (workoutsLoading || !data) return <LoadingPage />;

  return (
    <Layout userFullName={user.fullName!} userImageUrl={user.imageUrl}>
      {/* <CreateExerciseWizard /> */}
      <div className="flex items-center">
        <div className="flex w-full flex-col p-4">
          <h1 className="mb-1 text-2xl font-semibold"> אימונים האחרונים:</h1>
          <WorkoutList workouts={data} />
          <div className="flex w-full flex-col items-center justify-center pt-4">
            <Button variant={"outline"} className="w-auto px-10">
              הוספת אימון
            </Button>
            <Button variant={"outline"} className="mt-2 h-10 w-auto px-20">
              <Link href="/workouts">לכל האימונים</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
