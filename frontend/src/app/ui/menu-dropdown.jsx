"use client"

import Image from "next/image";
import userIcon from "@/assets/icons/user-icon.svg"
import userIcon2 from "@/assets/icons/user-icon2.svg"
import {TEDropdown, TEDropdownMenu, TEDropdownToggle} from "tw-elements-react";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import {memo} from "react";

export default memo(function MenuDropdown({ session }) {
    const { data, status } = session
    if (status === 'loading') {
        return null
    }
    if (!data) {
        return (
            <div>
                <Link
                    href="/login"
                    data-twe-ripple-init
                    data-twe-ripple-color="dark"
                    className="inline-block rounded bg-transparent px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:bg-neutral-100 hover:text-primary-accent-300 focus:text-primary-accent-300 focus:outline-none focus:ring-0 active:text-primary-700 motion-reduce:transition-none dark:text-secondary dark:hover:bg-secondary-900"
                >
                    Sign in
                </Link>
                <Link
                    href="/register"
                    data-twe-ripple-init
                    data-twe-ripple-color="dark"
                    className="inline-block rounded bg-transparent px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:bg-neutral-100 hover:text-primary-accent-300 focus:text-primary-accent-300 focus:outline-none focus:ring-0 active:text-primary-700 motion-reduce:transition-none dark:text-secondary dark:hover:bg-secondary-900"
                >
                    Sign up
                </Link>
            </div>
        )
    }

    return(
        <TEDropdown className="flex justify-center">
            <TEDropdownToggle className="rounded-[50%] w-[48px] h-[48px] bg-[rgb(249,_250,_251)] flex justify-center items-center">
                <Image
                    src={userIcon}
                    alt="user icon"
                />
            </TEDropdownToggle>

            <TEDropdownMenu
                className="rounded-[12px] [box-shadow:0px_11px_38.6px_0px_rgb(220,_220,_220)] px-[33px] py-[40px]"
            >
                <div className="flex flex-col items-center min-w-[155px]">
                    <Image
                        src={userIcon2}
                        alt="user icon 2"
                        width="88"
                        height="88"
                    />
                    <div className="mt-[18px] text-[18px] font-semibold leading-[150%] text-center">Hi there</div>
                    <div className="mt-[2px] text-[rgb(75,_85,_99)] text-[12px] font-medium leading-[150%] text-center">{data.user.email}</div>
                    <div className="mt-[16px] h-[1px] w-full bg-[rgb(229,231,235)]"></div>
                    <Link
                        href="/details"
                        className="mt-[16px] text-[rgb(28,_100,_242)] text-[14px] font-semibold leading-[150%] tracking-[0%] [text-decoration-line:underline]"
                    >See Details</Link>
                    <Link
                        href="/dashboard"
                        className="mt-[16px] text-[rgb(28,_100,_242)] text-[14px] font-semibold leading-[150%] tracking-[0%] [text-decoration-line:underline]"
                    >See dashboard</Link>
                    <button
                        onClick={() => signOut()}
                        type="button"
                        data-twe-ripple-init
                        data-twe-ripple-color="dark"
                        className="inline-block rounded bg-transparent px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:bg-neutral-100 hover:text-primary-accent-300 focus:text-primary-accent-300 focus:outline-none focus:ring-0 active:text-primary-700 motion-reduce:transition-none dark:text-secondary dark:hover:bg-secondary-900">
                        Sign out
                    </button>
                </div>
            </TEDropdownMenu>
        </TEDropdown>
    )
})