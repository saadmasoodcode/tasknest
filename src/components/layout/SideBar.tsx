import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import logo from "../../assets/logo.png";
import { Button } from "../ui/button";
import { useTodoGroupContext } from "@/context/TodoGroupContext";
import { useEffect, useState } from "react";
import CreateGroupModal from "../modals/CreateGroupModal";
import { useAuth } from "@/context/AuthContext";

export function AppSidebar() {
  const [openModal, setOpenModal] = useState(false);

  const { getTodoGroups, data } = useTodoGroupContext();
  const { user } = useAuth();

  useEffect(() => {
    if (user.id) {
      getTodoGroups();
    }
  }, [user.id]);

  return (
    <>
      <Sidebar className={`p-4 bg-[rgb(246,247,248)]`}>
        <SidebarContent>
          <SidebarHeader>
            <img className="w-40" src={logo} alt="logo" />
          </SidebarHeader>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {data.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton asChild>
                      <a href={"#"}>
                        {/* <item.icon /> */}
                        <span>{item.name}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <Button onClick={() => setOpenModal((prev) => !prev)}>
          Create Group
        </Button>
      </Sidebar>
      {openModal && (
        <CreateGroupModal modal={openModal} setModal={setOpenModal} />
      )}
    </>
  );
}
