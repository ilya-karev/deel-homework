export type Product = {
  id: number
  title: string,
}

export type QueryResult<TData> = [
  TData | undefined,
  { 
    isLoading: boolean,
    refetch?: (searchTitle: string) => void
  }
]

export type CommonSearchItem = {
  id: number,
  title: string
}
