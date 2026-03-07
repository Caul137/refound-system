import { Link, useNavigate } from "react-router-dom";
import { Categories } from "../../components/Categories";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../../services/api";
import { formSchema, type RefundFormData } from "../../Schema/FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";

function NewRefundRequest() {
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, formState } =
    useForm<RefundFormData>({
      resolver: zodResolver(formSchema),
    });

  const newRefund = async (data: RefundFormData) => {
    const receiptForm = new FormData();
    receiptForm.append("receiptFile", data.receipt);

    const receiptResponse = await api.post("/receipts", receiptForm);

    const receiptId = receiptResponse.data.receipt.id;

    try {
      await api.post("/refunds", {
        title: data.title,
        category: data.category,
        value: Math.round(data.value * 100),
        receipt: receiptId,
      });

      data.title = "";
      data.category = "";
      data.value = 0;
      setFile(null);

      navigate("/success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#EEF3F0] flex flex-col">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-10 py-6">
        <div className="flex items-center gap-2 text-green-700 font-semibold">
          <Link to={"/"} className="text-xl">
            ↺ refund
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <Link to={"/"} className="text-sm text-gray-600">
            Solicitações de reembolso
          </Link>

          <Link
            to={""}
            className="bg-green-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600"
          >
            Nova solicitação
          </Link>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 flex items-center justify-center">
        <form
          onSubmit={handleSubmit(newRefund)}
          className="w-full max-w-md bg-white rounded-2xl px-8 py-8 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-gray-800">
            Nova solicitação de reembolso
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Dados da despesa para solicitar reembolso.
          </p>

          {/* Nome da solicitação */}
          <div className="mt-6">
            <label className="block text-[10px] text-gray-400 mb-1 uppercase">
              Nome da solicitação
            </label>

            <input
              type="text"
              {...register("title")}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-600"
            />
          </div>
          {formState.errors.title && (
            <span className="text-red-500 text-sm">
              {formState.errors.title?.message}
            </span>
          )}

          {/* Categoria e valor */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-[10px] text-gray-400 mb-1 uppercase">
                Categoria
              </label>

              <select
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none bg-white focus:border-green-600 text-gray-500"
                {...register("category")}
                defaultValue={"Selecione"}
              >
                <option value={""}>Selecione</option>
                {Categories.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
               {formState.errors.category && (
              <span className="text-red-500 text-sm">
                {formState.errors.category.message}
              </span>
            )}
            </div>
           
            <div>
              <label className="block text-[10px] text-gray-400 mb-1 uppercase">
                Valor
              </label>
              {formState.errors.value && (
                <span className="text-red-500 text-sm">
                  {formState.errors.value.message}
                </span>
              )}

              <input
                type="number"
                min={1}
                placeholder="0,00"
                {...register("value", { setValueAs: (v) => (v === "" ? v = 0 : Number(v) ) })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-green-600"
              />
            </div>
          </div>

          {/* Comprovante */}
          <div className="mt-4">
            <label className="block text-[10px] text-gray-400 mb-1 uppercase">
              Comprovante
            </label>

            <div className="flex items-center">
              <input
                type="text"
                placeholder={file?.name ?? "Nenhum arquivo selecionado"}
                readOnly
                className="flex-1 border border-gray-200 rounded-l-lg px-3 py-2 text-sm outline-none bg-white"
              />

              <label className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-r-lg cursor-pointer flex items-center justify-center">
                ⤴
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    if (!file) return;
                    setFile(file);
                    setValue("receipt", file, { shouldValidate: true });
                  }}
                />
              </label>
            </div>
          </div>
          {formState.errors.receipt && (
            <span className="text-red-500 text-sm">
              {formState.errors.receipt.message}
            </span>
          )}

          {/* Botão enviar */}
          <button
            type="submit"
            className="w-full mt-6 bg-green-700 text-white py-3 rounded-lg font-medium hover:bg-green-600 cursor-pointer"
          >
            Enviar
          </button>
        </form>
      </main>
    </div>
  );
}
export default NewRefundRequest;
