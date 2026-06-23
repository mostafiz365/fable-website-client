"use client";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Radio,
  RadioGroup,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const SignUpPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("callbackUrl") || "/";


  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
      role: user.role,
    });
    console.log({ data, error });
    if (data) {
      //   toast.success('Signup Successfully!'),
      router.push(redirectTo);
    }
    if (error) {
      // toast.error(error.message);
      alert(error.message);
    }
  };

  const handleGoogle = async() =>{
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-[#fbf4f2] flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* ব্যাকগ্রাউন্ডের নান্দনিক অর্গানিক ব্লার শেপ (Fable থিম ম্যাচিং) */}
      <div className="absolute w-[400px] h-[400px] bg-[#ecd5cf]/50 rounded-full blur-3xl -top-20 -left-20 pointer-events-none" />
      <div className="absolute w-[350px] h-[350px] bg-[#b36b6b]/10 rounded-full blur-3xl -bottom-20 -right-20 pointer-events-none" />

      <div className="w-full max-w-lg z-10">
        {/* ব্র্যান্ডের টাইটেল ও সাবটাইটেল */}
        <div className="text-center pb-6">
          <h2 className="text-4xl font-serif font-bold text-[#2c3e50] tracking-wide">
            Join <span className="text-[#b36b6b]">Fable</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1 font-medium">
            Create an account to share and explore ebooks
          </p>
        </div>

        {/* মডার্ন রাউন্ডেড এবং শ্যাডো যুক্ত কার্ড */}
        <Card className="border border-[#ecd5cf]/60 bg-white/90 backdrop-blur-md rounded-2xl p-8 md:p-10 shadow-xl shadow-gray-200/50">
          <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
            {/* Name Input */}
            <TextField isRequired name="name" type="text" className="w-full">
              <Label className="text-[#2c3e50] font-medium text-sm mb-1">
                Name
              </Label>
              <Input
                placeholder="Enter your full name"
                className={{
                  inputWrapper:
                    "bg-gray-50 border border-gray-200 focus-within:!border-[#b36b6b] rounded-xl h-11",
                }}
              />
              <FieldError className="text-danger text-xs mt-1" />
            </TextField>

            {/* Image URL Input */}
            <TextField name="image" type="url" className="w-full">
              <Label className="text-[#2c3e50] font-medium text-sm mb-1">
                Image URL
              </Label>
              <Input
                placeholder="https://example.com/avatar.png"
                className={{
                  inputWrapper:
                    "bg-gray-50 border border-gray-200 focus-within:!border-[#b36b6b] rounded-xl h-11",
                }}
              />
              <FieldError className="text-danger text-xs mt-1" />
            </TextField>

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
              <Label className="text-[#2c3e50] font-medium text-sm mb-1">
                Email
              </Label>
              <Input
                placeholder="john@example.com"
                className={{
                  inputWrapper:
                    "bg-gray-50 border border-gray-200 focus-within:!border-[#b36b6b] rounded-xl h-11",
                }}
              />
              <FieldError className="text-danger text-xs mt-1" />
            </TextField>

            {/* Password Input */}
            <TextField
              isRequired
              minLength={6}
              name="password"
              type="password"
              className="w-full"
              validate={(value) => {
                if (value.length < 6) {
                  return "Password must be at least 6 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[a-z]/.test(value)) {
                  return "Password must contain at least one lowercase letter";
                }
                return null;
              }}
            >
              <Label className="text-[#2c3e50] font-medium text-sm mb-1">
                Password
              </Label>
              <Input
                placeholder="••••••••"
                className={{
                  inputWrapper:
                    "bg-gray-50 border border-gray-200 focus-within:!border-[#b36b6b] rounded-xl h-11",
                }}
              />
              <Description className="text-xs text-gray-400 mt-1">
                Must be at least 6 characters with 1 uppercase and 1 lowercase
              </Description>
              <FieldError className="text-danger text-xs mt-1" />
            </TextField>

            <div className="flex flex-col gap-4">
              <Label>User Role</Label>
              <RadioGroup
                defaultValue="reader"
                name="role"
                orientation="horizontal"
              >
                <Radio value="reader" className={'flex flex-row items-center gap-1.5'}>
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  <Radio.Content>
                    <Label>Reader</Label>
                  </Radio.Content>
                </Radio>
                <Radio value="writer" className={'flex flex-row items-center gap-1.5'}>
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  <Radio.Content>
                    <Label>Writer</Label>
                  </Radio.Content>
                </Radio>
              </RadioGroup>
            </div>

            {/* Submit Button */}
            <div className="flex gap-2 mt-2">
              <Button
                type="submit"
                className="rounded-xl bg-[#b36b6b] hover:bg-[#a05a5a] text-white w-full h-11 font-medium shadow-md shadow-[#b36b6b]/10 transition-all"
              >
                Create Account
              </Button>
            </div>

            {/* Divider Line */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-xs font-medium uppercase tracking-wider">
                Or Sign Up With
              </span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>
          </Form>

          {/* Google Sign Up Button */}
          <Button
            onClick={handleGoogle}
            variant="bordered"
            className="rounded-xl w-full h-11 border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium transition-colors mt-1"
          >
            <FcGoogle className="text-xl mr-1" /> Sign Up with Google
          </Button>

          {/* Login Redirect Link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              href={`/signin?callbackUrl=${redirectTo}`}
              className="font-semibold text-[#b36b6b] hover:underline"
            >
              Log In
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
