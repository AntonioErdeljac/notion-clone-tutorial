import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import Image from "next/image"

interface FacepileProps {
    sharedWith: string[]
}

export const Facepile = ({ sharedWith }: FacepileProps) => {
    // console.log(sharedWith)
    const MAX_DISPLAY_USERS = 2;

    const displayUsers = sharedWith.slice(0, MAX_DISPLAY_USERS);
    const remainingUsers = sharedWith.slice(MAX_DISPLAY_USERS);

    return (
        <div className="flex">
            <div className="flex -space-x-6">
                {displayUsers.length > 0 && displayUsers.map((user) => {
                    const userData = useQuery(api.users.getUserByClerkId, {
                        clerkId: user
                    })
                    console.log(userData)
                    return (
                        <Avatar
                            key={user}
                            className='inline-block w-10 h-10 rounded-full border-4 border-white-500 transition duration-300 hover:-translate-y-2'
                        >
                            <AvatarImage src={userData?.picture ? userData.picture : "/Slide1.png"} />
                            <AvatarFallback>
                                {userData?.name ? userData.name[0] : ''}
                            </AvatarFallback>
                        </Avatar>
                    )
                })}
            </div>
            {remainingUsers.length > 0 && (
                <div className="flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">
                        +{remainingUsers.length} users
                    </span>
                </div>
            )}
        </div>
    )
}