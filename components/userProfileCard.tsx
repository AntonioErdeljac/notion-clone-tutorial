import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Share as ShareIcon } from "lucide-react";
import { useState } from 'react';
import { toast } from "sonner";
import { shareDocument } from '@/convex/users';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

interface CardProps {
    user: Doc<"users">;
    docId: Id<"documents">;
}

const UserProfileCard = ({ user, docId }: CardProps) => {
    const [isSharing, setIsSharing] = useState(false);
    const shareDocument = useMutation(api.users.shareDocument);

    const onShare = () => {
        setIsSharing(true);
        const regex = /\|([^|]+)$/; // Matches the substring after the last pipe character

        const match = regex.exec(user.tokenIdentifier);
        if (match && match[1]) {
            const extractedString = match[1];
            const promise = shareDocument({
                id: docId,
                shareWithUserId: extractedString,
            })
                .finally(() => setIsSharing(false));
            promise.then((result) => {
                toast.promise(promise, {
                    loading: "Sharing...",
                    success: result,
                    error: "Failed",
                });
            });
        }
    };
    return (
        <Card className="flex items-center p-1 mt-2 space-x-4 w-full">
            {/* Round-shaped picture of the user on the left side */}
            <Avatar className='h-8 w-8 ml-4'>
                <AvatarImage src={user.picture} />
                <AvatarFallback>
                    {user?.name ? user.name[0] : ''}
                </AvatarFallback>
            </Avatar>

            {/* User information and share button on the right side */}
            <div className="flex flex-col flex-grow">
                {/* User name */}
                <div className="text-sm font-semibold">{user.name}</div>

                {/* User email */}
                <div className="text-gray-500 text-xs">{user.email}</div>

                {/* Share button */}
                {/* <Button className="mt-2" type="primary" size="small">
          Share
        </Button> */}

            </div>
            <Button
                onClick={onShare}
                disabled={isSharing}
                className="h-6 w-6 mr-4 p-0"
                variant={"ghost"}
            >
                <ShareIcon className="h-4 w-4" />
            </Button>
        </Card>
    );
};

export default UserProfileCard;
