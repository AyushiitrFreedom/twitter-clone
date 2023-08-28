import * as jwt from "jsonwebtoken";
export default function jwtMaker(props) {
    return jwt.sign(props, process.env.JWT_SECRET);
}
//# sourceMappingURL=jwtMaker.js.map