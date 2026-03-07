


export default function TransformToR$(value: number) {
  const numberConvert = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return numberConvert

}
