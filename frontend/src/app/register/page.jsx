"use client"

import { useFormState, useFormStatus } from 'react-dom';
import {TEInput, TERipple} from "tw-elements-react";
import {signUp} from "@/app/lib/auth-actions";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

const initialState = {
    message: null,
    success: null,
};

export default function Register() {
    const router = useRouter();
    const { pending } = useFormStatus();
    const [formState, dispatch] = useFormState(signUp, initialState);

    useEffect(() => {
        if (formState.success) {
            router.push('/login');
        }
    }, [router, formState.success]);

    return(
        <section className="h-screen">
            <div className="h-full">

                <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                    <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                        <img
                            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="w-full"
                            alt="Sample image"
                        />
                    </div>

                    {/* <!-- Right column container --> */}
                    <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 pr-[50px]">
                        <form action={dispatch}>
                            <TEInput
                                type="text"
                                label="Username"
                                name="username"
                                size="lg"
                                className="mb-8"
                                required
                            ></TEInput>

                            <TEInput
                                type="email"
                                label="Email"
                                name="email"
                                size="lg"
                                className="mb-8"
                                required
                            ></TEInput>

                            <TEInput
                                type="text"
                                label="Fist name"
                                name="firstName"
                                className="mb-8"
                                size="lg"
                            ></TEInput>

                            <TEInput
                                type="text"
                                label="Last name"
                                name="lastName"
                                className="mb-8"
                                size="lg"
                            ></TEInput>

                            <TEInput
                                type="password"
                                label="Password"
                                name="password"
                                className="mb-8"
                                size="lg"
                                required
                            ></TEInput>

                            <div className="text-center lg:text-left">
                                <TERipple rippleColor="light">
                                    <button
                                        disabled={pending}
                                        type="submit"
                                        className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    >
                                        Sign up
                                    </button>
                                </TERipple>
                                {!formState.success && formState.message && <p className="text-red-500 text-sm pt-2 text-center">{formState.message}</p>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}