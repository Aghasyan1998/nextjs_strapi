import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/options";

export async function fetcherStrapi({ url, method = 'GET', body = null, auth = false }) {
    try {
        const headers = {
            "Content-Type": 'application/json',
            "Cache": "no-cache"
        }

        if (auth) {
            const session = await getServerSession(authOptions)
            headers["Authorization"] = `Bearer ${session.jwt}`
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error?.message || "An error occurred");
        }

        return { success: true, data };
    } catch (e) {
        return { success: false, message: e.message }
    }
}