import { MoreVertical } from "lucide-react";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useTodoContext } from "@/context/TodosContext";
import { useEffect, useState } from "react";

interface PropsInterface {
  title: string;
  is_completed: boolean;
  id: string;
  group_id: string;
}

const Todos = (props: PropsInterface) => {
  const { title, is_completed, group_id, id } = props;
  const { deleteTodo, editTodo } = useTodoContext();
  const [completed, setCompleted] = useState<boolean>(is_completed);

  useEffect(() => {
    editTodo(
      { id: id, group_id: group_id, title: title, is_completed: completed },
      id
    );
  }, [completed]);

  return (
    <li
      className={`flex rounded gap-4 w-full h-13 px-5 items-center justify-between cursor-pointer bg-white`}
    >
      <div className="flex items-center gap-5">
        <Input
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="w-4"
          type="checkbox"
        />
        <h1>{title}</h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant={"ghost"} size={"icon-sm"} className="">
            <MoreVertical color="black" size={15} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => deleteTodo(id, group_id)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
};

export default Todos;
