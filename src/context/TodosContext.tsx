import {
  createTodoApi,
  editTodoApi,
  getTodosApi,
  type createTodoApiBodyInterface,
} from "@/apis/todos";
import { isAxiosError } from "axios";
import { createContext, useContext, useState, type ReactNode } from "react";

interface TodoContextPropsTypes {
  children: ReactNode;
}

interface TodosInterface {
  id?: string;
  title: string;
  is_completed: boolean;
}

interface TodoContextTypes {
  getTodos: (group_id: string) => Promise<void>;
  createTodo: (body: createTodoApiBodyInterface) => Promise<void>;
  editTodo: (body: createTodoApiBodyInterface, id: string) => Promise<void>;
  loading: boolean;
  errorMsg: string;
  todos: TodosInterface[] | null;
}

const TodoContext = createContext<TodoContextTypes | null>(null);

export const TodoContextProvider = ({ children }: TodoContextPropsTypes) => {
  const [todos, setTodos] = useState<TodosInterface[] | null>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const getTodos = async (group_id: string | undefined) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const response = await getTodosApi(group_id);
      setTodos(response.data);
    } catch (error) {
      if (isAxiosError(error)) {
        setErrorMsg(error.response?.data.msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async (body: createTodoApiBodyInterface) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const response = await createTodoApi(body);
      console.log(response);
      getTodos(body.group_id);
    } catch (error) {
      if (isAxiosError(error)) {
        setErrorMsg(error.response?.data.msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const editTodo = async (
    body: createTodoApiBodyInterface,
    id: string | undefined
  ) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const response = await editTodoApi(body, id);
      console.log(response);
      getTodos(body.group_id);
    } catch (error) {
      if (isAxiosError(error)) {
        setErrorMsg(error.response?.data.msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <TodoContext.Provider
      value={{ getTodos, createTodo, loading, errorMsg, todos, editTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("Something went wrong in TodoContext");
  }
  return context;
};
