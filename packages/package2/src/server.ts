import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "~/src/app-router";
import { Database } from "~/src/database";
import { client as userClient } from "package1";

createHTTPServer({
  router: appRouter,
  createContext() {
    return {
      database: new Database(),
      userClient: userClient,
    };
  },
}).listen(36078);

console.log("TRPC server listening on http://localhost:36078");
