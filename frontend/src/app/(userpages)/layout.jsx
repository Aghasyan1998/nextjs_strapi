import {authOptions} from "@/app/api/auth/[...nextauth]/options";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";

export default async function DashboardLayout({ children }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect('/login');
    }

    return(
        <div>{children}</div>
    )
}