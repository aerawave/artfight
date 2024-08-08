This is a project made to test my ability and learn about the functions of both React and NextJS, as well as improve my abilities in web app development.

The project works as is like an [out-of-the-box NextJS app](./docs/next.md). View the document at [./docs/next.md](./docs/next.md) to see how to run it.

In order for it to function, a `.env.local` file must be present in the root of the directory the app is being run from. It must contain the following:

> -   DRIZZLE_PG_URL - a connection string URL to a PostgreSQL database to store data. [Neon](https://neon.tech/) has been used as a host thus far.
> -   REDIS_URI - a connection string URI to a Redis Store. [Aiven](https://aiven.io/) has been used as a host thus far.
> -   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY - publishable key for a [Clerk authentication](https://clerk.com/) instance.
> -   CLERK_SECRET_KEY - secret key for a system [Clerk authentication](https://clerk.com/) account on the previously mentioned instance.
> -   FILE_UPLOAD_MAX_SIZE - the max size, in bytes, of a file to be uploaded to the PostgreSQL/Redis databases. This has been arbitrarily to 10 MB (10000000) in my local instance.
