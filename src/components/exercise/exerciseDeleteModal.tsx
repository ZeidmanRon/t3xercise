import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { TrashIcon } from "lucide-react";
import React, { useState } from "react";
import { api } from "~/utils/api";
import { LoadingSpinner } from "../layout/loading";
import RateLimitAlert from "../rateLimitAlert";

type editExerciseModalProps = {
  exerciseId: string;
};
export function ExerciseDeleteModal({ exerciseId }: editExerciseModalProps) {
  const [open, setOpen] = useState(false);
  const [isAlert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertCode, setAlertCode] = useState("");
  const utils = api.useContext();

  const { mutate: deleteExercise, isLoading: isDeleting } =
    api.exercises.delete.useMutation({
      onError(opts) {
        setAlertCode(opts.data!.code);
        setAlertMessage(opts.message);
        setAlert(true);
        console.log(opts.message, opts.data!.code);
      },
      async onSuccess() {
        await utils.exercises.getAll.invalidate();
        setOpen(false);
      },
    });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className=" rounded-full text-[0.6rem]"
          size={"sm"}
          variant={"ghost"}
        >
          <TrashIcon size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-auto w-3/4 flex-col items-center justify-center">
        <DialogHeader className="h-fit">
          <DialogTitle>{isAlert ? "שגיאה" : "למחוק את התרגיל?"}</DialogTitle>
        </DialogHeader>
        {isAlert ? (
          <RateLimitAlert
            code={alertCode}
            message={alertMessage}
            setAlert={setAlert}
          />
        ) : isDeleting ? (
          <LoadingSpinner size={40} />
        ) : (
          <Button
            variant={"destructive"}
            onClick={() => {
              deleteExercise({ exerciseId });
            }}
          >
            מחיקה
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
