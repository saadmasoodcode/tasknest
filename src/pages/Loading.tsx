import { Spinner } from "@/components/ui/spinner";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Spinner className="size-10" />
    </div>
  );
};

export default Loading;
