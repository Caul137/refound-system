import { Link, Outlet } from "react-router-dom";
import { Item } from "../../components/Item";
// import type { RefundInterface } from "../../interfaces/RefundInterface.tsx"

export default function Home() {



  return (
    <div className="w-screen h-screen bg-[#EEF3F0] flex flex-col">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-10 py-6">
        <div className="flex items-center gap-2 text-green-700 font-semibold">
          <Link to={""} className="text-xl">↺
          refund
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-green-700">Solicitações de reembolso</span>
          <Link to={"newRefundRequest"}  className="bg-green-700 text-white px-6 py-2 rounded-lg font-medium cursor-pointer hover:bg-green-600 ">
            Nova solicitação
          </Link>
        </div>
      </header>
     <Outlet/>
      {/* Card */}
      <main className="flex-1 flex justify-center items-start px-10">
        <div className="w-full max-w-6xl bg-white rounded-2xl px-10 py-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Solicitações</h2>

          {/* Search */}
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Pesquisar pelo nome"
              className="flex-1 border border-gray-200 rounded-lg px-4 py-3 outline-none"
            />

            <button className="bg-green-700 text-white px-4 rounded-lg flex items-center justify-center cursor-pointer hover:bg-green-600">
              🔍
            </button>
          </div>

          <div className="border-t border-gray-100 pt-6">
            {/* Lista */}
            <div className="flex flex-col gap-6">

              <Item
                name="Rodrigo"
                category="Alimentação"
                value="R$ 34,78"
                icon="🍴"
              />
              
            </div>

            {/* Paginação */}
            <div className="flex justify-center items-center gap-4 mt-10">
              <button className="bg-green-700 text-white w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-green-600 ">
                ‹
              </button>

              <span className="text-gray-600">1/1</span>

              <button className="bg-green-700 text-white w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-green-600">
                ›
              </button>
            </div>
          </div>
        </div>
      </main>
     
    </div>
  );
}
