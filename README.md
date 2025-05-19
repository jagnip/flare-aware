This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## DB


```bash
npx prisma generate
```

```bash
npx prisma migrate reset
```

```bash
npx prisma migrate dev --name {name}
```

```bash
npx prisma studio
```

```bash
npx tsx ./src/app/db/seed.ts 
```
