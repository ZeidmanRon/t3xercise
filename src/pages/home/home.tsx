import { WorkoutList } from "~/components/workout/workoutList";
import Layout from "~/components/layout/layout";
import { api } from "~/utils/api";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const HomePage: React.FC = () => {
  const { user } = useUser();
  const { data, isLoading } = api.workouts.getTop10.useQuery();

  if (!user) {
    // todo: change to PageNotFound component
    return <div>user not exist</div>;
  }

  if (isLoading) {
    // todo: change to Loading component
    return <div>Loading...</div>;
  }

  if (!data) {
    // todo: create a businessPage component
    return <div>Create some workouts...</div>;
  }

  return (
    <Layout>
      {/* <CreateExerciseWizard /> */}
      <div className="flex flex-col justify-center p-4">
        <h1 className="mb-1 text-2xl font-semibold"> אימונים האחרונים:</h1>
        <WorkoutList workouts={data} />
        <div className="flex w-full flex-col items-center justify-center pt-4">
          <Button variant={"outline"} className="w-auto px-10">
            הוספת אימון
          </Button>
          <Button variant={"outline"} className="mt-2 h-10 w-auto px-20">
            <Link href="/workouts">לכל האימונים</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
