import { AxiosError } from "axios";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VolunteerForm from "../../components/VolunteerForm";
import { useUpdateVolunteer, useVolunteer } from "../../hooks/useVolunteers";
import type { UpdateVolunteerFormData } from "../../schemas/volunteerSchema";
import { toast } from "sonner";

export default function VolunteerEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isError } = useVolunteer(id);
  const updateVolunteer = useUpdateVolunteer();
  const [apiError, setApiError] = useState("");

  const defaultValues = useMemo(() => {
    if (!data) return undefined;

    return {
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      cargo_pretendido: data.cargo_pretendido,
      disponibilidade: data.disponibilidade,
      status: data.status,
    };
  }, [data]);

  async function handleUpdate(values: UpdateVolunteerFormData) {
    if (!id) return;

    setApiError("");

    try {
      await updateVolunteer.mutateAsync({
        id,
        payload: values,
      });
      toast.success("Voluntário atualizado com sucesso.");
      navigate("/");
    } catch (error) {
      const axiosError = error as AxiosError<{ detail?: string }>;

      if (axiosError.response?.status === 409) {
        setApiError("Já existe um voluntário cadastrado com este email.");
        toast.error("Email já cadastrado.");
        return;
      }

      setApiError("Não foi possível atualizar o voluntário.");
      toast.error("Não foi possível atualizar o voluntário.");
    }
  }

  if (isLoading) {
    return <div className="p-6">Carregando voluntário...</div>;
  }

  if (isError || !data) {
    return <div className="p-6">Erro ao carregar voluntário.</div>;
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
        mode="edit"
        defaultValues={defaultValues}
        onSubmit={handleUpdate}
        onCancel={() => navigate("/")}
        isSubmitting={updateVolunteer.isPending}
        apiError={apiError}
      />
    </div>
  );
}