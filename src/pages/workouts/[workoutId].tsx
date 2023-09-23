import { useRouter } from "next/router";
import LoadingPage from "~/components/layout/loading";
import { api } from "~/utils/api";
import PageNotFound from "../404";
import { useEffect } from "react";
import Layout from "~/components/layout/layout";
import { WorkoutExerciseList } from "~/components/workoutExercises/workoutExerciseList";
import { Label } from "~/components/ui/label";

export default function WorkoutPage() {
  const router = useRouter();
  const {
    data: workout,
    error,
    refetch,
  } = api.workouts.getWorkoutById.useQuery({
    workoutId: router.query.workoutId as string, // Ensure it's cast to string
  });
  const { mutate: getExercises, data: exercisesOfWorkout } =
    api.exercises.getExercises.useMutation();

  useEffect(() => {
    if (router.isReady) {
      refetch;
    }
  }, [refetch, router.isReady]);

  useEffect(() => {
    if (!workout) return;
    const exercisesIds = workout.ExercisesOnWorkouts.map(
      (item) => item.exerciseId
    );
    getExercises(exercisesIds);
  }, [getExercises, workout]);

  if (error) {
    const secondMessage = "the workout does not exist or it has been deleted";
    return (
      <PageNotFound message={error?.data?.code} secondMessage={secondMessage} />
    );
  }
  if (!workout || !exercisesOfWorkout) return <LoadingPage />;

  return (
    <Layout>
      <div className="flex items-center">
        <div className="flex w-full flex-col p-4">
          <div className="flex w-full justify-center">
            <h1 className="w-auto border-b-2 p-1 text-center text-2xl font-normal">
              {workout.title}
            </h1>
          </div>
          <Label className="p-1 font-semibold"> תרגילים:</Label>
          <WorkoutExerciseList
            workoutId={router.query.workoutId as string}
            exercises={exercisesOfWorkout}
          />
        </div>
      </div>
    </Layout>
  );
}
