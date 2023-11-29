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
- Created sharedWith function in convex documents.ts
- Created share button with tabs for share and publish tabs
- Publish functionality intact