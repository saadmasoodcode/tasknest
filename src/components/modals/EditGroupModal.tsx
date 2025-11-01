import { useEffect, useState } from "react";
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
import { Spinner } from "../ui/spinner";

interface PropsInterface {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

const EditGroupModal = (props: PropsInterface) => {
  const { modal, setModal, id } = props;
  const { user } = useAuth();
  const { loading, editTodoGroup, todoGroup } = useTodoGroupContext();
  const [name, setName] = useState("");

  useEffect(() => {
    console.log(id);
    !loading && setName(todoGroup[0].name);
  }, []);

  const onFormSubmit = async () => {
    await editTodoGroup({ name: name, user_id: user?.id || null }, id);
    if (!loading) {
      setModal(false);
    }
  };

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit group</DialogTitle>
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
          <Button disabled={loading} type="button" onClick={onFormSubmit}>
            {loading && <Spinner />}Edit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditGroupModal;
