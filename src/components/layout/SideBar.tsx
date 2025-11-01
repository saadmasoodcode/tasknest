import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
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
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import DeleteGroupModal from "../modals/DeleteGroupModal";
import EditGroupModal from "../modals/EditGroupModal";

export function AppSidebar() {
  const [openModal, setOpenModal] = useState(false);
  const [deleteTodoGroupModal, setDeleteTodoGroupModal] = useState(false);
  const [openGroupEditModal, setOpenGroupEditModal] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const { getTodoGroups, data, loading, getTodoGroup } = useTodoGroupContext();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      getTodoGroups();
    }
  }, [user?.id]);

  const { setOpenMobile } = useSidebar();

  const handleDeleteClick = (id: string) => {
    setSelectedGroupId(id);
    setDeleteTodoGroupModal(true);
  };

  const handleEditClick = async (id: string) => {
    setSelectedGroupId(id);
    await getTodoGroup(id);
    !loading && setOpenGroupEditModal(true);
  };

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
                {data.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      className="bg-[rgb(94,138,226)] hover:bg-[rgb(94,139,226)]/90 active:bg-[rgb(94,139,226)]/70"
                      asChild
                    >
                      <NavLink
                        to={`/group/${item.id}`}
                        onClick={() => setOpenMobile(false)}
                      >
                        <span className="text-white">{item.name}</span>
                      </NavLink>
                    </SidebarMenuButton>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuAction>
                          <MoreVertical className="text-black" />
                        </SidebarMenuAction>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right" align="start">
                        <DropdownMenuItem
                          onClick={() => {
                            handleDeleteClick(item.id ? item.id : "");
                          }}
                        >
                          <span>Delete Group</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            handleEditClick(item.id ? item.id : "");
                          }}
                        >
                          <span>Edit Group</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
      {deleteTodoGroupModal && (
        <DeleteGroupModal
          modal={deleteTodoGroupModal}
          setModal={setDeleteTodoGroupModal}
          id={selectedGroupId ? selectedGroupId : ""}
        />
      )}
      {openGroupEditModal && (
        <EditGroupModal
          modal={openGroupEditModal}
          setModal={setOpenGroupEditModal}
          id={selectedGroupId ? selectedGroupId : ""}
        />
      )}
    </>
  );
}
