import { TransferFilterOption, Segments, SortOption, Ticket } from 'types';

const TransferFilterAmount = {
  [TransferFilterOption.All]: -1,
  [TransferFilterOption.NoTransfer]: 0,
  [TransferFilterOption.OneTransfer]: 1,
  [TransferFilterOption.TwoTransfer]: 2,
  [TransferFilterOption.ThreeTransfer]: 3,
}

const filterByStops = (tickets: Ticket[], stopsNum: number): Ticket[] => {
  return tickets.filter(ticket => {
    const [firstSegment, secondSegment] = ticket.segments;
    return (
      firstSegment.stops.length === stopsNum &&
      secondSegment.stops.length === stopsNum
    )
  })
}

export const getSumDuration = (array: Segments) => {
  const sumDuration = array[0].duration + array[1].duration;
  return sumDuration;
}

export const getSumStops = (array: Segments) => {
  const sumStops = array[0].stops.length + array[1].stops.length;
  return sumStops;
}

export const filterTickets = (
  tickets: Ticket[],
  filterBy: TransferFilterOption[]
): Ticket[] => {
  if (filterBy.length === 0 || filterBy.includes(TransferFilterOption.All)) {
    return tickets;
  }
  return filterBy.reduce<Ticket[]>((acc, filter) => (
    [...acc, ...filterByStops(tickets, TransferFilterAmount[filter])]
  ), [])
}

export const sortTickets = (
  tickets: Ticket[],
  sortBy: SortOption
): Ticket[] => {
  const ticketsCopy = [...tickets];
  switch (sortBy) {
    case SortOption.Сheap:
      return ticketsCopy.sort((a, b) => a.price - b.price);
    case SortOption.Fast:
      return ticketsCopy.sort((a, b) => getSumDuration(a.segments) - getSumDuration(b.segments));
      case SortOption.Optimal:
      return ticketsCopy.sort((a, b) => getSumStops(a.segments) - getSumStops(b.segments));
    default:
      throw Error(`No such sort type: ${sortBy}`);
  }
}


