import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import WorkoutForm from "./workoutForm";
import { EditIcon } from "lucide-react";
import { useState } from "react";
import { type Workout } from "@prisma/client";
import { LoadingSpinner } from "../layout/loading";

type editWorkoutModalProps = {
  workout: Workout;
};

export function WorkoutEditModal({ workout }: editWorkoutModalProps) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
      <DialogTrigger asChild>
        <Button
          className=" rounded-full text-[0.6rem]"
          size={"sm"}
          variant={"ghost"}
        >
          <EditIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="top-60 flex h-auto w-11/12">
        {isLoading ? (
          <div className="flex h-auto flex-1 items-center justify-center py-10">
            <LoadingSpinner size={40} />
          </div>
        ) : (
          <div className="flex h-auto w-full flex-1 items-center justify-center">
            <WorkoutForm
              workout={workout}
              setIsLoading={setIsLoading}
              setShowModal={setOpenEditModal}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
