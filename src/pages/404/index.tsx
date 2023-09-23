import Layout from "~/components/layout/layout";
import { api } from "~/utils/api";
import LoadingPage from "~/components/layout/loading";
import { Label } from "~/components/ui/label";
interface PageNotFoundProps {
  message?: string;
  secondMessage?: string;
}
export default function PageNotFound({
  message,
  secondMessage,
}: PageNotFoundProps) {
  const { data, isLoading: exercisesLoading } = api.exercises.getAll.useQuery();

  if (exercisesLoading || !data) return <LoadingPage />;

  return (
    <Layout>
      <div
        dir="ltr"
        className="flex flex-1 flex-col items-center justify-center"
      >
        <div className="flex w-full items-center justify-center p-4 text-center">
          <Label className="mb-1 border-r border-gray-300 py-5 pr-5 text-4xl font-semibold ">
            404
          </Label>
          <div className="flex flex-col space-y-1">
            <Label className="text-md pl-5 font-normal">
              {message ? message : "This page could not be found\n"}
            </Label>
            <Label className="text-md pl-5 font-normal">
              {secondMessage ?? ""}
            </Label>
          </div>
        </div>
      </div>
    </Layout>
  );
}
