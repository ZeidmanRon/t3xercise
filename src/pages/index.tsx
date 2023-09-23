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
      <div className="flex items-center">
        <div className="flex w-full flex-col p-4">
          <Label className="mb-1 text-xl font-semibold">
            אימונים האחרונים:
          </Label>
          {isError ? (
            <Label>אין אימונים</Label>
          ) : (
            <WorkoutList workouts={data} />
          )}
          <div className="flex w-full flex-col items-center justify-center pt-4">
            <WorkoutCreateModal />
            <Button variant={"outline"} className="mt-2 h-10 w-auto px-20">
              <Link href="/workouts">לכל האימונים</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
