"use client"

import {memo} from "react";
import Image from "next/image";
import userIcon2 from "@/assets/icons/user-icon2.svg";
import StarRating from "@/app/ui/star-rating";

export default memo(function ReviewItem({ review }) {
    return(
        <div className="mb-[32px]">
            <div className="mb-[15px]">
                <div className="flex gap-x-[14px] w-full pr-[5px]">
                    <Image
                        src={userIcon2}
                        alt="user icon 2"
                        width="40"
                        height="40"
                    />
                    <div>
                        <div className="text-[14px] font-semibold leading-[150%] tracking-[0%] mb-[2px]">{review.author_title}</div>
                        <StarRating rating={review.review_rating}/>
                    </div>
                </div>
            </div>
            <div className="text-[rgb(75,_85,_99)] font-[Inter] text-[14px] font-normal leading-[150%]">{review.review_text}</div>
        </div>
    )
})