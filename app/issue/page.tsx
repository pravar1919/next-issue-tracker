"use client"
import { Button, TextArea, TextField } from '@radix-ui/themes'
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';


interface IssueForm{
  title: string,
  description: string
}

const IssuePage = () => {
  const {register, handleSubmit} = useForm<IssueForm>()
  const onSubmit = async (data: IssueForm)=>{
    const response = await axios.post("/api/issues", data)
    console.log(response);
  }
  
  return (
    <form onSubmit={handleSubmit((data)=>onSubmit(data))}>
      <div className='max-w-xl space-y-3'>
      <TextField.Root placeholder="Issue Title" {...register("title")}/>
      <TextArea placeholder="Issue Description" {...register("description")} resize="vertical" />
      <Button>Submit</Button>
      </ div>
    </form>
  )
}

export default IssuePage