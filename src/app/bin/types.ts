import { WikiResponse } from "./wiki-response"

export type HistoryType = {
    text: string,
    time: string
}

export type SearchItemResponse = {
    query: string,
    response: WikiResponse
}

export type PagesList = {
    sroffset: number,
    totalhits: number
}

export type SearchType = {
    value?: string,
    offset?: number,
    updateHistory?: boolean, 
}