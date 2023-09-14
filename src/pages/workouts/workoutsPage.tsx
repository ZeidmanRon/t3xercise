import { WorkoutList } from "~/components/workout/workoutList";
import Layout from "~/components/layout/layout";
import { api } from "~/utils/api";
import LoadingPage from "~/components/layout/loading";
import { WorkoutCreateModal } from "~/components/workout/workoutCreateModal";

export default function WorkoutPage() {
  const { data, isLoading: workoutsLoading } = api.workouts.getAll.useQuery();
  if (workoutsLoading || !data) return <LoadingPage />;

  return (
    <Layout>
      <div className="flex items-center">
        <div className="flex w-full flex-col p-4">
          <h1 className="mb-1 text-2xl font-semibold"> האימונים שלי:</h1>
          <WorkoutList workouts={[...data]} />
          <br />
          <div className="flex w-full flex-col items-center justify-center pt-4">
            <WorkoutCreateModal />
          </div>
        </div>
      </div>
    </Layout>
  );
}
