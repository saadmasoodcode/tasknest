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
import { useAuth } from "@/context/AuthContext";
import { useTodoContext } from "@/context/TodosContext";
import { Spinner } from "../ui/spinner";

interface PropsInterface {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  group_id?: string;
}

const CreateTodoModal = (props: PropsInterface) => {
  const { modal, setModal, group_id } = props;
  const { user } = useAuth();
  const { createTodo, loading } = useTodoContext();
  const [title, setTitle] = useState("");

  const onFormSubmit = async () => {
    await createTodo({
      title: title,
      user_id: user?.id || null,
      group_id: group_id,
      is_completed: false,
    });
    if (!loading) {
      setModal(false);
    }
  };

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      {/* <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger> */}
      <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new Todo</DialogTitle>
        </DialogHeader>
        <DialogDescription>Organize your tasks</DialogDescription>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name-1">Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="name-1"
              name="title"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => setModal(false)} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={onFormSubmit} disabled={loading}>
            {loading && <Spinner />}Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTodoModal;
