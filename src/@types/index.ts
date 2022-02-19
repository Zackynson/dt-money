export type Transaction = {
    id?: string,
    title: string,
    type: 'deposit' | 'withdraw',
    amount: number,
    category: string,
    createdAt: Date
}
