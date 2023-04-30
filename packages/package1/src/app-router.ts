import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";
import { Database } from "./database";

type Context = {
  database: Database;
};

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const appRouter = t.router({
  getUser: t.procedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.database.getUser(input);
  }),
});

export type AppRouter = typeof appRouter;
