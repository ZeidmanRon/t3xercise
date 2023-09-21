import { useRouter } from "next/router";
import LoadingPage from "~/components/layout/loading";
import { api } from "~/utils/api";
import PageNotFound from "../404";
import { useEffect } from "react";
import Layout from "~/components/layout/layout";
import { ExerciseList } from "~/components/exercise/exerciseList";

export default function WorkoutPage() {
  const router = useRouter();
  const {
    data: workout,
    isLoading: isLoadingWorkout,
    error,
    refetch,
  } = api.workouts.getWorkoutById.useQuery({
    workoutId: router.query.workoutId as string, // Ensure it's cast to string
  });
  const {
    mutate: getExercises,
    data: exercisesOfWorkout,
    isLoading: isLoadingExercises,
  } = api.exercises.getExercises.useMutation();

  useEffect(() => {
    if (!isLoadingWorkout && !workout && !error) {
      // Refetch the workout only if it's not loading and no data has been loaded yet
      refetch;
    }
  }, [workout, refetch, router.query.workoutId, error, isLoadingWorkout]);

  useEffect(() => {
    if (!workout) return;
    const exercisesIds = workout.ExercisesOnWorkouts.map(
      (item) => item.exerciseId
    );
    getExercises(exercisesIds);
  }, [getExercises, workout]);

  if (isLoadingWorkout && !error) return <LoadingPage />;
  if (error && !workout) {
    const secondMessage = "the workout does not exist or it has been deleted";
    return (
      <PageNotFound message={error?.data?.code} secondMessage={secondMessage} />
    );
  }
  if (!workout || !exercisesOfWorkout) {
    return <LoadingPage />;
  }

  return (
    <Layout>
      <div className="flex items-center">
        <div className="flex w-full flex-col p-4">
          <div className="flex w-full justify-center">
            <h1 className="w-auto rounded-xl border p-1 text-center text-2xl font-normal">
              דף אימון - {workout.title}
            </h1>
          </div>
          <h1 className="-mb-1 font-semibold"> תרגילים:</h1>
          <ExerciseList exercises={exercisesOfWorkout} />
        </div>
      </div>
    </Layout>
  );
}
