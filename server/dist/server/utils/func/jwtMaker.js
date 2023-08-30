import jsonwebtoken from 'jsonwebtoken';
export default function jwtMaker(props) {
    const authtoken = jsonwebtoken.sign(props, process.env.JWT_SECRET);
    return authtoken;
}
//# sourceMappingURL=jwtMaker.js.map