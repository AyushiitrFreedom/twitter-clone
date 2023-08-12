import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import { createContext } from './context';
type Context = inferAsyncReturnType<typeof createContext>;
const t = initTRPC.context<Context>().create();
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
export const router = t.router;