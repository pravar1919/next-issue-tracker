import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const IssuePage = () => {
  return (
    <Button><Link href="/issue/new">New Issue</Link></Button>
  )
}

export default IssuePage