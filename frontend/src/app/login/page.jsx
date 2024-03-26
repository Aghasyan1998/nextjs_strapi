"use client"

import {TEInput, TERipple} from "tw-elements-react";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {useCallback, useEffect, useState} from "react";

export default function LoginPage() {
    const [error, setError] = useState(null);

    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session.status === 'authenticated') {
            router.push('/details');
        }
    }, [router, session.status]);

    const onSubmit = useCallback(
        async event => {
            event.preventDefault();

            const formData = new FormData(event.currentTarget);

            const username = formData.get('username');
            const password = formData.get('password');
            await signIn('credentials', { username, password, redirect: false, callbackUrl: '/details' }).then(value => {
                if (value?.error) {
                    setError(value?.error);
                } else {
                    router.push(`/details`);
                }
            });
        },
        [router],
    );

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
                        <form onSubmit={onSubmit}>
                            <TEInput
                                type="text"
                                label="Username"
                                name="username"
                                size="lg"
                                className="mb-8"
                            ></TEInput>

                            <TEInput
                                type="password"
                                label="Password"
                                name="password"
                                className="mb-8"
                                size="lg"
                            ></TEInput>

                            <div className="text-center lg:text-left">
                                <TERipple rippleColor="light">
                                    <button
                                        type="submit"
                                        className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    >
                                        Log in
                                    </button>
                                </TERipple>
                                {error && <p className="text-red-500 text-sm pt-2 text-center">{error}</p>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}