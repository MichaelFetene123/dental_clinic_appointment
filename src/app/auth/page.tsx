import React from 'react'
import Image from 'next/image'
import { BiArrowBack } from 'react-icons/bi'
import Link from 'next/link'
import Form from 'next/form'

const Page = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="w-80 h-auto bg-background shadow-lg rounded-xl p-5 border border-border">
                <Link href='/' className='flex items-center gap-2'>
                    <BiArrowBack />
                    <p>Home Page</p>
                </Link>
                <p className='text-center font-lucida my-5 mb-8 text-3xl font-extrabold text-foreground'>Welcome back</p>
                <div className="flex flex-col items-center justify-center mb-4 gap-3">
                    <Image src="/images/logo/logo-1.png" alt='logo' width={100} height={100} className="w-auto h-auto" />
                    <h1 className='text-3xl font-boruna text-accent'>Classic Dental Clinic</h1>
                </div>

                <Form action="" className="w-full flex flex-col gap-[18px] mb-[15px]">
                    <input 
                        type="email or phone number" 
                        className="rounded-md border border-input outline-none p-3 w-full bg-background text-foreground" 
                        placeholder="Email or phone number" 
                    />
                    <input 
                        type="password" 
                        className="rounded-md border border-input outline-none p-3 w-full bg-background text-foreground" 
                        placeholder="Password" 
                    />
                    <p className="underline m-0 text-right text-muted-foreground">
                        <span className="cursor-pointer font-inter text-xs font-bold hover:text-foreground transition-colors">Forgot Password?</span>
                    </p>
                    <button className="py-2.5 px-4 font-inter rounded-full border-0 outline-none bg-primary text-primary-foreground cursor-pointer shadow-md active:shadow-none hover:bg-primary/90 transition-colors">
                        Log in
                    </button>
                </Form>
            </div>
        </div>
    )
}

export default Page
