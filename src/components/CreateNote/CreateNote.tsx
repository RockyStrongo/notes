"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface ICreateNoteProps {}

type TCreateNoteInputs = {
  title: string;
  content: string;
};

export default function CreateNote({}: ICreateNoteProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateNoteInputs>();

  const onSubmit: SubmitHandler<TCreateNoteInputs> = (data) =>
    console.log(data);

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Create note</Button>
        </DrawerTrigger>
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
