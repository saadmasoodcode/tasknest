import { useAuth } from "@/context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="w-full h-full flex justify-center flex-auto items-center flex-col">
      <h1>Welcome </h1>
      <h1 className="text-xl text-[rgb(94,139,226)]">
        {user?.user_metadata.full_name}
      </h1>
    </div>
  );
};

export default Home;
