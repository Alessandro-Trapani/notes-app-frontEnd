import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updatedNote }) => {
      const response = await axios.put(`http://localhost:8080/notes/${id}`, {
        content: updatedNote,
      });
      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
    },
  });
};
