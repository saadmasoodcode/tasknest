import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/yupSchemas/AuthSchemas";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

interface SignUpFormInputs {
  full_name: string;
  email: string;
  password: string;
  confirm_password?: string;
}

const SignUpForm = () => {
  const { signUpUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SignUpFormInputs> = (formData) => {
    signUpUser({
      email: formData.email,
      password: formData.password,
      data: {
        full_name: formData.full_name,
      },
    });
    navigate("/");
  };

  return (
    <div
      className="w-full min-h-screen p-5 md:p-10
    bg-[rgb(246,247,248)] flex justify-center items-center"
    >
      <form
        className="w-[40%] max-w-96 min-w-[230px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-1/1 flex flex-col gap-8">
          <div className="w-full  flex justify-center">
            <img className="w-24 sm:w-32" src={logo} alt="" />
          </div>
          <div className="w-full flex flex-col items-center">
            <h1 className="text-[20px] font-bold">Create your account</h1>
            <p className="text-[12px] text-[#797878]">
              Join to start managing your tasks efficiently.
            </p>
          </div>
          <div>
            <Label>Full Name</Label>
            <Input
              className="mt-3 bg-white"
              type="text"
              {...register("full_name")}
            />
            <p className="text-red-600 text-[12px]">
              {errors.full_name?.message}
            </p>
          </div>
          <div>
            <Label>Email</Label>
            <Input
              {...register("email")}
              className="bg-white mt-3"
              type="email"
            />
            <p className="text-red-600 text-[12px]">{errors.email?.message}</p>
          </div>
          <div>
            <Label>Password</Label>
            <Input
              className="bg-white mt-3"
              type="password"
              {...register("password")}
            />
            <p className="text-red-600 text-[12px]">
              {errors.password?.message}
            </p>
          </div>
          <div>
            <Label>Confirm Password</Label>
            <Input
              className="mt-3 bg-white"
              type="password"
              {...register("confirm_password")}
            />
            <p className="text-red-600 text-[12px]">
              {errors.confirm_password?.message}
            </p>
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
          <div className="w-full flex justify-center">
            <p className="mt-2 text-[12px] text-[#696868]">
              Don't have an account?{" "}
              <Link className="text-blue-500 text-[13px]" to={"/"}>
                SignIn
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
