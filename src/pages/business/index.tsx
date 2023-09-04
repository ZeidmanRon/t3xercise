import Layout from "~/components/layout/layout";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";

const Business = () => {
  const { user } = useUser();
  if (!user) {
    // todo: change to PageNotFound component
    return <div>user not exist</div>;
  }

  const dbUser = api.users.getUser.useQuery({
    userId: user.id,
  });

  if (!dbUser.data) {
    // todo: change to PageNotFound component
    return <div>DB user not exist</div>;
  }

  const { data, isLoading } = api.Business.getBusinessById.useQuery({
    businessId: dbUser.data.businessId!,
  });

  if (isLoading) {
    // todo: change to Loading component
    return <div>Loading...</div>;
  }

  if (!data) {
    // todo: create a businessPage component
    return <div>Create Business Page...</div>;
  }

  console.log(data);

  return (
    <Layout>
      <div className="flex w-full flex-col p-4">
        <h1 className="mb-1 text-2xl font-semibold">
          {data.at(0)?.name} supposed to be a name before this text
        </h1>
      </div>
    </Layout>
  );
};

export default Business;
