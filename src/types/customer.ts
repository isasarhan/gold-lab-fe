export enum CustomerType {
    Individual = 'individual',     // فرد
    Wholesaler = 'wholesaler',     // تاجر جملة
    Retailer = 'retailer',         // بائع تجزئة
    Distributor = 'distributor',   // موزّع
    Reseller = 'reseller',         // معيد بيع
    Corporate = 'corporate',       // شركة
    Government = 'government',     // جهة حكومية
}

export interface ICustomer {
    _id?: string
    name: string
    email: string
    phone: string
    location: string
    type: CustomerType;
}