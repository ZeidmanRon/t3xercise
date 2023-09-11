import Layout from "~/components/layout/layout";
import { ExerciseList } from "~/components/exercise/exerciseList";
import { api } from "~/utils/api";
import { ExerciseEditModal } from "~/components/exercise/exerciseCreateModal";
import LoadingPage from "~/components/layout/loading";

export default function Exercises() {
  const { data, isLoading: exercisesLoading } =
    api.exercises.getAllById.useQuery();

  if (exercisesLoading || !data) return <LoadingPage />;

  return (
    <Layout>
      <div className="flex items-center">
        <div className="flex w-full flex-col p-4">
          <h1 className="mb-1 text-2xl font-semibold"> התרגילים שלי:</h1>
          <ExerciseList exercises={[...data]} />
          <br />
          <div className="mt-3 flex flex-col items-center justify-center">
            <ExerciseEditModal />
          </div>
        </div>
      </div>
    </Layout>
  );
}
