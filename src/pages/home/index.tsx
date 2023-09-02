import { SignOutButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { ExerciseSkeleton } from "~/Components/exercise";
import Layout from "~/Components/layout/layout";
import { api } from "~/utils/api";

const HomePage: React.FC = () => {
  const { data, isLoading } = api.exercises.getAll.useQuery();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Create some exercises...</div>;

  return (
    <Layout>
      {/* <CreateExerciseWizard /> */}
      <div className=" flex justify-center p-2">
        <SignOutButton signOutCallback={() => router.push("/")}>
          <button className="rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow hover:bg-gray-100">
            Sign out
          </button>
        </SignOutButton>
      </div>
      <div className="flex flex-col">
        {[...data]?.map((exercise) => (
          <div className="border-b border-slate-400 p-3" key={exercise.id}>
            <ExerciseSkeleton exercise={exercise} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

const CreateExerciseWizard = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="flex w-full gap-3">
      <img
        src={user.imageUrl}
        alt="Profile Image"
        className="h-14 w-14 rounded-full"
      />
      <input className="w-full bg-transparent" placeholder="type here" />
    </div>
  );
};

export default HomePage;
