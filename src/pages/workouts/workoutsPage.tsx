import { WorkoutList } from "~/components/workout/workoutList";
import Layout from "~/components/layout/layout";
import { api } from "~/utils/api";
import LoadingPage from "~/components/layout/loading";
import { WorkoutCreateModal } from "~/components/workout/workoutCreateModal";
import { Label } from "~/components/ui/label";

export default function WorkoutsPage() {
  const {
    data,
    isLoading: workoutsLoading,
    isError,
  } = api.workouts.getAll.useQuery();
  if (workoutsLoading || !data) return <LoadingPage />;

  return (
    <Layout>
      {/* <CreateExerciseWizard /> */}
      <div className="flex flex-1 flex-col items-center justify-between p-4">
        <div className="flex h-5/6 w-full flex-col">
          <Label className="mb-1 text-xl font-semibold">האימונים שלי:</Label>
          {isError ? (
            <Label>אין אימונים</Label>
          ) : (
            <WorkoutList workouts={data} />
          )}
        </div>
        <div className="flex h-1/6 flex-col items-center justify-center">
          <WorkoutCreateModal />
        </div>
      </div>
    </Layout>
  );
}
