

 export interface RefundInterface {
    id: number;
    title: string;
    value: number;
    category: string;
    receipt: File | null;
}