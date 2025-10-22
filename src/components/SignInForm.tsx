import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Key, MailIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "@/yupSchemas/AuthSchemas";

interface ISignInForm {
  email: string;
  password: string;
}

const SignInForm = () => {
  const { signInUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = (formData: ISignInForm) => {
    signInUser(formData);
    navigate("/home");
  };

  return (
    <div className="w-100 bg-white border rounded-xl p-10 shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-7">
          <div className="w-full flex justify-center items-center flex-col">
            <img className="w-32" src={logo} alt="" />
            <p className="text-[12px] mt-2 text-gray-700 text">
              Welcome back! please login to your account.
            </p>
          </div>
          <div>
            <Label>Email</Label>
            <InputGroup className="mt-3 bg-[rgb(246,247,248)]">
              <InputGroupInput
                {...register("email")}
                type="email"
                placeholder="Enter your email"
              />
              <InputGroupAddon>
                <MailIcon />
              </InputGroupAddon>
            </InputGroup>
            <p className="text-red-600 text-[12px]">{errors.email?.message}</p>
            {/* <Input
              value={emailPassword.email}
              onChange={(e) =>
                setEmailPassword((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              className="mt-3 bg-[rgb(246,247,248)]"
              type="email"
            /> */}
          </div>
          <div>
            <Label>Password</Label>
            <InputGroup className="mt-3 bg-[rgb(246,247,248)]">
              <InputGroupInput
                {...register("password")}
                type="password"
                placeholder="Enter your Password"
              />
              <InputGroupAddon>
                <Key />
              </InputGroupAddon>
            </InputGroup>
            <p className="text-red-600 text-[12px]">
              {errors.password?.message}
            </p>
            {/* <Input
              className="mt-3 bg-[rgb(246,247,248)]"
              type="password"
              value={emailPassword.password}
              onChange={(e) =>
                setEmailPassword((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            /> */}
          </div>
        </div>
        <Button type="submit" className="w-full mt-10">
          Sign In
        </Button>
      </form>
      <div className="w-full flex justify-center">
        <p className="mt-2 text-[12px] text-[#696868]">
          Don't have an account?{" "}
          <Link className="text-blue-500 text-[13px]" to={"/sign_up"}>
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
