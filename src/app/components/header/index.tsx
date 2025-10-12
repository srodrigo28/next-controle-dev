"use client"

import Link from "next/link"
import { FiUser, FiLogOut, FiLoader, FiLock } from "react-icons/fi"
import { signIn, signOut, useSession } from 'next-auth/react'

export function Header() {
    const { status, data } = useSession();

    console.log(status);

    async function Login(){
        await signIn();
    }

    async function Logout(){
        await signOut()
    }


    return (
        <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-md">
            <div className="w-full flex items-center justify-between max-w-7xl mx-auto">
                <Link href="/">
                    <h1>
                        <span className="text-blue-500 font-bold text-2xl hover:tracking-widest duration-300">
                            Dev
                        </span> CONTROLE
                    </h1>
                </Link>

                { status === "loading" && (
                    <button>
                        <FiLoader size={26} color="" />
                    </button>
                )}

                { status === "unauthenticated" && (
                    <button onClick={Login}>
                        <FiLock size={26} color="" />
                    </button>
                )}

                 { status === "authenticated" && (
                    <div className="flex gap-2 items-center">
                        <Link href="/dashboard" className="hover:scale-105 cursor-pointer">
                            <FiUser size={26} className="text-blue-500" />
                        </Link>
                        <button onClick={Logout} className="hover:scale-105 cursor-pointer">
                            <FiLogOut size={26} className="text-red-500" />
                        </button>
                    </div>
                )}

                
            </div>
        </header>
    )
}