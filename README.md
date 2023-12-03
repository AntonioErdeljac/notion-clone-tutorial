<!-- Path+Filename: README.md -->
# Fullstack Notion Clone: Next.js 13, React, Convex, Tailwind | Full Course 2023

![Copy of Copy of Copy of Fullstack Twitter Clone (6)](https://github.com/AntonioErdeljac/notion-clone-tutorial/assets/23248726/66bcfca3-93bf-4aa4-950d-f98c020e1156)


This is a repository for Fullstack Notion Clone: Next.js 13, React, Convex, Tailwind | Full Course 2023

[VIDEO TUTORIAL](https://www.youtube.com/watch?v=ZbX4Ok9YX94)

Key Features:

- Real-time database  🔗 
- Notion-style editor 📝 
- Light and Dark mode 🌓
- Infinite children documents 🌲
- Trash can & soft delete 🗑️
- Authentication 🔐 
- File upload
- File deletion
- File replacement
- Icons for each document (changes in real-time) 🌠
- Expandable sidebar ➡️🔀⬅️
- Full mobile responsiveness 📱
- Publish your note to the web 🌐
- Fully collapsable sidebar ↕️
- Landing page 🛬
- Cover image of each document 🖼️
- Recover deleted files 🔄📄

### Prerequisites

**Node version 18.x.x**

### Cloning the repository

```shell
git clone https://github.com/AntonioErdeljac/notion-clone-tutorial.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
# Deployment used by `npx convex dev`
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

EDGE_STORE_ACCESS_KEY=
EDGE_STORE_SECRET_KEY=
```

### Setup Convex

```shell
npx convex dev

```

### Start the app

```shell
npm run dev
```

## Document Collaboration
- Added sharedWith and cursorPositions in schema
- Created shareDocument function in convex documents.ts
- Created share button with tabs for share and publish tabs in a new file share.tsx in components directory
- Publish functionality intact
- Corrected the implementation of clerk auth with convex.dev as it was not as per the implementation recommended by convex
  - list of users was not being stored in convex
  - users table added to schema with index of emails and tokenIdentifiers
  - created a user.ts file in convex folder that contains endpoint store that stores the user details in convex if not already present. This function is copied from https://docs.convex.dev/auth/database-auth, and no change made
  - created a useStoreUserEffects.ts file in hooks folder that contains the useStoreUserEffects hook from https://docs.convex.dev/auth/database-auth
  - Change made to the above hook as now instead of only returning userId, it also returns isLoading and isAuthenticated.
  - in navbar.tsx file instead of getting isLoading and isAuthenticated from useConvexAuth() now it is destructured from useStoreUserEffects()
  - All functionality is exactly the same and nothing is changed in workflow except for now the app stores users in users table
  - This step was necessary for implementing the collaboration functionality
- Input for searching added in share tab that searches for users based on their emails
- UserProfileCard Component created that displays profile image, name and email and a button to share
- Share unshare functionality added in one function
- searching in the input field renders list of matching users in PopoverContent area in the area below.
- Completed the sharedDocument function and moved it to user.ts
- changed update and getById functions to allow sharedWith users to also get and update the documents
- Created the getSharedSidebar function to give the list of documents that are shared with the logged in user. 
- Created the shared-document-list.tsx which is almost exactly as document-list.tsx but gets documents from
- Realtime update of title, icon and banner are working
- Realtime update of content is not working due to limitation of convex and blocknotes
- Improved the users.list function to not return the owner and user withwhich the document is already shared
- Created Facepile components of shared with users