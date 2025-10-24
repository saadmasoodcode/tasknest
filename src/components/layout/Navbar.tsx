import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarTrigger } from "../ui/sidebar";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className="flex justify-between items-center border-b border-b-neutral-200 px-5 py-3">
      <div className="flex gap-2 items-center">
        {useIsMobile() ? <SidebarTrigger className="" /> : ""}
        <h1>Home</h1>
      </div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>
          {user.user_metadata.full_name.slice(1, 2)}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default Navbar;
