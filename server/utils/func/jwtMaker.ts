import * as jwt from "jsonwebtoken"
export default function jwtMaker(props: { id: string }): string {
    return jwt.sign(props, process.env.JWT_SECRET as string);
}