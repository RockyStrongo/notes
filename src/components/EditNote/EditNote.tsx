"use client";

import { createNote } from "@/actions/createNote";
import { Note } from "@prisma/client";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface IEditNoteProps {
  note: Note | null;
  open: boolean;
  onclose: () => void;
}

type TEditNoteInputs = {
  title: string;
  content: string;
};

export default function EditNote({ note, onclose, open }: IEditNoteProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TEditNoteInputs>({
    values: {
      content: note?.title ?? "",
      title: note?.content ?? "",
    },
  });
  const router = useRouter();
  const onSubmit: SubmitHandler<TEditNoteInputs> = async (data) => {
    const res = await createNote(data);
    reset();
    router.refresh();
  };
  return (
    <>
      <Drawer
        defaultOpen={false}
        open={open}
        onOpenChange={(open) => {
          onclose();
        }}
      >
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Create a note</DrawerTitle>
            </DrawerHeader>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3 p-5"
            >
              <Input {...register("title", { required: "Required" })} />
              {errors.title && (
                <p className="text-xs text-red-500">{errors.title?.message}</p>
              )}
              <Textarea
                className="h-72"
                {...register("content", { required: "Required" })}
              />
              {errors.content && (
                <p className="text-xs text-red-500">
                  {errors.content?.message}
                </p>
              )}
              <DrawerFooter>
                <Button type="submit">Submit</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
