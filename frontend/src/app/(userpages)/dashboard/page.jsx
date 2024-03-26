import Content from "./content";
import {getUsers} from "@/app/lib/auth-actions";

const PAGE_SIZE = 10

export default async function DashboardPage() {
    const usersData = await getUsers(PAGE_SIZE, 1)

    return(
        <div className="bg-[rgb(249,_250,_251)] pl-[64px]">
            <Content initialUsersData={usersData.data}/>
        </div>
    )
}