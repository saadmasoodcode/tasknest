import {
  createTodoGroupApi,
  deleteTodoGroupApi,
  editTodoGroupApi,
  getAllTodoGroupsApi,
  getTodoGroupApi,
  type CreateTodoGroupApiBodyInterface,
} from "@/apis/todoGroup";
import { isAxiosError } from "axios";
import { createContext, useContext, useState, type ReactNode } from "react";

interface TodoGroupContextInterface {
  getTodoGroups: () => Promise<void>;
  getTodoGroup: (id: string) => Promise<void>;
  createTodoGroup: (body: CreateTodoGroupApiBodyInterface) => Promise<void>;
  deleteTodoGroup: (id: string) => Promise<void>;
  editTodoGroup: (
    body: CreateTodoGroupApiBodyInterface,
    id: string
  ) => Promise<void>;
  todoGroup: SingleTodoGroupInterface[];
  loading: boolean;
  errorMsg: string;
  data: TodoGroupsInterface[];
}

interface ChildrenInterface {
  children: ReactNode;
}

interface TodoGroupsInterface {
  id?: string;
  name: string;
  user_id: string | null;
}

interface SingleTodoGroupInterface {
  id?: string;
  name: string;
  user_id: string | null;
}

const TodoGroupContext = createContext<TodoGroupContextInterface | null>(null);

export const TodoGroupContextProvidor = ({ children }: ChildrenInterface) => {
  const [data, setData] = useState<TodoGroupsInterface[]>([]);
  const [todoGroup, setTodoGroup] = useState<SingleTodoGroupInterface[]>([
    {
      id: "",
      name: "",
      user_id: "",
    },
  ]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const getTodoGroups = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const response = await getAllTodoGroupsApi();
      setData(response.data);
    } catch (error) {
      if (isAxiosError(error)) {
        setErrorMsg(error.response?.data.msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const getTodoGroup = async (id: string) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const response = await getTodoGroupApi(id);
      setTodoGroup(response.data);
      console.log(response);
    } catch (error) {
      if (isAxiosError(error)) {
        setErrorMsg(error.response?.data.msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const createTodoGroup = async (body: CreateTodoGroupApiBodyInterface) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const response = await createTodoGroupApi(body);
      setData((prev) => [...prev, { name: body.name, user_id: body.user_id }]);
      getTodoGroups();
      console.log(response);
    } catch (error) {
      if (isAxiosError(error)) {
        setErrorMsg(error.response?.data.msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteTodoGroup = async (id: string) => {
    setLoading(true);
    setErrorMsg("");
    try {
      await deleteTodoGroupApi(id);
      await getTodoGroups();
    } catch (error) {
      if (isAxiosError(error)) {
        setErrorMsg(error.response?.data.msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const editTodoGroup = async (
    body: CreateTodoGroupApiBodyInterface,
    id: string
  ) => {
    setLoading(true);
    setErrorMsg("");
    try {
      await editTodoGroupApi(body, id);
      await getTodoGroups();
    } catch (error) {
      if (isAxiosError(error)) {
        setErrorMsg(error.response?.data.msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <TodoGroupContext.Provider
      value={{
        getTodoGroups,
        createTodoGroup,
        errorMsg,
        loading,
        data,
        getTodoGroup,
        todoGroup,
        deleteTodoGroup,
        editTodoGroup,
      }}
    >
      {children}
    </TodoGroupContext.Provider>
  );
};

export function useTodoGroupContext() {
  const context = useContext(TodoGroupContext);
  if (!context) {
    throw new Error("Something went wrong");
  }
  return context;
}
