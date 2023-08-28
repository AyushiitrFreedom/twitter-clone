import bcryptjs from "bcryptjs";
export default async function GeneratePassword(pass) {
    const salt = await bcryptjs.genSaltSync(10);
    const secPass = await bcryptjs.hash(pass, salt);
    return secPass;
}
//# sourceMappingURL=passwordGenerator.js.map