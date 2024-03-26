"use client"

import Image from "next/image";
import iconGoogle from "@/assets/icons/icon-google.svg";

export default function StarRating({ rating }){
    const totalStars = 5;

    return (
        <div className="flex leading-[18px] text-[23px]">
            <Image
                src={iconGoogle}
                alt="icon"
                className="mr-[6px]"
            />
            {Array.from({ length: totalStars }, (_, index) => (
                <span key={index} className={index < rating ? 'text-[#1F2A37]' : 'text-[#E5E7EB]'}>
                    {index < rating ? '★' : '☆'}
                </span>
            ))}
        </div>
    );
};