import { privateAxios } from "@/utils/axios";

export interface CreateTodoGroupApiBodyInterface {
  name: string;
  user_id: string;
}

export function getAllTodoGroupsApi() {
  return privateAxios.get("/rest/v1/todo_groups");
}

export function createTodoGroupApi(body: CreateTodoGroupApiBodyInterface) {
  return privateAxios.post("/rest/v1/todo_groups", body);
}
