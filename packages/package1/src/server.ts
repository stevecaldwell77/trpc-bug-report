import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./app-router";
import { Database } from "./database";

createHTTPServer({
  router: appRouter,
  createContext() {
    return {
      database: new Database(),
    };
  },
}).listen(36077);

console.log("TRPC server listening on http://localhost:36077");
