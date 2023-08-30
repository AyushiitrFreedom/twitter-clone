import { router } from "../trpc";
import { userProcedure } from '../middlewares/protectedroute';
export const homeRouter = router({
    home: userProcedure.query(async (opts) => {
        return opts.ctx.req.user;
    })
});
//# sourceMappingURL=home.js.map