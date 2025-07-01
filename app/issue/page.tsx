"use client";
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "../components/ErrorMessage";

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

          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <TextArea
            placeholder="Issue Description"
            {...register("description")}
            resize="vertical"
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
          <Button>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default IssuePage;
