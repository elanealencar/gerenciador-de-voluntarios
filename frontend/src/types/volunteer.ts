export type VolunteerStatus = "ativo" | "inativo";

export type VolunteerAvailability =
  | "Manhã"
  | "Tarde"
  | "Noite"
  | "Fim de Semana";

export type VolunteerRole =
  | "Cozinha"
  | "Atendimento"
  | "Logística"
  | "Administrativo"

export interface Volunteer {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cargo_pretendido: VolunteerRole;
  disponibilidade: VolunteerAvailability;
  status: VolunteerStatus;
  data_inscricao: string;
}

export interface CreateVolunteerInput {
  nome: string;
  email: string;
  telefone: string;
  cargo_pretendido: VolunteerRole;
  disponibilidade: VolunteerAvailability;
}

export interface UpdateVolunteerInput {
  nome: string;
  email: string;
  telefone: string;
  cargo_pretendido: VolunteerRole;
  disponibilidade: VolunteerAvailability;
  status: VolunteerStatus;
}

export interface VolunteersFilters {
  search?: string;
  status?: string;
  cargo?: string;
  disponibilidade?: string;
}