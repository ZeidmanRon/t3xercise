import Layout from "~/components/layout/layout";
import { ExerciseList } from "~/components/exerciseList";
import { T3buttonSkeleton } from "~/components/t3button";
import { api } from "~/utils/api";

const Exercises = () => {
  const { data, isLoading } = api.exercises.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Create some exercises...</div>;

  return (
    <Layout>
      <div className="flex w-full flex-col p-4">
        <h1 className="text-2xl font-semibold"> התרגילים שלי:</h1>
        <ExerciseList exercises={[...data]} />
        <div className="mt-3 flex justify-center">
          <T3buttonSkeleton text="תרגיל חדש" onClick={() => "hello"} />
        </div>
      </div>
    </Layout>
  );
};

export default Exercises;
