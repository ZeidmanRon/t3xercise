import { WorkoutList } from "~/components/workoutList";
import Layout from "~/components/layout/layout";
import { api } from "~/utils/api";
import { Button } from "~/components/ui/button";

const HomePage: React.FC = () => {
  const { data, isLoading } = api.workouts.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Create some workouts...</div>;

  return (
    <Layout>
      {/* <CreateExerciseWizard /> */}
      <div className="flex flex-col justify-center p-4">
        <h1 className="mb-1 text-2xl font-semibold"> האימונים שלי:</h1>
        <WorkoutList workouts={data} />
        <div className="flex w-full flex-col items-center justify-center pt-4">
          <Button variant={"outline"} className="mt-4 w-auto px-10">
            הוספת אימון
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
