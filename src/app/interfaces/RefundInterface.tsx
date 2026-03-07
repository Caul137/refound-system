

 export interface RefundInterface {
    id: number;
    title: string;
    value: number;
    category: string;
    receipt: File | null;
}

export type RefundNormalized = RefundInterface & {
    normalizedTitle: string;
}