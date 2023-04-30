import superjson from "superjson";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "~/src/app-router";

export const client = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: "http://localhost:36077/trpc",
    }),
  ],
});
