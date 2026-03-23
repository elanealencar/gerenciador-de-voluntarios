import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  availabilityOptions,
  roleOptions,
  statusOptions,
} from "../constants/volunteerOptions";
import {
  createVolunteerSchema,
  updateVolunteerSchema,
  type CreateVolunteerFormData,
  type UpdateVolunteerFormData,
} from "../schemas/volunteerSchema";

type VolunteerFormValues = CreateVolunteerFormData | UpdateVolunteerFormData;

type Props = {
  mode: "create" | "edit";
  defaultValues?: Partial<VolunteerFormValues>;
  isSubmitting?: boolean;
  apiError?: string;
  onSubmit: (values: VolunteerFormValues) => void;
  onCancel: () => void;
};

export default function VolunteerForm({
  mode,
  defaultValues,
  isSubmitting,
  apiError,
  onSubmit,
  onCancel,
}: Props) {
  const schema = mode === "create" ? createVolunteerSchema : updateVolunteerSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VolunteerFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      cargo_pretendido: "Cozinha",
      disponibilidade: "Manhã",
      ...(mode === "edit" ? { status: "ativo" } : {}),
      ...defaultValues,
    } as VolunteerFormValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border rounded-2xl p-6 md:p-8"
    >
      <h1 className="text-3xl font-semibold text-slate-900">
        {mode === "create" ? "Novo Voluntário" : "Editar Voluntário"}
      </h1>

      <p className="mt-2 text-sm text-slate-500">
        {mode === "create"
          ? "Preencha os dados para cadastrar um novo voluntário"
          : "Atualize os dados do voluntário"}
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Nome *
          </label>
          <input
            {...register("nome")}
            placeholder="Nome completo"
            className="w-full rounded-lg border px-4 py-3 outline-none"
          />
          {errors.nome && (
            <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Email *
          </label>
          <input
            {...register("email")}
            placeholder="email@exemplo.com"
            className="w-full rounded-lg border px-4 py-3 outline-none"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Telefone *
          </label>
          <input
            {...register("telefone")}
            placeholder="(11)11111-1111"
            className="w-full rounded-lg border px-4 py-3 outline-none"
          />
          {errors.telefone && (
            <p className="mt-1 text-sm text-red-600">{errors.telefone.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Cargo Pretendido *
          </label>
          <select
            {...register("cargo_pretendido")}
            className="w-full rounded-lg border px-4 py-3 outline-none"
          >
            {roleOptions.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {errors.cargo_pretendido && (
            <p className="mt-1 text-sm text-red-600">
              {errors.cargo_pretendido.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Disponibilidade *
          </label>
          <select
            {...register("disponibilidade")}
            className="w-full rounded-lg border px-4 py-3 outline-none"
          >
            {availabilityOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.disponibilidade && (
            <p className="mt-1 text-sm text-red-600">
              {errors.disponibilidade.message}
            </p>
          )}
        </div>

        {mode === "edit" && (
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Status *
            </label>
            <select
              {...register("status" as "status")}
              className="w-full rounded-lg border px-4 py-3 outline-none"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status === "ativo" ? "Ativo" : "Inativo"}
                </option>
              ))}
            </select>

            {"status" in errors && errors.status && (
              <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
            )}
          </div>
        )}
      </div>

      {apiError && <p className="mt-4 text-sm text-red-600">{apiError}</p>}

      <div className="mt-8 flex justify-end gap-3 border-t pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg bg-slate-100 px-5 py-3 text-sm font-medium text-slate-700"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
        >
          {isSubmitting
            ? "Salvando..."
            : mode === "create"
            ? "Cadastrar Voluntário"
            : "Salvar Alterações"}
        </button>
      </div>
    </form>
  );
}