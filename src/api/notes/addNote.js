import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (note) => {
      const response = await axios.post("http://localhost:8080/notes/addNote", {
        content: note,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
    },
  });
};
