import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useTodoGroupContext } from "@/context/TodoGroupContext";
import { useAuth } from "@/context/AuthContext";

interface PropsInterface {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateGroupModal = (props: PropsInterface) => {
  const { modal, setModal } = props;
  const { user } = useAuth();
  const { createTodoGroup } = useTodoGroupContext();
  const [name, setName] = useState("");

  const onFormSubmit = () => {
    createTodoGroup({ name: name, user_id: user.id });
    setModal(false);
  };

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      {/* <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger> */}
      <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new group</DialogTitle>
        </DialogHeader>
        <DialogDescription>Organize your tasks into groups</DialogDescription>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name-1">Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name-1"
              name="name"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => setModal(false)} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={onFormSubmit}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupModal;
