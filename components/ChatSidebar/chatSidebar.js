import Link from 'next/link'
import React from 'react'

export default function ChatSidebar() {
  return (
    <div className=' bg-[#202123]  text-white'>
        <Link href="/api/auth/logout">Logout</Link>
    </div>
  )
}
