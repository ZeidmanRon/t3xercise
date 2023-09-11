import Layout from "~/components/layout/layout";
import { api } from "~/utils/api";
import LoadingPage from "~/components/layout/loading";
import NoBusiness from "~/components/business/noBusiness";

export default function Business() {
  const {
    data: businessId,
    isLoading: businessIdLoading,
    error: userError,
  } = api.users.getBusiness.useQuery();
  const {
    data: business,
    isLoading: businessLoading,
    fetchStatus,
    error: businessError,
  } = api.businesses.getBusiness.useQuery(
    {
      id: businessId!,
    },
    {
      enabled: !!businessId,
    }
  );

  if (businessIdLoading || (businessLoading && fetchStatus !== "idle")) {
    // user
    return <LoadingPage />;
  }
  return (
    <Layout>
      <div className="flex h-full w-full">
        {userError ?? businessError ? (
          <NoBusiness />
        ) : (
          <h1 className="mb-1 text-center text-2xl font-semibold">
            business?.name
          </h1>
        )}
      </div>
    </Layout>
  );
}
