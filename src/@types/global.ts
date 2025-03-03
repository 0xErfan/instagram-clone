export type ResponseType = {
    success: boolean
    data: Record<string, any>
    status: number
    message: string
    errors: string[]
}