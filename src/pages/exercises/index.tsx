import Layout from "~/components/layout/layout";
import { ExerciseList } from "~/components/exercise/exerciseList";
import { api } from "~/utils/api";
import { CreateExerciseModal } from "~/components/exercise/createExerciseModal";
import { useUser } from "@clerk/nextjs";
const Exercises = () => {
  const { user } = useUser();
  if (!user) {
    return <div> no connected user</div>;
  }
  const { data, isLoading } = api.exercises.getAllById.useQuery({
    currUserId: user.id,
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Create some exercises...</div>;

  return (
    <Layout>
      <div className="flex w-full flex-col p-4">
        <h1 className="mb-1 text-2xl font-semibold"> התרגילים שלי:</h1>
        <ExerciseList exercises={[...data]} />
        <br />
        <div className="mt-3 flex flex-col items-center justify-center">
          <CreateExerciseModal />
        </div>
      </div>
    </Layout>
  );
};

export default Exercises;
