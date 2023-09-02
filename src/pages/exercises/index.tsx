import { ExerciseSkeleton } from "~/components/exercise";
import { ExerciseList } from "~/components/exerciseList";
import { T3buttonSkeleton } from "~/components/t3button";
import { api } from "~/utils/api";

const Exercises = () => {
  const { data, isLoading } = api.exercises.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Create some exercises...</div>;

  return (
    <div className="test-border flex w-full flex-col p-4">
      <h1 className="text-2xl font-semibold"> התרגילים שלי:</h1>
      <ExerciseList exercises={[...data]} />
      <div className="flex justify-center mt-3">
        <T3buttonSkeleton text="תרגיל חדש" onClick={() => "hello"} />
      </div>
    </div>
  );
};

export default Exercises;
