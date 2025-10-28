import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import logo from "../../assets/logo.png";
import { Button } from "../ui/button";
import { useTodoGroupContext } from "@/context/TodoGroupContext";
import { useEffect, useState } from "react";
import CreateGroupModal from "../modals/CreateGroupModal";
import { useAuth } from "@/context/AuthContext";
import { NavLink } from "react-router-dom";

export function AppSidebar() {
  const [openModal, setOpenModal] = useState(false);
  const { getTodoGroups, data } = useTodoGroupContext();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      getTodoGroups();
    }
  }, [user?.id]);

  const { setOpenMobile } = useSidebar();

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
                    <SidebarMenuButton
                      className="bg-[rgb(94,138,226)] hover:bg-[rgb(94,139,226)]/90 active:bg-[rgb(94,139,226)]/70"
                      asChild
                    >
                      <NavLink
                        to={`/group/${item.id}`}
                        onClick={() => setOpenMobile(false)}
                      >
                        {/* <item.icon /> */}
                        <span className="text-white">{item.name}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <Button className="mt-3" onClick={() => setOpenModal(true)}>
          Create Group
        </Button>
      </Sidebar>
      {openModal && (
        <CreateGroupModal modal={openModal} setModal={setOpenModal} />
      )}
    </>
  );
}
