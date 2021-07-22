export type WikiResponse = {
    batchcomplete?: string,
    continue?: ContinueType,
    query?: QueryType
}

type ContinueType = {
    continue: string,
    sroffset: 10
}

export type QueryType = {
    search: SearchElement[],
    searchinfo: SerchInfoType
} 

export type SearchElement = {
    ns?: number,
    pageid?: number,
    size?: number,
    snippet?: string,
    timestamp?: string,
    title?: string,
    wordcount?: number,
}

type SerchInfoType = {
    totalhits: number
}