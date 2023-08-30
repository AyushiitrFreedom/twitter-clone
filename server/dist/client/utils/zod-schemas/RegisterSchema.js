const { z } = require("zod");
const RegisterSchema = z.object({
    username: z.string().nonempty("Username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, 'Password must be at least 8 characters.')
        .refine((value) => /[A-Z]/.test(value), 'Password must contain at least one capital letter.')
        .refine((value) => /[a-z]/.test(value), 'Password must contain at least one small letter.')
        .refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\-=/\\|]/.test(value), 'Password must contain at least one special character.')
        .refine((value) => /\d/.test(value), 'Password must contain at least one number.'),
    isSeller: z.boolean(),
});
export default RegisterSchema;
//# sourceMappingURL=RegisterSchema.js.map