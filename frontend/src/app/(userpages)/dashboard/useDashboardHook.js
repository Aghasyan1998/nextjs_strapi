"use client"

import {useCallback, useEffect, useState} from "react";
import {getUsers} from "@/app/lib/auth-actions";

export default function useDashboardHook({ initialUsersData }) {

    const { meta, data } = initialUsersData

    const [height, setHeight] = useState(0)
    const [users, setUsers] = useState(data)
    const [hasMoreUsers, setHasMoreUsers] = useState(true)
    const [selectedUser, setSelectedUser] = useState(null)

    useEffect(() => {
        if (users.length === meta.pagination.total) {
            setHasMoreUsers(false)
        }
    }, [users.length, meta]);

    useEffect(() => {
        const handleResize = () => {
            setHeight(`${window.innerHeight - 96}px`)
        };

        handleResize()

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const loadMoreUsers = useCallback(async () => {
        if (!hasMoreUsers) return

        const nextPage = Math.ceil(users.length / PAGE_SIZE) + 1;
        const moreUsers = await getUsers(PAGE_SIZE, nextPage)

        const { data } = moreUsers;

        setUsers(prevUsers => [...prevUsers, ...data])
    }, [setUsers, users.length])


    return {
        selectedUser,
        onSelectUser: setSelectedUser,
        users,
        loadMoreUsers,
        hasMoreUsers,
        height
    }
}