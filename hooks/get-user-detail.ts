import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

const useSharedWithDetails = (sharedWith: string[]) => {
    return sharedWith.map((user) => {
        const userData = useQuery(api.users.getUserByClerkId, {
            clerkId: user
        });
        return userData;
    });
};

export default useSharedWithDetails;