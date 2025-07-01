"use client"
import { Button, Callout, TextArea, TextField } from '@radix-ui/themes'
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';


interface IssueForm{
  title: string,
  description: string
}

const IssuePage = () => {
  const {register, handleSubmit} = useForm<IssueForm>()
  const [error, setError] = useState('')
  const onSubmit = async (data: IssueForm)=>{
    try {
      const response = await axios.post("/api/issues", data)
      console.log(response);
    } catch (error) {
      setError("An unexpected error occured.")
    }
  }
  
  return (
    <div className='max-w-xl'>
      {error && <Callout.Root color="red" className='mb-5'>
            <Callout.Text>
              {error}
            </Callout.Text>
          </Callout.Root>
      }
      <form onSubmit={handleSubmit((data)=>onSubmit(data))}>
        <div className='space-y-3'>
        <TextField.Root placeholder="Issue Title" {...register("title")}/>
        <TextArea placeholder="Issue Description" {...register("description")} resize="vertical" />
        <Button>Submit</Button>
        </ div>
      </form>
    </div>
  )
}

export default IssuePage