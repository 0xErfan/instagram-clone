export type Response = {
    success: boolean
    data: { [key: string]: any }
    status: number
    message: string
    errors: string[]
}