import { WorkoutList } from "~/components/workoutList";
import Layout from "~/components/layout/layout";
import { api } from "~/utils/api";

const HomePage: React.FC = () => {
  const { data, isLoading } = api.workouts.getTop10.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Create some exercises...</div>;

  return (
    <Layout>
      {/* <CreateExerciseWizard /> */}
      <div className="flex flex-col justify-center p-4">
        <h1 className="mb-1 text-2xl font-semibold"> האימונים שלי:</h1>
        <WorkoutList workouts={data} />
      </div>
    </Layout>
  );
};

export default HomePage;
