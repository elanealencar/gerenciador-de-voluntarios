import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VolunteerForm from "../../components/VolunteerForm";
import { useCreateVolunteer } from "../../hooks/useVolunteers";
import type { CreateVolunteerFormData } from "../../schemas/volunteerSchema";
import { toast } from "sonner";

export default function VolunteerCreate() {
  const navigate = useNavigate();
  const createVolunteer = useCreateVolunteer();
  const [apiError, setApiError] = useState("");

  async function handleCreate(values: CreateVolunteerFormData) {
    setApiError("");

    try {
      await createVolunteer.mutateAsync(values);
      toast.success("Voluntário cadastrado com sucesso.");
      navigate("/");
    } catch (error) {
      const axiosError = error as AxiosError<{ detail?: string }>;

      if (axiosError.response?.status === 409) {
        setApiError("Já existe um voluntário cadastrado com este email.");
        toast.error("Email já cadastrado.");
        return;
      }

      setApiError("Não foi possível cadastrar o voluntário.");
      toast.error("Não foi possível cadastrar o voluntário.");
    }
  }

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/")}
        className="mb-6 text-sm text-slate-600"
      >
        ← Voltar para lista
      </button>

      <VolunteerForm
        mode="create"
        onSubmit={handleCreate}
        onCancel={() => navigate("/")}
        isSubmitting={createVolunteer.isPending}
        apiError={apiError}
      />
    </div>
  );
}