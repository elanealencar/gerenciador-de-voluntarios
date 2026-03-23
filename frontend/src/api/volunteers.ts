import { api } from "./apiClient";
import type {
  Volunteer,
  CreateVolunteerInput,
  UpdateVolunteerInput,
} from "../types/volunteer";

export async function getVolunteers(): Promise<Volunteer[]> {
  const { data } = await api.get("/voluntarios");
  return data;
}

export async function getVolunteerById(id: string): Promise<Volunteer> {
  const { data } = await api.get(`/voluntarios/${id}`);
  return data;
}

export async function createVolunteer(
  payload: CreateVolunteerInput
): Promise<Volunteer> {
  const { data } = await api.post("/voluntarios", payload);
  return data;
}

export async function updateVolunteer(
  id: string,
  payload: UpdateVolunteerInput
): Promise<Volunteer> {
  const { data } = await api.put(`/voluntarios/${id}`, payload);
  return data;
}

export async function deleteVolunteer(id: string): Promise<void> {
  await api.delete(`/voluntarios/${id}`);
}