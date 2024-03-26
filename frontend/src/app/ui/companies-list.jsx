"use client"

import clsx from "clsx"
import {memo} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ListItem from "@/app/ui/list-item";

export default memo(function CompaniesList({
    selectedUser,
    onSelectUser,
    users,
    loadMoreUsers,
    hasMoreUsers
}) {
    return(
        <div
            className={clsx(
                'flex-1 max-h-full overflow-y-auto beauty-scroll mb-[50px]',
                {
                    'pr-[10px] mr-[10px]': selectedUser,
                    'pr-[33px] mr-[27px]': !selectedUser
                }
            )}
            id="scrollableDiv"
        >
            <InfiniteScroll
                dataLength={users.length}
                next={loadMoreUsers}
                hasMore={hasMoreUsers}
                loader={<h4>Loading users...</h4>}
                endMessage={<p>No more users</p>}
                scrollableTarget="scrollableDiv"
                scrollThreshold="100px"
            >
                {users.map(user => (
                    <ListItem
                        key={user.id}
                        user={user}
                        onSelectUser={() => onSelectUser(user)}
                        className={clsx(
                            {
                                'border-[rgb(28,_100,_242)]': selectedUser?.id === user.id,
                                'border-transparent': selectedUser?.id !== user.id
                            }
                        )}
                    />
                ))}
            </InfiniteScroll>
        </div>
    )
})