import { WorkoutList } from "~/components/workout/workoutList";
import Layout from "~/components/layout/layout";
import { api } from "~/utils/api";
import { Button } from "~/components/ui/button";
import { useUser } from "@clerk/nextjs";

const HomePage: React.FC = () => {
  const { user } = useUser();
  const { data, isLoading } = api.workouts.getAll.useQuery();
  if (!user) {
    // todo: change to PageNotFound component
    return <div>user not exist</div>;
  }

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Create some workouts...</div>;

  return (
    <Layout userFullName={user.fullName!} userImageUrl={user.imageUrl}>
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
