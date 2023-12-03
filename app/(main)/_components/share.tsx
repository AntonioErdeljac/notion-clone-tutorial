// Path+Filename: app\(main)\_components\share.tsx
"use client";

import { useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import { Check, Copy, Globe, Share as ShareIcon } from "lucide-react";

import { Doc } from "@/convex/_generated/dataModel";
import {
    PopoverTrigger,
    Popover,
    PopoverContent
} from "@/components/ui/popover"
import { useOrigin } from "@/hooks/use-origin";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator"
import UserProfileCard from "@/components/userProfileCard";

interface ShareProps {
    initialData: Doc<"documents">
};
type User = Doc<"users">;

export const Share = ({
    initialData
}: ShareProps) => {
    const origin = useOrigin();
    const update = useMutation(api.documents.update);
    const [copied, setCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [shareUsers, setShareUsers] = useState<User[]>([])
    const url = `${origin}/preview/${initialData._id}`;
    const [email, setEmail] = useState("")
    const users = useQuery(api.users.list, { email, id: initialData._id }) ?? [];

    const onChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setEmail(event.target.value);
        if (users.length > 0) {
            setShareUsers(users)
        } else {
            setShareUsers([])
        }
    };

    const onPublish = () => {
        setIsSubmitting(true);

        const promise = update({
            id: initialData._id,
            isPublished: true,
        })
            .finally(() => setIsSubmitting(false));

        toast.promise(promise, {
            loading: "Publishing...",
            success: "Note published",
            error: "Failed to publish note.",
        });
    };

    const onUnpublish = () => {
        setIsSubmitting(true);

        const promise = update({
            id: initialData._id,
            isPublished: false,
        })
            .finally(() => setIsSubmitting(false));

        toast.promise(promise, {
            loading: "Unpublishing...",
            success: "Note unpublished",
            error: "Failed to unpublish note.",
        });
    };

    const onCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size="sm" variant="ghost">
                    Share
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-80"
                align="end"
                alignOffset={8}
                forceMount
            >
                <Tabs defaultValue="share" className="w-full">
                    <TabsList className="w-full flex justify-between  items-center text-center">
                        <TabsTrigger value="share" className="text-center w-full mx-2">Share</TabsTrigger>
                        <TabsTrigger value="publish" className="text-center w-full mx-2">Publish</TabsTrigger>
                    </TabsList>
                    <TabsContent value="share">
                        <Separator className="my-4" />
                        <div className="flex items-center">
                            <Input
                                className="flex-grow mr-4"
                                onChange={onChange}
                                value={email}
                            // className="h-7 px-2 focus-visible:ring-transparent"

                            />
                        </div>
                        <div className="flex flex-col items-center mt-4">
                            {users.length > 0 && users.map((user) => (<>
                                <UserProfileCard user={user} docId={initialData._id} />
                            </>
                            ))}
                        </div>
                        <div className="flex flex-col mt-4">
                        </div>
                    </TabsContent>
                    <TabsContent value="publish">
                        <Separator className="my-4" />
                        {initialData.isPublished ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-x-2">
                                    <Globe className="text-sky-500 animate-pulse h-4 w-4" />
                                    <p className="text-xs font-medium text-sky-500">
                                        This note is live on web.
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                                        value={url}
                                        disabled
                                    />
                                    <Button
                                        onClick={onCopy}
                                        disabled={copied}
                                        className="h-8 rounded-l-none"
                                    >
                                        {copied ? (
                                            <Check className="h-4 w-4" />
                                        ) : (
                                            <Copy className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                                <Button
                                    size="sm"
                                    className="w-full text-xs"
                                    disabled={isSubmitting}
                                    onClick={onUnpublish}
                                >
                                    Unpublish
                                </Button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center">
                                <Globe
                                    className="h-8 w-8 text-muted-foreground mb-2"
                                />
                                <p className="text-sm font-medium mb-2">
                                    Publish this note
                                </p>
                                <span className="text-xs text-muted-foreground mb-4">
                                    Share your work with others.
                                </span>
                                <Button
                                    disabled={isSubmitting}
                                    onClick={onPublish}
                                    className="w-full text-xs"
                                    size="sm"
                                >
                                    Publish
                                </Button>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>

            </PopoverContent>
        </Popover>
    )
}