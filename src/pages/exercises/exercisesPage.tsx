import Layout from "~/components/layout/layout";
import { ExerciseList } from "~/components/exercise/exerciseList";
import { api } from "~/utils/api";
import { ExerciseEditModal } from "~/components/exercise/exerciseCreateModal";
import { useUser } from "@clerk/nextjs";

export default function Exercises() {
  const { user } = useUser();

  if (!user) {
    return <div>not connected</div>;
  }
  const { data, isLoading } = api.exercises.getAllById.useQuery(
    {
      currUserId: user.id,
    },
    { enabled: !!user }
  );

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Create some exercises...</div>;

  return (
    <Layout userFullName={user.fullName!} userImageUrl={user.imageUrl}>
      <div className="flex items-center">
        <div className="flex w-full flex-col p-4">
          <h1 className="mb-1 text-2xl font-semibold"> התרגילים שלי:</h1>
          <ExerciseList exercises={[...data]} />
          <br />
          <div className="mt-3 flex flex-col items-center justify-center">
            <ExerciseEditModal userFullName={user.fullName!} userId={user.id} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
