export type RESTMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface DefaultAJAXResponse {
    ok: boolean,
    response?: Record<string, unknown>,
    message: string,
    error?: string
}
