import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";
import { Database } from "~/src/database";
import { client as userClient } from "package1";

type Context = {
  database: Database;
  userClient: typeof userClient;
};

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const appRouter = t.router({
  doSomething: t.procedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = input;
      const user = await ctx.userClient.getUser.query(userId);
      return ctx.database.doSomething(user);
    }),
});

export type AppRouter = typeof appRouter;
