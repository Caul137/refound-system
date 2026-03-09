import { Link, Outlet } from "react-router-dom";
import { Item } from "../../components/Item";
import { api } from "../../../services/api";
import { useEffect, useMemo, useState } from "react";
import type {
  RefundInterface,
  RefundNormalized,
} from "../../interfaces/RefundInterface";

import MagnifyingGlass from "../../../assets/MagnifyingGlass.png";
import CaretLeft from "../../../assets/CaretLeft.png";
import CaretRight from "../../../assets/CaretRight.png";
import { CategoryToImage } from "../../components/CategoryToImage";
import { normalizeText } from "../../components/CleanSearchText";
import TransformToR$ from "../../components/TransformToR$";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [refundsMap, setRefundsMap] = useState<RefundNormalized[]>([]);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    const time = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(time);
  }, [search]);


  const normalizedSearch = normalizeText(debouncedSearch);
  const searchRefunds = useMemo(() => {
    return refundsMap.filter((s) =>
      s.normalizedTitle.includes(normalizedSearch),
    );
  }, [refundsMap, normalizedSearch]);

  useEffect(() => {
    async function fetchRefunds() {
      const response = await api.get(`/refunds`, {
        params: {
          page: page,
        },
      });

      const normalize = response.data.refunds.data.map(
        (refund: RefundInterface) => ({
          ...refund,
          normalizedTitle: normalizeText(refund.title),
        }),
      );

      setRefundsMap(normalize);
      setTotalPages(response.data.refunds.meta.lastPage);
    }
    fetchRefunds();
  }, [page]);

  return (
    <div className="w-screen min-h-screen  bg-[#EEF3F0] flex flex-col">
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
            to={"newRefundRequest"}
            className="bg-green-700 text-white px-6 py-2 rounded-lg font-medium cursor-pointer hover:bg-green-600 "
          >
            Nova solicitação
          </Link>
        </div>
      </header>
      <Outlet />
      {/* Card */}
      <main className="flex-1 flex justify-center items-start px-10 pb-10">
        <div className="w-full h-auto max-w-6xl bg-white rounded-2xl px-10 py-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Solicitações</h2>

          {/* Search */}
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Pesquisar pelo nome"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border border-gray-200 rounded-lg px-4 py-3 outline-none"
            />

            <button className="bg-green-700 text-white px-4 rounded-lg flex items-center justify-center cursor-pointer hover:bg-green-600">
              <img src={MagnifyingGlass} alt="" className="w-6 h-6" />
            </button>
          </div>

          <div className="border-t border-gray-100 pt-6">
            {/* Lista */}
            <div className="flex flex-col gap-6">
              {searchRefunds.map((r: RefundNormalized) => (
                <div key={r.id}>
                  <Link to={`/refunds/${r.id}`}>
                    <Item
                      name={r.title}
                      category={r.category}
                      value={TransformToR$(r.value)}
                      icon={CategoryToImage(r.category)}
                    />
                  </Link>
                </div>
              ))}
            </div>

            {/* Paginação */}
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={() => [page > 1 && setPage(page - 1), setSearchParams({ page: String(page - 1) })]}
                className="bg-green-700 text-white w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-green-600 "
              >
                <img src={CaretLeft} alt="" className="w-6 h-6" />
              </button>

              <span className="text-gray-600">
                {page}/{totalPages}
              </span>

              <button
                onClick={() =>[ page < totalPages && setPage(page + 1),  setSearchParams({ page: String(page + 1) })]}
                className="bg-green-700 text-white w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-green-600"
              >
                <img src={CaretRight} alt="" className="w-6 h-6 " />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
