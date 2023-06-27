import http from "../http";

export async function getAllColumns() {
  const { data } = await http.get("/columns");
  return data;
}
