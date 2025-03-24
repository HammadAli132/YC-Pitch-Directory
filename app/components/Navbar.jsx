import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { auth, handlers, signIn, signOut } from '@/auth'
import { redirect } from 'next/dist/server/api-utils'

async function Navbar() {
  const session = await auth()
  console.log("Session is", session)

  return (
    <header className='bg-white shadow-sm p-4 font-work-sans'>
      <nav className='flex items-center justify-between text-black'>
        <Link href='/'>
          <Image src='/logo.png' alt='logo' width={144} height={50} />
        </Link>
        <div className='flex grow items-center justify-end'>
          {session && session?.user ? (
            <div className='flex items-center justify-end gap-4'>
                <Link href='/startup/create'>
                    <span className='font-semibold hover:text-[#EF2D65]'>
                      Create
                    </span>
                </Link>
                <form action={async () => {
                    "use server";
                    await signOut({redirectTo: '/'});
                }}>
                    <button type="submit" className='font-semibold hover:text-[#EF2D65]'>
                      Logout
                    </button>
                </form>
                <Link href={`/profile/${session?.id}`}>
                    <span className='font-semibold hover:text-[#EF2D65]'>
                      {session?.user?.name}
                    </span>
                </Link>
            </div>
          ) : (
            <form action={async () => {
                "use server";
                await signIn('github');
            }}>
                <button type="submit" className=''>
                  Sign In
                </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar;
