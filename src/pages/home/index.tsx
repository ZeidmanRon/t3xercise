import { SignOutButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { WorkoutList } from "~/components/workoutList";
import Layout from "~/components/layout/layout";
import { api } from "~/utils/api";

const HomePage: React.FC = () => {
  const { data, isLoading } = api.workouts.getTop10.useQuery();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Create some exercises...</div>;

  return (
    <Layout>
      {/* <CreateExerciseWizard /> */}
      <div className=" m-4 flex flex-col justify-center p-4">
        <h1 className="text-2xl font-semibold"> האימונים שלי:</h1>
        <WorkoutList workouts={data} />
      </div>
    </Layout>
  );
};

// const CreateExerciseWizard = () => {
//   const { user } = useUser();

//   if (!user) return null;

//   return (
//     <div className="flex w-full gap-3">
//       <img
//         src={user.imageUrl}
//         alt="Profile Image"
//         className="h-14 w-14 rounded-full"
//       />
//       <input className="w-full bg-transparent" placeholder="type here" />
//     </div>
//   );
// };

export default HomePage;
