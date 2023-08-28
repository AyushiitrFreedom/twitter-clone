import { router } from "../trpc";
import { userProcedure } from '../middlewares/protectedroute';
export const homeRouter = router({
    home: userProcedure.query(async (opts) => {
        console.log("asli session");
        console.log(opts.ctx.req.session);
        console.log("protected route");
    })
});
//# sourceMappingURL=home.js.map