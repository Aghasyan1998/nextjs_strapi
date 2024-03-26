"use client"

import Image from "next/image";
import IconSystem from "@/assets/icons/Icon-system.svg";
import unionSvg from "@/assets/icons/Union.svg";
import {memo} from "react";
import ReviewItem from "@/app/ui/review-item";

export default memo(function ReviewsList({ selectedUser, onSelectUser }) {
    const { companyName, companyAddress, reviews } = selectedUser.attributes
    return(
        <div className="flex-1 h-full bg-white pd-[26px] pl-[24px] pr-[26px] py-[24px]">
            <div className="w-full flex justify-between items-center border-b-[1px] border-[solid] border-[rgb(156,163,175)] mb-[26px] pb-[26px]">
                <div className="w-full pr-[5px]">
                    <div className="w-full text-[rgb(17,_25,_40)] text-[18px] font-semibold leading-[150%] mb-[4px]">{companyName}</div>
                    <div className="flex gap-x-[6px] text-[rgb(17,_25,_40)] text-[14px] font-medium leading-[140%]">
                        <Image
                            src={IconSystem}
                            alt="icon"
                            width="16px"
                            height="16px"
                        />
                        {companyAddress}
                    </div>
                </div>
                <Image
                    className="cursor-pointer"
                    onClick={() => onSelectUser(null)}
                    src={unionSvg}
                    alt="logo"
                    width="18px"
                    height="18px"
                />
            </div>
            <div className="h-[calc(100%-80px)] overflow-y-auto beauty-scroll pr-[34px] pb-[32px]">
                {reviews.map(review => <ReviewItem  review={review}/>)}
            </div>
        </div>
    )
})