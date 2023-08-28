import { initTRPC } from '@trpc/server';
import superjson from "superjson";
const t = initTRPC.context().create({ transformer: superjson });
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
export const router = t.router;
//# sourceMappingURL=trpc.js.map