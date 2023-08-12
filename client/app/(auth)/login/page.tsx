"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isDirty, isValid, z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { Separator } from "@/components/ui/separator";
import { DevTool } from "@hookform/devtools";

type FormValues = {
    username: string;
    password: string;
};

const schema = z.object({
    username: z.string().nonempty("Username is required"),
    password: z.string().min(8, 'Password must be at least 8 characters.')
        .refine((value) => /[A-Z]/.test(value), 'Password must contain at least one capital letter.')
        .refine((value) => /[a-z]/.test(value), 'Password must contain at least one small letter.')
        .refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\-=/\\|]/.test(value), 'Password must contain at least one special character.')
        .refine((value) => /\d/.test(value), 'Password must contain at least one number.')
});

const ZodYouTubeForm = () => {
    const form = useForm<FormValues>({
        defaultValues: { //in default values , you can also put here something from an api
            username: "",
            password: '',
        },
        resolver: zodResolver(schema),
        mode: "onTouched" // this causes validaiton when u type , there are option to choose 
        //you can also do async validaiton
    });

    const { register, handleSubmit, formState, control } = form;

    //when we are not using zod we use register to register different form feilds 
    // const name = register("username") , now the name is an object with various variables in it lets destructre it
    // const { ref, onChange, onBlur, value } = name;
    //you can add these as input props like this <input id="username" {...register("username")} (if you are doing this you do not need to define it like this const name = register("username") above  /> or you can add them individually like this  <input id="username" ref={ref} onChange={onChange} onBlur={onBlur}  /> this enables react hook form to track the input feilds and validate them

    //form also has a watch object which helps us to watch any feild 

    //there are two methods getvalues and setvalues which can get you values of the specified feilds when some specific action is performed such as clicking 
    const { errors, isDirty, isValid } = formState; // there are also other values we can destructure like isSumbiting , isSumbited , isSumbitSuccessfull , sumbitcount

    //  you can also reset the form with reset funciton , ---> useeffect ke andr , if isSumbitsuccessfull then reset , and watch for [insumbitsuccessfull]

    const onSubmit = (data: FormValues) => {
        console.log(data);

        //you can console log this to see what is the structure of the data being recieved from the form
        //also suppose the api accept the data in some other form or structure then also you can modify data here before sending it to the api with nested objects you can group some properties checkout video 13 , insted of nested objects you can also use arrays to group some properties video 14

        //sometimes you do not how many feilds in array are required , for example in a website we have an option to add as many phone numbers as the user wants by clicking a plus sign for thisw watch video 15
    };
    // you can also disable some feilds , for example disable = "true" or disable = watch("username")==="" ---> in this code if the username is empty then the password feild will be disabled
    return (
        <div className="border-solid border-4 flex flex-col h-screen justify-center items-center">

            <Image src="/icon/Twitter-Logo.png" alt="twitter logo" width={100} height={100} />
            <div className="my-8 text-4xl font-bold">Sign in To Twitter</div>
            <Button className="rounded-full bg-white text-black border-solid  border-2 my-4"><div className="flex justify center">
                <Image className="pr-2" src={'/icon/Google-Logo.png'} alt="Google Logo" width={30} height={30} />
                <div className="text-black">Sign in With Google</div>
            </div></Button>
            <Button className="rounded-full bg-white text-black border-solid  border-2 "><div className="flex justify center">
                <Image className="pr-2" src={'/icon/Github-Logo.png'} alt="Github Logo" width={30} height={30} />
                <div className="text-black">Sign in With Github</div>
            </div></Button>
            <Separator className="w-[40vh] mt-6" />

            <form onSubmit={handleSubmit(onSubmit)} noValidate> {/* along with onSumbit , handle sumbit also has a function to handle errors which we get while sumbiting the form */}
                <div className="flex flex-col items-center ">
                    <div className="form-control ">
                        <Input type="text" id="username" placeholder="username , email or phone" className="my-4"{...register("username")} />
                        <p className="error">{errors.username?.message}</p>
                    </div>
                    <div className="form-control">
                        <Input type="text" id="password" placeholder="password" {...register("password")} />
                        <p className="error">{errors.password?.message}</p>
                    </div>

                    <Button className="my-4" disabled={!isDirty || !isValid} >Submit</Button>
                    {/* here we are using isDirty and isValid to disable the button if the form is not dirty or not valid */}
                </div>
            </form>

            <DevTool control={control} />
            <Button className="rounded-full bg-white text-black border-solid  border-2 px-8 ">
                <div className="text-black">forgot password</div>
            </Button>
            <div className="mt-4">Don&apos;t have an acount? <span className="text-blue-700">Singup</span></div>
        </div>
        // devtool to visualize react hook form , control is a object destructured from useForm hook and these track the state without rerendering the whole conmpnent while if we have used state the whole componenet would have been re rendered


    );
};

export default ZodYouTubeForm;


//React form hook notes 

