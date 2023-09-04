import Layout from "~/components/layout/layout";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";

const Business: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    // todo: change to PageNotFound component
    return <div>user not exist</div>;
  }
  const { mutate, isLoading: isLoading2 } = api.users.create.useMutation();
  const { data: dbUser, isLoading: isLoading3 } = api.users.getUser.useQuery({
    userId: user.id,
  });

  if (isLoading3) {
    // todo: change to Loading component
    return <div>Loading...</div>;
  }
  if (!dbUser && !isLoading3) {
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

  //   const { data, isLoading } = api.Business.getBusinessById.useQuery({
  //     businessId: dbUser.businessId!,
  //   });

  //   if (isLoading) {
  //     // todo: change to Loading component
  //     return <div>Loading...</div>;
  //   }

  //   if (!data) {
  //     // todo: create a businessPage component
  //     return <div>Create Business Page...</div>;
  //   }

  console.log(user);

  return (
    <Layout>
      <div className="flex w-full flex-col p-4">
        <h1 className="mb-1 text-2xl font-semibold">
          {user.fullName} supposed to be a name before this text
        </h1>
      </div>
    </Layout>
  );
};

export default Business;
