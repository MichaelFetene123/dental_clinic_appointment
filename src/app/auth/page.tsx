import React from 'react'
import Image from 'next/image'
import { BiArrowBack } from 'react-icons/bi'
import Link from 'next/link'

const Page = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="w-[350px] h-[500px] bg-white shadow-lg rounded-[10px] p-5">
                <Link href='/' className='flex items-center gap-2'>
                    <BiArrowBack />
                    <p>Home Page</p>
                </Link>
                <p className='text-center font-lucida m-[10px_0_30px_0] text-[28px] font-extrabold'>Welcome back</p>
                <div className="flex flex-col items-center justify-center mb-4 gap-3">
                    <Image src="/images/logo/logo-1.png" alt='logo' width={100} height={100} />
                    <h1 className='text-3xl font-boruna text-[#DD9639]'>Classic Dental Clinic</h1>
                </div>

                <form className="w-full flex flex-col gap-[18px] mb-[15px]">
                    <input 
                        type="email or phone number" 
                        className="rounded-[10px] border border-[#c0c0c0] outline-none p-3" 
                        placeholder="Email or phone number" 
                    />
                    <input 
                        type="password" 
                        className="rounded-[10px] border border-[#c0c0c0] outline-none p-3" 
                        placeholder="Password" 
                    />
                    <p className="underline m-0 text-right text-[#747474]">
                        <span className="cursor-pointer font-['Lucida_Sans'] text-[9px] font-bold hover:text-black">Forgot Password?</span>
                    </p>
                    <button className="p-[10px_15px] font-['Lucida_Sans'] rounded-[20px] border-0 outline-none bg-teal-600 text-white cursor-pointer shadow-md active:shadow-none">
                        Log in
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Page