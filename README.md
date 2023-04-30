# trpc-bug-report

This repository is a sample monorepo using PNPM workspaces to reproduce a bug in the `@trpc/server` package.

See https://github.com/trpc/trpc/issues/4287

To re-create the bug, do the following:

```bash
pnpm install
(cd packages/package1 && pnpm build)
(cd packages/package2 && pnpm build)
```

You should get this TypeScript error:

```bash
src/app-router.ts:16:14 - error TS2742: The inferred type of 'appRouter' cannot be named without a reference to '~/../package1/node_modules/@trpc/server/dist'. This is likely not portable. A type annotation is necessary.

16 export const appRouter = t.router({
                ~~~~~~~~~

src/client.ts:6:14 - error TS2742: The inferred type of 'client' cannot be named without a reference to '~/../package1/node_modules/@trpc/server/dist'. This is likely not portable. A type annotation is necessary.

6 export const client = createTRPCProxyClient<AppRouter>({
               ~~~~~~


Found 2 errors in 2 files.

Errors  Files
     1  src/app-router.ts:16
     1  src/client.ts:6
```

## Workaround

If you edit `packages/package2/tsconfig.json` and remove this config:

```
    "paths": {
      "~/*": ["./*"]
    },
```

And then change the imports in all the files in packages/package2 to not use '~/', it will work.
