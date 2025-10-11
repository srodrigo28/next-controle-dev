import Link from "next/link"
import { FiUser, FiLogOut } from "react-icons/fi"

export function Header() {
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

                <div className="flex gap-2 items-center">
                    <Link href="/dashboard" className="hover:scale-105 cursor-pointer">
                        <FiUser size={26} className="text-blue-500" />
                    </Link>
                    <button className="hover:scale-105 cursor-pointer">
                        <FiLogOut size={26} className="text-red-500" />
                    </button>
                </div>
            </div>
        </header>
    )
}