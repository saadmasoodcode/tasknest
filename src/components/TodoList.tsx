import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import Todos from "./Todos";
import CreateTodoModal from "./modals/CreateTodoModal";
import { useTodoContext } from "@/context/TodosContext";

const TodoList = () => {
  const params = useParams();
  const [openCreateTodoModal, setOpenCreateTodoModal] =
    useState<boolean>(false);
  const { getTodos, todos } = useTodoContext();

  useEffect(() => {
    if (params.id) {
      getTodos(params.id);
    }
  }, [params.id]);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-end">
          <Button onClick={() => setOpenCreateTodoModal(true)}>Add Todo</Button>
        </div>
        <div className="mt-10">
          <ul className="flex gap-3 flex-col w-full">
            {todos &&
              todos.map((item) => {
                return (
                  <Todos
                    id={item.id}
                    key={item.id}
                    group_id={params.id ? params.id : ""}
                    title={item.title}
                    is_completed={item.is_completed}
                  />
                );
              })}
          </ul>
        </div>
      </div>
      {openCreateTodoModal && (
        <CreateTodoModal
          group_id={params.id}
          modal={openCreateTodoModal}
          setModal={setOpenCreateTodoModal}
        />
      )}
    </>
  );
};

export default TodoList;
