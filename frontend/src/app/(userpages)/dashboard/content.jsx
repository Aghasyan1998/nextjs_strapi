"use client"

import CompaniesList from "@/app/ui/companies-list";
import useDashboardHook from "@/app/(userpages)/dashboard/useDashboardHook";
import ReviewsList from "@/app/ui/reviews-list";


export default function Content({ initialUsersData = [] }) {
    const {
        selectedUser,
        onSelectUser,
        users,
        loadMoreUsers,
        hasMoreUsers,
        height
    } = useDashboardHook({ initialUsersData })

    return(
        <div className="flex flex-row w-full pt-[20px]" style={{ height }}>
            <CompaniesList
                selectedUser={selectedUser}
                onSelectUser={onSelectUser}
                users={users}
                loadMoreUser={loadMoreUsers}
                hasMoreUsers={hasMoreUsers}
            />
            {selectedUser ? (
                <ReviewsList selectedUser={selectedUser} onSelectUser={onSelectUser}/>
            ) : null}
        </div>
    )
}