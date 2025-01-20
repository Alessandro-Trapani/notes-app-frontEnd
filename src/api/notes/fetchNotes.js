import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchNotes = () => {
  return useQuery({
    queryKey: ["notes"], // Unique key to identify the query
    queryFn: async () => {
      const response = await axios.get("http://localhost:8080/notes/getNotes");
      return response.data;
    },
  });
};
