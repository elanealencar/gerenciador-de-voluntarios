
export default function StatusBadge({ status }: { status: string }) {
  const isActive = status === "ativo";

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        isActive
          ? "bg-green-100 text-green-700"
          : "bg-gray-200 text-gray-600"
      }`}
    >
      {isActive ? "Ativo" : "Inativo"}
    </span>
  );
}