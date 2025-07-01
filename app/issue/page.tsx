import { Button, Table } from '@radix-ui/themes'
import axios from '@/utils/api'
import Link from 'next/link'
import React from 'react'

interface Props{
  status: string,
  created_at: string,
  update_at: string,
  title: string,
  id: string,
  description: string
}

const IssuePage = async () => {
  let response = await axios.post<Props[]>("/issues/get_all")
  const issues = response.data
  return (
    <>
    <Button><Link href="/issue/new">New Issue</Link></Button>
    <Table.Root variant='surface' className='mt-5'>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((data)=>(
          <Table.Row key={data.id}>
            <Table.RowHeaderCell>{data.title}
              <div className='block md:hidden'>{data.status}</div>
            </Table.RowHeaderCell>
            <Table.Cell className='hidden md:table-cell'>{data.status}</Table.Cell>
            <Table.Cell className='hidden md:table-cell'>{new Date(data.created_at).toDateString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
    </>
  )
}

export default IssuePage