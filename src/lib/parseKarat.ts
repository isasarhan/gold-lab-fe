import { Karat } from "@/types/invoice"

export const parseInvoiceKarat = (karat: Karat) => {
    switch (karat) {
        case Karat.K18:
            return 750
        case Karat.K21:
            return 875
        default:
            return 750
    }
}
export const parseReceiptKarat = (karat: number) => {
    if (karat === 995) return 1
    return karat / 1000
}