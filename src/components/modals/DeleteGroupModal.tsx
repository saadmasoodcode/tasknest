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
import { useTodoGroupContext } from "@/context/TodoGroupContext";
import { Spinner } from "../ui/spinner";
import { useNavigate, useParams } from "react-router-dom";

interface PropsInterface {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

const DeleteGroupModal = (props: PropsInterface) => {
  const { modal, setModal, id } = props;
  const navigate = useNavigate();
  const params = useParams();
  const { loading, deleteTodoGroup, data } = useTodoGroupContext();

  const handleDelete = () => {
    if (params.id === id) {
      const indexOfCurrentGroup = data.findIndex((item) => item.id === id);
      const indexOfPreviousGroup = indexOfCurrentGroup - 1;
      const indexOfNextGroup = indexOfCurrentGroup + 1;
      let nextGroupId = undefined;
      if (indexOfCurrentGroup == 0) {
        nextGroupId = data[indexOfNextGroup].id;
      } else {
        nextGroupId = data[indexOfPreviousGroup].id;
      }
      navigate(`/group/${nextGroupId}`);
    }
  };

  const onFormSubmit = async () => {
    await deleteTodoGroup(id);
    if (!loading) {
      setModal(false);
    }
    handleDelete();
  };

  return (
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete group</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this group by doing this all the Todos
          in it will also deleted
        </DialogDescription>

        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => setModal(false)} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={loading} onClick={onFormSubmit}>
            {loading && <Spinner />}Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteGroupModal;
