"use client"

import Image from "next/image";
import brandLogo from "@/assets/brand.png"
import Link from "next/link";
import {useSession} from "next-auth/react";
import MenuDropdown from "@/app/ui/menu-dropdown";

export default function Navbar() {
    const session = useSession()

    return(
        <nav className="px-[64px] py-[24px]">
            <div className="flex justify-between items-center h-[48px]">
                <Link href="/">
                    <Image
                        src={brandLogo}
                        alt="logo"
                        width="139px"
                    />
                </Link>

                <MenuDropdown session={session}/>
            </div>
        </nav>
    )
}