import { useState } from 'react';
import { MAX_TICKETS_AMOUNT } from 'const';
import { TransferFilterOption, SortOption } from 'types';
import Header from 'components/header/header';
import Filters from 'components/filters/filters';
import Sort from 'components/sort/sort';
import TicketsList from 'components/ticketsList/ticketsList';
import Loader from 'loader/loader';
import { useTicketsData } from 'hooks';
import './style.css';

export default function App() {
  const [
    numberOfTicketsShown, setNumberOfTicketsShown
  ] = useState<number>(MAX_TICKETS_AMOUNT);

  const [sortBy, setSortBy] = useState<SortOption>();

  const [filterBy, setFilterBy] = useState<TransferFilterOption[]>([]);

  const { data: tickets, isError, isLoaded, isLoading } = useTicketsData({
    filterBy,
    sortBy,
  });

  const handleShowMoreClick = () => {
    if (numberOfTicketsShown + MAX_TICKETS_AMOUNT <= tickets.length) {
      setNumberOfTicketsShown(numberOfTicketsShown + MAX_TICKETS_AMOUNT);
    } else {
      setNumberOfTicketsShown(tickets.length)
    }
  }

  const handleFilterChange = (option: TransferFilterOption) => {
    const newFilters = filterBy.includes(option)
      ? filterBy.filter((filter) => filter !== option)
      : [option, ...filterBy];
    setFilterBy(newFilters);
  }

  return (
    <div className="container">
      <Header />
        {isLoading && (
          <Loader />
        )}
        {isError && (
          <div className="error-message">Произошла ошибка во время загрузки данных</div>
        )}
        {isLoaded && (
          <div className="main-wrap">
            <Filters
              className='main-wrap__filters'
              onChange={handleFilterChange}
            />
            <Sort
              onClick={setSortBy} 
              sortBy={sortBy}
            />
            <TicketsList
              className='main-wrap__tickets-wrap'
              numberOfTicketsShown={numberOfTicketsShown}
              onClick={handleShowMoreClick} 
              tickets={tickets}
            />
          </div>
        )}
    
    </div>
  );
}
