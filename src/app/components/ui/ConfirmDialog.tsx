import * as AlertDialog from "@radix-ui/react-alert-dialog";


type ConfirmDialogProps = {
  onConfirm: () => void;

};


export default function ConfirmDialog({
  onConfirm,

}: ConfirmDialogProps) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button  className="w-full mt-6 cursor-pointer bg-green-700 text-white py-3 rounded-lg font-medium hover:bg-green-600">
          Excluir
        </button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/40" />

        <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg w-[350px]">
          <AlertDialog.Title className="text-lg font-semibold">
			Excluir reembolso
		  </AlertDialog.Title>

          <AlertDialog.Description className="text-sm text-gray-500 mt-2">
			Você tem certeza que deseja excluir este reembolso? Esta ação não pode ser desfeita.
		  </AlertDialog.Description>

          <div className="flex justify-end gap-3 mt-6">
            <AlertDialog.Cancel className="px-4 py-2 cursor-pointer hover:bg-gray-100">
				Cancelar		
			</AlertDialog.Cancel>

            <AlertDialog.Action 
              onClick={onConfirm}
              className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-600"
            >
              Confirmar
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
