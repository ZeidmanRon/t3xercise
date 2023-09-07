import Layout from "~/components/layout/layout";
import { ExerciseList } from "~/components/exercise/exerciseList";
import { api } from "~/utils/api";
import { CreateExerciseDialog } from "~/components/exercise/createExerciseModal";
import { use, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { NewExerciseForm } from "~/components/exercise/newExercise";

const Exercises = () => {
  const { user } = useUser();
  const { data, isLoading } = api.exercises.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Create some exercises...</div>;

  return (
    <Layout>
      <div className="flex w-full flex-col p-4">
        <h1 className="mb-1 text-2xl font-semibold"> התרגילים שלי:</h1>
        <ExerciseList exercises={[...data]} />
        <br />
        <h1 className="mb-1 text-2xl font-semibold"> טופס תרגיל חדש:</h1>
        <div className="mt-3 flex flex-col items-center justify-center">
          <NewExerciseForm />
        </div>
      </div>
    </Layout>
  );
};

export default Exercises;
