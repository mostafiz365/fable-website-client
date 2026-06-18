'use client'
import { authClient } from "@/lib/auth-client";
import { Button, Card, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const SignInPage = () => {
    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,
        });
        
        console.log({ data, error });
        if (data) {
            // toast.success('Login Successfully!');
            redirect('/');
        }
        if (error) {
            // toast.error(error.message);
            alert(error.message);
        }
    };

    // const handleGoogle = async () => {
    //     await authClient.signIn.social({
    //         provider: "google",
    //     });
    // };

    return (
        <div className="w-full min-h-[calc(100vh-64px)] bg-[#fbf4f2] flex items-center justify-center py-12 px-4 relative overflow-hidden">
            
            {/* ব্যাকগ্রাউন্ডের নান্দনিক অর্গানিক ব্লার শেপ (Fable থিম ম্যাচিং) */}
            <div className="absolute w-[400px] h-[400px] bg-[#ecd5cf]/50 rounded-full blur-3xl -top-20 -left-20 pointer-events-none" />
            <div className="absolute w-[350px] h-[350px] bg-[#b36b6b]/10 rounded-full blur-3xl -bottom-20 -right-20 pointer-events-none" />
            
            <div className="w-full max-w-lg z-10">
                {/* ব্র্যান্ডের টাইটেল ও সাবটাইটেল */}
                <div className="text-center pb-6">
                    <h2 className="text-4xl font-serif font-bold text-[#2c3e50] tracking-wide">
                        Welcome Back to <span className="text-[#b36b6b]">Fable</span>
                    </h2>
                    <p className="text-sm text-gray-500 mt-1 font-medium">
                        Log in to your account to continue sharing and reading
                    </p>
                </div>
                
                {/* মডার্ন রাউন্ডেড এবং শ্যাডো যুক্ত কার্ড */}
                <Card className="border border-[#ecd5cf]/60 bg-white/90 backdrop-blur-md rounded-2xl p-8 md:p-10 shadow-xl shadow-gray-200/50">
                    <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
                        
                        {/* Email Input */}
                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            className="w-full"
                            validate={(value) => {
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return "Please enter a valid email address";
                                }
                                return null;
                            }}
                        >
                            <Label className="text-[#2c3e50] font-medium text-sm mb-1">Email</Label>
                            <Input 
                                placeholder="john@example.com" 
                                classNames={{
                                    inputWrapper: "bg-gray-50 border border-gray-200 focus-within:!border-[#b36b6b] rounded-xl h-11"
                                }}
                            />
                            <FieldError className="text-danger text-xs mt-1" />
                        </TextField>

                        {/* Password Input */}
                        <TextField
                            isRequired
                            name="password"
                            type="password"
                            className="w-full"
                        >
                            <div className="flex justify-between items-center mb-1">
                                <Label className="text-[#2c3e50] font-medium text-sm">Password</Label>
                                <Link href="#" className="text-xs text-[#b36b6b] hover:underline font-medium">
                                    Forgot Password?
                                </Link>
                            </div>
                            <Input 
                                placeholder="••••••••" 
                                classNames={{
                                    inputWrapper: "bg-gray-50 border border-gray-200 focus-within:!border-[#b36b6b] rounded-xl h-11"
                                }}
                            />
                            <FieldError className="text-danger text-xs mt-1" />
                        </TextField>

                        {/* Submit Button */}
                        <div className="flex gap-2 mt-2">
                            <Button 
                                type="submit" 
                                className="rounded-xl bg-[#b36b6b] hover:bg-[#a05a5a] text-white w-full h-11 font-medium shadow-md shadow-[#b36b6b]/10 transition-all"
                            >
                                Sign In
                            </Button>
                        </div>

                        {/* Divider Line */}
                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-gray-200"></div>
                            <span className="flex-shrink mx-4 text-gray-400 text-xs font-medium uppercase tracking-wider">Or Sign In With</span>
                            <div className="flex-grow border-t border-gray-200"></div>
                        </div>
                    </Form>

                    {/* Google Sign In Button */}
                    <Button 
                        // onClick={handleGoogle} 
                        variant="bordered" 
                        className="rounded-xl w-full h-11 border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium transition-colors mt-1"
                    >
                        <FcGoogle className="text-xl mr-1" /> Sign In with Google
                    </Button>

                    {/* Signup Redirect Link */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Do not have an account?{" "}
                        <Link href="/signup" className="font-semibold text-[#b36b6b] hover:underline">
                            Register Now
                        </Link>
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default SignInPage;