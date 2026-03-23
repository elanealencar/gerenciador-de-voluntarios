type FiltersState = {
  search: string;
  status: string;
  cargo: string;
  disponibilidade: string;
};

type Props = {
  filters: FiltersState;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
};

export default function Filters({ filters, setFilters }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-white p-4 rounded-xl border mb-6">
      <input
        value={filters.search}
        placeholder="Buscar por nome ou email"
        className="border rounded-lg px-3 py-2"
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, search: e.target.value }))
        }
      />

      <select
        value={filters.status}
        className="border rounded-lg py-2 pl-2"
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, status: e.target.value }))
        }
      >
        <option value="">Todos os status</option>
        <option value="ativo">Ativo</option>
        <option value="inativo">Inativo</option>
      </select>

      <select
        value={filters.cargo}
        className="border rounded-lg px-3 py-2"
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, cargo: e.target.value }))
        }
      >
        <option value="">Todos os cargos</option>
        <option value="Cozinha">Cozinha</option>
        <option value="Atendimento">Atendimento</option>
        <option value="Logística">Logística</option>
        <option value="Administrativo">Administrativo</option>
      </select>

      <select
        value={filters.disponibilidade}
        className="border rounded-lg px-3 py-2"
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            disponibilidade: e.target.value,
          }))
        }
      >
        <option value="">Todas as disponibilidades</option>
        <option value="Manhã">Manhã</option>
        <option value="Tarde">Tarde</option>
        <option value="Tarde">Noite</option>
        <option value="Noite">Fim de semana</option>
      </select>
    </div>
  );
}