import Layout from "~/components/layout/layout";
import { ExerciseList } from "~/components/exercise/exerciseList";
import { api } from "~/utils/api";
import { ExerciseCreateModal } from "~/components/exercise/exerciseCreateModal";
import LoadingPage from "~/components/layout/loading";

export default function Exercises() {
  const { data, isLoading: exercisesLoading } = api.exercises.getAll.useQuery();

  if (exercisesLoading || !data) return <LoadingPage />;

  return (
    <Layout>
      <div className="flex flex-1 flex-col items-center justify-between p-4">
        <div className="flex h-5/6 w-full flex-col">
          <h1 className="mb-1 text-2xl font-semibold"> התרגילים שלי:</h1>
          <ExerciseList exercises={[...data]} />
          <br />
        </div>
        <div className="flex h-1/6 flex-col items-center justify-center">
          <ExerciseCreateModal />
        </div>
      </div>
    </Layout>
  );
}
