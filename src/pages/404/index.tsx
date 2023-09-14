import Layout from "~/components/layout/layout";
import { ExerciseList } from "~/components/exercise/exerciseList";
import { api } from "~/utils/api";
import { ExerciseCreateModal } from "~/components/exercise/exerciseCreateModal";
import LoadingPage from "~/components/layout/loading";
import { Label } from "~/components/ui/label";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function Exercises() {
  const { data, isLoading: exercisesLoading } =
    api.exercises.getAllById.useQuery();

  if (exercisesLoading || !data) return <LoadingPage />;

  return (
    <Layout>
      <div
        dir="ltr"
        className="flex flex-1 flex-col items-center justify-center"
      >
        <div className="flex w-full items-center justify-center p-4 text-center">
          <Label className="mb-1 border-r border-gray-300 py-4 pr-5 text-4xl font-semibold ">
            404
          </Label>
          <Label className="text-md mb-1 py-5 pl-5 font-normal">
            This page could not be found
          </Label>
        </div>
      </div>
    </Layout>
  );
}
