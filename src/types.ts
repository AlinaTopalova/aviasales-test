export type Segment = {
  origin: string
  destination: string
  date: string
  stops: string[]
  duration: number
}

export type Segments = [Segment, Segment]

export type Ticket = {
  price: number
  carrier: string
  segments: Segments
}

export enum TransferFilterOption {
  All = 'ALL',
  NoTransfer = 'NO_TRANSFER',
  OneTransfer = 'ONE_TRANSFER',
  TwoTransfer = 'TWO_TRANSFER',
  ThreeTransfer = 'THREE_TRANSFER',
}

export enum SortOption {
  Сheap = 'CHEAP',
  Fast = 'FAST',
  Optimal = 'OPTIMAL'
}


