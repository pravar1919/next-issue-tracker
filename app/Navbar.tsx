"use client"
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter()
    let paths = [
        {label: "Dashboard", href:"/dashboard"},
        {label: "Issue", href:"/issue"},
    ]
  return (
    <nav className='flex border-b space-x-3 p-5 mb-5'>
        <Link href="/">APP</Link>
        <ul className='flex space-x-3'>
                {paths.map(path=><li key={path.href}><Link href={path.href} className={`text-gray-500 hover:text-gray-800`}>{path.label}</Link></li>)}
        </ul>
    </nav>
  )
}

export default Navbar