import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: "deleteNote",
    mutationFn: async (id) => {
      const response = await axios.delete(`http://localhost:8080/notes/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"]);
    },
  });
};
