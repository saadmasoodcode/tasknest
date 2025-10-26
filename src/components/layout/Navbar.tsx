import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarTrigger } from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import Loading from "@/pages/Loading";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center border-b border-b-neutral-200 px-5 py-3 sticky top-0 bg-[rgb(246,247,248)]">
      <div className="flex gap-2 items-center">
        {useIsMobile() ? <SidebarTrigger /> : ""}
        <h1>Home</h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage
              className="cursor-pointer"
              src="https://gthub.com/saadmasoodcode.png"
            />
            <AvatarFallback className="bg-neutral-200 border border-neutral-400 cursor-pointer hover:bg-neutral-300">
              {user?.user_metadata.full_name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              signOutUser();
              if (!user) {
                navigate("/");
              } else {
                <Loading />;
              }
            }}
          >
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
