"use client";
import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";

type IssueForm = z.infer<typeof createIssueSchema>;

const IssuePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");
  const onSubmit = async (data: IssueForm) => {
    try {
      const response = await axios.post("/api/issues", data);
      console.log(response);
    } catch (error) {
      setError("An unexpected error occured.");
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <div className="space-y-3">
          <TextField.Root placeholder="Issue Title" {...register("title")} />
          {errors.title && (
            <Text color="red" as="p">
              {errors.title.message}
            </Text>
          )}
          <TextArea
            placeholder="Issue Description"
            {...register("description")}
            resize="vertical"
          />
          {errors.description && (
            <Text color="red" as="p">
              {errors.description.message}
            </Text>
          )}
          <Button>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default IssuePage;
