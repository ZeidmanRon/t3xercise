import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { useState } from "react";

import { LoadingSpinner } from "../layout/loading";
import WorkoutForm from "./workoutForm";

export function WorkoutCreateModal() {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // isUpdatingWorkout
  return (
    <Dialog open={openCreateModal} onOpenChange={setOpenCreateModal}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>הוספת אימון</Button>
      </DialogTrigger>
      <DialogContent className="top-60 flex h-auto w-11/12">
        {isLoading ? (
          <div className="flex h-auto flex-1 items-center justify-center py-10">
            <LoadingSpinner size={40} />
          </div>
        ) : (
          <div className="flex h-auto w-full flex-1 items-center justify-center">
            <WorkoutForm
              setIsLoading={setIsLoading}
              setShowModal={setOpenCreateModal}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
