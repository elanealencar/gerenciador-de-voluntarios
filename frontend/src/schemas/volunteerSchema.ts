import { z } from "zod";
import {
  availabilityOptions,
  roleOptions,
  statusOptions,
} from "../constants/volunteerOptions";

export const createVolunteerSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Informe um email válido"),
  telefone: z.string().min(1, "Telefone é obrigatório"),
  cargo_pretendido: z.enum(roleOptions, {
    message: "Cargo pretendido é obrigatório",
  }),
  disponibilidade: z.enum(availabilityOptions, {
    message: "Disponibilidade é obrigatória",
  }),
});

export const updateVolunteerSchema = createVolunteerSchema.extend({
  status: z.enum(statusOptions, {
    message: "Status é obrigatório",
  }),
});

export type CreateVolunteerFormData = z.infer<typeof createVolunteerSchema>;
export type UpdateVolunteerFormData = z.infer<typeof updateVolunteerSchema>;