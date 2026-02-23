export default function SuccessRequest() {
  return (
    <div className="w-screen h-screen bg-[#EEF3F0] flex flex-col">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-10 py-6">
        <div className="flex items-center gap-2 text-green-700 font-semibold">
          <span className="text-xl">↺</span>
          refund
        </div>

        <div className="flex items-center gap-6">
          <span className="text-green-700">Solicitações de reembolso</span>
          <button className="bg-green-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-600">
            Nova solicitação
          </button>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl px-10 py-10 shadow-sm flex flex-col items-center text-center">
          <h2 className="text-green-700 text-xl font-semibold mb-6">
            Solicitação enviada!
          </h2>

          {/* Ícone */}
          <div className="mb-6">
            <div className="w-24 h-24 rounded-full border-4 border-green-600 flex items-center justify-center">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1f8b5a"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-8 leading-relaxed">
            Agora é apenas aguardar! Sua solicitação será analisada e, em breve,
            o setor financeiro irá entrar em contato com você.
          </p>

          <button className="w-full bg-green-700 text-white py-3 rounded-lg font-medium hover:bg-green-600">
            Nova solicitação
          </button>
        </div>
      </main>
    </div>
  );
}
