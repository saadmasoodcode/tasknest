import { privateAxios } from "@/utils/axios";

export interface createTodoApiBodyInterface {
  id?: string;
  user_id?: string | null;
  group_id?: string;
  title: string;
  is_completed: boolean;
}

export function getTodosApi(group_id?: string | null) {
  return privateAxios.get(`/rest/v1/todos?group_id=eq.${group_id}`);
}

export function createTodoApi(body: createTodoApiBodyInterface) {
  return privateAxios.post("/rest/v1/todos", body);
}

export function editTodoApi(body: createTodoApiBodyInterface, id?: string) {
  return privateAxios.patch(`/rest/v1/todos?id=eq.${id}`, body);
}
