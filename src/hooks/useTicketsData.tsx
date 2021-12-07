import { useEffect, useMemo, useState } from "react";
import { getTickets } from 'api';
import { TransferFilterOption, SortOption, Ticket } from 'types';
import { filterTickets, sortTickets } from 'utils';

type UseTicketsData = (params: { filterBy: TransferFilterOption[], sortBy?: SortOption }) => {
  data: Ticket[],
  isError: boolean,
  isLoaded: boolean,
  isLoading: boolean
}

export const useTicketsData: UseTicketsData = (params) => {
  const { filterBy, sortBy } = params;

  const [tickets, setTickets] = useState<Ticket[]>([]);

  const [isError, setIsError] = useState<boolean>(false);

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const filteredTickets = useMemo(
    () => filterTickets(tickets, filterBy),
    [filterBy, tickets]
  );

  const sortedTickets = useMemo(
    () => {
      if (!sortBy) {
        return filteredTickets;
      }
      return sortTickets(filteredTickets, sortBy)
    },
    [sortBy, filteredTickets]
  );

  useEffect(() => {
    const fetchTickets = async() => {
      try {
        const tickets = await getTickets();
        setTickets(tickets);
        setIsLoaded(true);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTickets();
  }, []);

  return {
    data: sortedTickets,
    isError,
    isLoaded,
    isLoading,
  }
}