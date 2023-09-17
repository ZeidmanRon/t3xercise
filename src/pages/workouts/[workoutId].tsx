import { useRouter } from "next/router";
import LoadingPage from "~/components/layout/loading";
import { api } from "~/utils/api";
import PageNotFound from "../404";
import { useEffect } from "react";

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

  useEffect(() => {
    console.log("im here");
    if (!isLoadingWorkout && !workout && !error) {
      // Refetch the workout only if it's not loading and no data has been loaded yet
      refetch;
    }
  }, [workout, refetch, router.query.workoutId, error, isLoadingWorkout]);

  if (isLoadingWorkout && !error) return <LoadingPage />;
  if (error && !workout) {
    const secondMessage = "the workout does not exist or it has been deleted";
    return (
      <PageNotFound message={error?.data?.code} secondMessage={secondMessage} />
    );
  }
  if (!workout) {
    return <LoadingPage />;
  }

  return <p>{workout.title}</p>;
}
