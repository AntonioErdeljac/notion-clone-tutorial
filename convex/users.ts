import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Insert or update the user in a Convex table then return the document's ID.
 *
 * The `UserIdentity.tokenIdentifier` string is a stable and unique value we use
 * to look up identities.
 *
 * Keep in mind that `UserIdentity` has a number of optional fields, the
 * presence of which depends on the identity provider chosen. It's up to the
 * application developer to determine which ones are available and to decide
 * which of those need to be persisted. For Clerk the fields are determined
 * by the JWT token's Claims config.
 */
export const store = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called storeUser without authentication present");
        }

        // Check if we've already stored this identity before.
        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier)
            )
            .unique();
        if (user !== null) {
            // If we've seen this identity before but the name has changed, patch the value.
            if (user.name !== identity.name) {
                await ctx.db.patch(user._id, { name: identity.name });
            }
            return user._id;
        }
        // If it's a new identity, create a new `User`.
        return await ctx.db.insert("users", {
            name: identity.name!,
            email: identity.email!,
            tokenIdentifier: identity.tokenIdentifier,
        });
    },
});

export const list = query({
    // args need to accept a parameter of `email`
    args: { email: v.string(), id: v.id("documents") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthenticated");
        }
        console.log(args.id)
        const userId = identity.subject;
        const existingDocument = await ctx.db.get(args.id);

        if (!existingDocument) {
            throw new Error("Not found");
        }

        if (existingDocument.userId !== userId) {
            throw new Error("Unauthorized");
        }
        const Users = await ctx.db
            .query("users")
            .collect();
        const filteredUsers = Users.filter(user => user.email.includes(args.email));
        return filteredUsers;
    },
});

export const shareDocument = mutation({
    args: { id: v.id("documents"), shareWithUserId: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthenticated");
        }
        const userId = identity.subject;
        const existingDocument = await ctx.db.get(args.id);

        if (!existingDocument) {
            throw new Error("Not found");
        }

        if (existingDocument.userId !== userId) {
            throw new Error("Unauthorized");
        }

        const index = existingDocument.sharedWith?.indexOf(args.shareWithUserId);

        if (index && index > -1) {
            // User ID is in the array, so remove it.
            existingDocument.sharedWith?.splice(index, 1);
        } else {
            // User ID is not in the array, so add it.
            existingDocument.sharedWith?.push(args.shareWithUserId);
        }

        // Use db.patch to update the sharedWith field of the document.
        const document = await ctx.db.patch(args.id, { sharedWith: existingDocument.sharedWith });

        return document;
    }
})

