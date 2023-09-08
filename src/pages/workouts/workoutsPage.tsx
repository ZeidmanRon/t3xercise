import { WorkoutList } from "~/components/workout/workoutList";
import Layout from "~/components/layout/layout";
import { api } from "~/utils/api";
import { Button } from "~/components/ui/button";
import { useUser } from "@clerk/nextjs";
import LoadingPage from "~/components/layout/loading";

export default function WorkoutPage() {
  const { user, isLoaded: userLoaded } = useUser();
  const { data, isLoading: workoutsLoading } = api.workouts.getAll.useQuery();

  if (!user || !userLoaded) return <div />;
  if (workoutsLoading || !data) return <LoadingPage />;

  return (
    <Layout userFullName={user.fullName!} userImageUrl={user.imageUrl}>
      <div className="flex items-center">
        <div className="flex w-full flex-col p-4">
          <h1 className="mb-1 text-2xl font-semibold"> האימונים שלי:</h1>
          <WorkoutList workouts={data} />
          <div className="flex w-full flex-col items-center justify-center pt-4">
            <Button variant={"outline"} className="mt-4 w-auto px-10">
              הוספת אימון
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}