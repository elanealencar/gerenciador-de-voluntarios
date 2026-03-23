import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createVolunteer,
  deleteVolunteer,
  getVolunteerById,
  getVolunteers,
  updateVolunteer,
} from "../api/volunteers";
import type {
  CreateVolunteerInput,
  UpdateVolunteerInput,
} from "../types/volunteer";

export function useVolunteers() {
  return useQuery({
    queryKey: ["volunteers"],
    queryFn: getVolunteers,
  });
}

export function useVolunteer(id?: string) {
  return useQuery({
    queryKey: ["volunteer", id],
    queryFn: () => getVolunteerById(id as string),
    enabled: !!id,
  });
}

export function useCreateVolunteer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateVolunteerInput) => createVolunteer(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["volunteers"] });
    },
  });
}

export function useUpdateVolunteer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateVolunteerInput;
    }) => updateVolunteer(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["volunteers"] });
      queryClient.invalidateQueries({ queryKey: ["volunteer", variables.id] });
    },
  });
}

export function useDeleteVolunteer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteVolunteer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["volunteers"] });
    },
  });
}