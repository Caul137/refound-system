
export function Item({ name, category, value, icon }: any) {
  return (
    <div className="flex items-center justify-between">

      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[#EAF3EE] flex items-center justify-center text-lg">
          {icon}
        </div>

        <div>
          <div className="font-semibold text-gray-800">{name}</div>
          <div className="text-sm text-gray-500">{category}</div>
        </div>
      </div>

      <div className="font-semibold text-gray-700">
        {value}
      </div>

    </div>
  )
}