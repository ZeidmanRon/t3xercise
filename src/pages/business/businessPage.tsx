import Layout from "~/components/layout/layout";
import { api } from "~/utils/api";
import LoadingPage from "~/components/layout/loading";
import NoBusiness from "~/components/business/noBusiness";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { Business } from "@prisma/client";
import { Label } from "@radix-ui/react-label";

export default function Business() {
  // todo: how to update user's businessId:
  // api.users.test.useQuery({ businessId: "clmhxrcq30001vxnc6i4rtz4j" });

  const { user, isLoaded } = useUser();

  const {
    data,
    mutate: getBusiness,
    isLoading: businessLoading,
  } = api.businesses.getBusiness.useMutation({});

  useEffect(() => {
    if (isLoaded) {
      getBusiness({ id: user?.publicMetadata.businessId as string });
    }
  }, [getBusiness, isLoaded, user?.publicMetadata.businessId]);

  if (businessLoading || !isLoaded) {
    // user
    return <LoadingPage />;
  }
  return (
    <Layout>
      <div className="flex flex-1 flex-col">
        {!data?.name ? (
          <NoBusiness />
        ) : (
          <div className="flex-1 p-4">
            <Label className="flex items-center justify-center text-xl font-semibold">
              {data.name}
            </Label>
          </div>
        )}
      </div>
    </Layout>
  );
}
