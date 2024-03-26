"use client"

import userIcon2 from "@/assets/icons/user-icon2.svg";
import vectorRight from "@/assets/icons/Vector_right.svg";
import Image from "next/image";
import {memo} from "react";

export default memo(function ListItem({ user, onSelectUser, className }) {
    const {
        firstName = 'Name',
        lastName = 'Surname'
    } = user.attributes

    return(
        <div
            className={`mb-[16px] w-full p-[10px] pr-[20px] bg-[#fff] rounded-[6px] flex justify-between items-center border-[2px] transition ease-in-out duration-300 cursor-pointer hover:bg-gray-300 ${className}`}
            onClick={onSelectUser}
        >
            <div className="flex gap-x-[18px] w-full pr-[5px]">
                <Image
                    src={userIcon2}
                    alt="user icon 2"
                    width="50"
                    height="50"
                />
                <div className="flex-1 overflow-hidden">
                    <div className="text-[16px] font-semibold leading-[150%] overflow-ellipsis whitespace-nowrap overflow-hidden">{firstName} {lastName}</div>
                    <div className="text-[rgb(75,_85,_99)] font-[Inter] text-[12px] font-medium leading-[150%]">name@gmail.com</div>
                </div>
            </div>

            <div className="flex-none">
                <Image
                    src={vectorRight}
                    alt="vector right"
                    width="10"
                    height="18"
                />
            </div>
        </div>
    )
})