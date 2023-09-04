import { WorkoutList } from "~/components/workoutList";
import Layout from "~/components/layout/layout";
import { api } from "~/utils/api";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

const HomePage: React.FC = () => {
  const { user } = useUser();
  console.log("email address:");
  console.log(user?.emailAddresses);

  const { mutate, isLoading: isLoading2 } = api.users.create.useMutation();

  if (!user) {
    // todo: change to PageNotFound component
    return <div>user not exist</div>;
  }

  const { data, isLoading } = api.workouts.getTop10.useQuery();
  const { data: dbUser, isLoading: isLoading3 } = api.users.getUser.useQuery({
    userId: user.id,
  });
  if (isLoading3) {
    // todo: change to Loading component
    return <div>Loading...</div>;
  }
  if (!dbUser) {
    // todo: change to PageNotFound component
    return (
      <Button
        onClick={() =>
          mutate({
            userId: user.id,
            fullName: user.fullName!,
            email: user.emailAddresses[0]?.emailAddress,
          })
        }
      >
        DB user not exist
      </Button>
    );
  }

  // const { data, isLoading } = api.Business.getBusinessById.useQuery({
  //   businessId: dbUser.data.businessId!,
  // });

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
