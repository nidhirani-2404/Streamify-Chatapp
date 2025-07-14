import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendFriendRequest, acceptFriendRequest } from "../lib/api";
import toast from "react-hot-toast";

const useFriendActions = () => {
  const queryClient = useQueryClient();

  const sendRequestMutation = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outgoingRequests"] });
      queryClient.invalidateQueries({ queryKey: ["recommendedUsers"] });
      toast.success("Friend request sent!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to send friend request");
    },
  });

  const acceptRequestMutation = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      // Invalidate all friend-related queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["outgoingRequests"] });
      queryClient.invalidateQueries({ queryKey: ["recommendedUsers"] });
      toast.success("Friend request accepted!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to accept friend request");
    },
  });

  return {
    sendFriendRequest: sendRequestMutation.mutate,
    acceptFriendRequest: acceptRequestMutation.mutate,
    isLoading: sendRequestMutation.isPending || acceptRequestMutation.isPending,
  };
};

export default useFriendActions;