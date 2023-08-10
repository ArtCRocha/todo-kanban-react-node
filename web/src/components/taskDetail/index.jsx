import { useQuery } from "@tanstack/react-query";
import { Title, Text, ContainerDetailTask, ContainerText } from "./styles";
import { getAllColumns } from "../../services/api/column";
import { useEffect, useState } from "react";

export default function TaskDetail({ task }) {
  const [status, setStatus] = useState();
  const columns = useQuery({
    queryKey: ["columns"],
    queryFn: getAllColumns,
  });

  useEffect(() => {
    setStatus(columns.data?.findIndex((x) => x.id === parseInt(task?.status)));
  }, [columns.data]);

  return (
    <ContainerDetailTask>
      <Title>{task?.name}</Title>
      {task?.description !== "" && (
        <ContainerText>
          <Text weight="600">Descrição:</Text>
          <Text
            dangerouslySetInnerHTML={{
              __html: task?.description,
            }}
          ></Text>
        </ContainerText>
      )}
      <Text weight="500">Status da tarefa: {columns.data[status]?.name}</Text>
    </ContainerDetailTask>
  );
}
