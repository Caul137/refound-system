import { Link, useNavigate } from "react-router-dom";
import { Categories } from "../../components/Categories";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { RefundInterface } from "../../interfaces/RefundInterface";
import { api } from "../../../services/api";

function NewRefundRequest() {
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm<RefundInterface>({
    defaultValues: {
      title: "",
      category: "",
      value: 0,
      receipt: file,
    },
  });

  const newRefund = async (data: RefundInterface) => {
    if (!data.title || !data.category || !data.value) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    if (!data.receipt) {
      alert("Selecione um arquivo para comprovar a despesa");
      return;
    }

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
                <option disabled>Selecione</option>
                {Categories.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-gray-400 mb-1 uppercase">
                Valor
              </label>

              <input
                type="number"
                placeholder="0,00"
                {...register("value", { valueAsNumber: true })}
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
                  {...register("receipt")}
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    setFile(file);
                    setValue("receipt", file);
                  }}
                />
              </label>
            </div>
          </div>

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
