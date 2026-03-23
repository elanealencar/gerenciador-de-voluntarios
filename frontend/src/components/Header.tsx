import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-semibold text-gray-900">
          Gerenciamento de Voluntários
        </h1>
        <p className="text-gray-500 text-sm">
          Gerencie cadastros, visualize informações e acompanhe voluntários
        </p>
      </div>

      <button
        onClick={() => navigate("/create")}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
      >
        <Plus size={16} />
        Novo Voluntário
      </button>
    </div>
  );
}