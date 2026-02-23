import { Link } from "react-router-dom";
import { Categories } from "../../components/Categories";

function RefundRequest() {
  return (
    <div className="w-screen h-screen bg-[#EEF3F0] flex flex-col">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-10 py-6">
        <div className="flex items-center gap-2 text-green-700 font-semibold">
          <Link to={""} className="text-xl">
            ↺ refund
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-green-700">Solicitações de reembolso</span>

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
              type="text"
              defaultValue="Rodrigo"
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
                className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none bg-white focus:border-green-600"
                defaultValue="Alimentação"
              >
                {Categories.map((item) => (
                  <option key={item.id} value={item.name}>{item.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">VALOR</label>

              <input
                type="text"
                defaultValue="34,78"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-green-600"
              />
            </div>
          </div>

          {/* Abrir comprovante */}
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              className="flex items-center gap-2 text-green-700 text-sm font-medium hover:underline"
            >
              <span>📄</span>
              Abrir comprovante
            </button>
          </div>

          {/* Botão */}
          <button className="w-full mt-6 bg-green-700 text-white py-3 rounded-lg font-medium hover:bg-green-600">
            Excluir
          </button>
        </div>
      </main>
    </div>
  );
}

export default RefundRequest;
