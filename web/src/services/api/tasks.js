import http from "../http";

export async function getAllTasks(query) {
  let id = query.queryKey[1];
  const { data } = await http.get(`/tasks/${id}`);
  return data;
}
