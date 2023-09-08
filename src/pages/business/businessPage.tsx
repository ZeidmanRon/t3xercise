import Layout from "~/components/layout/layout";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";

export default function Business() {
  const { user } = useUser();

  if (!user) {
    // todo: change to PageNotFound component
    return <div>user not exist</div>;
  }
  const { data: dbUser, isLoading: isLoading3 } =
    api.users.getUserById.useQuery({
      userId: user.id,
    });

  if (isLoading3) {
    // todo: change to Loading component
    return <div>Loading...</div>;
  }
  if (!dbUser && !isLoading3) {
    // todo: change to PageNotFound component

    return <Button>some test</Button>;
  }
  return (
    <Layout userFullName={user.fullName!} userImageUrl={user.imageUrl}>
      <div className="flex w-full flex-col items-center">
        <div className="flex-col p-4 md:w-1/2">
          <h1 className="mb-1 text-center text-2xl font-semibold">
            Logged User: {user.fullName}
          </h1>
        </div>
      </div>
    </Layout>
  );
}
