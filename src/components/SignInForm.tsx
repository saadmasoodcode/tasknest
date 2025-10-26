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
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";
import { useEffect } from "react";

interface ISignInForm {
  email: string;
  password: string;
}

const SignInForm = () => {
  const { signInUser, errorMsg, user, authenticating } = useAuth();
  // const { signInUser, error, user, authenticating } = useContext();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  useEffect(() => {
    if (user?.id) {
      navigate("/home");
    }
  }, [user?.id]);

  useEffect(() => {
    errorMsg ? toast.error(errorMsg) : "";
  }, [errorMsg]);

  const onSubmit = (formData: ISignInForm) => {
    signInUser(formData);
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
          </div>
        </div>
        <Button
          type="submit"
          disabled={authenticating}
          className="w-full mt-10"
        >
          {authenticating && <Spinner />}
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
