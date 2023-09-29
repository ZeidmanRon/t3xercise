import { WorkoutList } from "~/components/workout/workoutList";
import Layout from "~/components/layout/layout";
import { api } from "~/utils/api";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import LoadingPage from "~/components/layout/loading";
import { Label } from "~/components/ui/label";
import { WorkoutCreateModal } from "~/components/workout/workoutCreateModal";

export default function HomePage() {
  const {
    data,
    isLoading: workoutsLoading,
    isError,
  } = api.workouts.getMostUpdated.useQuery();

  if (workoutsLoading || !data) return <LoadingPage />;

  return (
    <Layout>
      {/* <CreateExerciseWizard /> */}
      <div className="flex flex-1 flex-col items-center justify-between p-4">
        <div className="flex h-5/6 w-full flex-col">
          <Label className="mb-1 text-xl font-semibold">
            אימונים האחרונים:
          </Label>
          {isError ? (
            <Label>אין אימונים</Label>
          ) : (
            <WorkoutList workouts={data} />
          )}
        </div>
        <div className="flex h-1/6 flex-col items-center justify-center">
          <WorkoutCreateModal />
          <Button variant={"outline"} className="mt-2 h-10 w-auto px-20">
            <Link href="/workouts">לכל האימונים</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
}
