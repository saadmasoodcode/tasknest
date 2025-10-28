import { privateAxios } from "@/utils/axios";

export interface CreateTodoGroupApiBodyInterface {
  name: string;
  user_id: string | null;
}

export function getAllTodoGroupsApi() {
  return privateAxios.get("/rest/v1/todo_groups");
}

export function getTodoGroupApi(id: string) {
  return privateAxios.get(`/rest/v1/todo_groups?id=eq.${id}`);
}

export function createTodoGroupApi(body: CreateTodoGroupApiBodyInterface) {
  return privateAxios.post("/rest/v1/todo_groups", body);
}

export function deleteTodoGroupApi(id: string) {
  return privateAxios.delete(`/rest/v1/todo_groups?id=eq.${id}`);
}
