import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../services/api";
import { useEffect, useState } from "react";
import type { RefundInterface } from "../../interfaces/RefundInterface";
import TransformToR$ from "../../components/TransformToR$";
import type { ReceiptInterface } from "../../interfaces/ReceiptInterface";
import ConfirmDialog from "../../components/ui/ConfirmDialog";

function RefundRequest() {
  const { id } = useParams();
  const [user, setUser] = useState<RefundInterface>();
  const [receipt, setReceipt] = useState<ReceiptInterface>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRefund() {
      const response = await api.get("/refunds/" + id);
      setUser(response.data.refund as RefundInterface);
      setReceipt(response.data.refund.receipt);
    }
    fetchRefund();
  }, [id]);

  const deleteRefund = async () => {
    await api.delete("/refunds/" + id);
    navigate("/");
  };

  const openReceipt = async () => {
    if (!receipt?.id) return;

    const response = await api.get(`/receipts/download/${receipt.id}`);

    const url = response.data.url;

    window.open(`${api.defaults.baseURL}${url}`, "_blank");
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
          <Link to={"/"} className="text-green-700">
            Solicitações de reembolso
          </Link>

          <Link
            to="/"
            className="bg-green-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600"
          >
            Nova solicitação
          </Link>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 flex items-center justify-center px-10">
        <div className="w-full max-w-md bg-white rounded-2xl px-8 py-8 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">
            Solicitação de reembolso
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Dados da despesa para solicitar reembolso.
          </p>

          {/* Nome */}
          <div className="mt-6">
            <label className="block text-xs text-gray-500 mb-1">
              NOME DA SOLICITAÇÃO
            </label>

            <input
              disabled
              type="text"
              defaultValue={user?.title}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-green-600"
            />
          </div>

          {/* Categoria e valor */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                CATEGORIA
              </label>

              <select
                disabled
                className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none bg-white focus:border-green-600"
                defaultValue={user?.category}
              >
                <option value={user?.category}>{user?.category}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">VALOR</label>

              <input
                type="text"
                disabled
                defaultValue={user?.value ? TransformToR$(user.value) : ""}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-green-600"
              />
            </div>
          </div>

          {/* Abrir comprovante */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={openReceipt}
              type="button"
              className="flex items-center gap-2 text-green-700 text-sm font-medium hover:underline"
            >
              <span>📄</span>
              Abrir comprovante
            </button>
          </div>

          {/* Botão */}
          <ConfirmDialog onConfirm={deleteRefund} />
        </div>
      </main>
    </div>
  );
}

export default RefundRequest;
