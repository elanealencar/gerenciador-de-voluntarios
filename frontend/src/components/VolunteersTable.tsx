
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { CircleX, Pencil } from "lucide-react";

export default function VolunteersTable({ data, onDelete }: any) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="text-gray-500 bg-gray-50">
          <tr>
            <th className="p-3 text-left">Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Cargo</th>
            <th>Disponibilidade</th>
            <th>Status</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {data.map((vol: any) => (
            <tr key={vol.id} className="border-t">
              <td className="p-3 font-medium">{vol.nome}</td>
              <td>{vol.email}</td>
              <td>{vol.telefone}</td>
              <td>{vol.cargo_pretendido}</td>
              <td>{vol.disponibilidade}</td>
              <td>
                <StatusBadge status={vol.status} />
              </td>
              <td>{new Date(vol.data_inscricao).toLocaleDateString("pt-BR")}</td>
              <td className="flex gap-2">
                <div className="flex items-center gap-2">
                  <button
                      onClick={() => navigate(`/edit/${vol.id}`)}
                      className="rounded-md p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                      aria-label={`Editar ${vol.nome}`}
                      title="Editar"
                    >
                      <Pencil size={16} stroke="black" />
                  </button>
                  <button
                      onClick={() => onDelete(vol.id)}
                      className="rounded-md p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                      aria-label={`Inativar ${vol.nome}`}
                      title="Inativar"
                  >
                    <CircleX size={16} stroke="black" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}