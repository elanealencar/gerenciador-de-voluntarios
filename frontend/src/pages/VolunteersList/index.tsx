import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useDeleteVolunteer, useVolunteers } from "../../hooks/useVolunteers";
import Header from "../../components/Header";
import Filters from "../../components/Filters";
import VolunteersTable from "../../components/VolunteersTable";

type FiltersState = {
  search: string;
  status: string;
  cargo: string;
  disponibilidade: string;
};

export default function VolunteersList() {
  const { data, isLoading, isError } = useVolunteers();
  const deleteVolunteer = useDeleteVolunteer();

  const [filters, setFilters] = useState<FiltersState>({
    search: "",
    status: "",
    cargo: "",
    disponibilidade: "",
  });

  async function handleDelete(id: string) {
    try {
      await deleteVolunteer.mutateAsync(id);
      toast.success("Voluntário inativado com sucesso.");
    } catch {
      toast.error("Não foi possível inativar o voluntário.");
    }
  }

  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter((vol) => {
      const matchesSearch =
        !filters.search ||
        vol.nome.toLowerCase().includes(filters.search.toLowerCase()) ||
        vol.email.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus =
        !filters.status || vol.status === filters.status;

      const matchesCargo =
        !filters.cargo ||
        vol.cargo_pretendido.toLowerCase() === filters.cargo.toLowerCase();

      const matchesDisponibilidade =
        !filters.disponibilidade ||
        vol.disponibilidade === filters.disponibilidade;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCargo &&
        matchesDisponibilidade
      );
    });
  }, [data, filters]);

  if (isLoading) {
    return <div className="p-6">Carregando voluntários...</div>;
  }

  if (isError) {
    return <div className="p-6">Erro ao carregar voluntários.</div>;
  }

  return (
    <div className="px-6 py-8">
      <Header />
      <Filters filters={filters} setFilters={setFilters} />

      {!data || data.length === 0 ? (
        <div className="rounded-xl border bg-white p-8 text-center text-slate-500">
          Nenhum voluntário encontrado.
        </div>
      ) : (
        <VolunteersTable data={filteredData} onDelete={handleDelete} />
      )}
    </div>
  );
}