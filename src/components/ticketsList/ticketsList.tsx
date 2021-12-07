import TicketCard from "components/ticket/ticket";
import { Ticket } from "types"
import Button from 'components/button/button';
import { MAX_TICKETS_AMOUNT } from 'const';
import './styles.css';

type TicketsListProps = {
  tickets: Ticket[],
  numberOfTicketsShown: number,
  onClick: () => void,
  className: string,
}

export default function TicketsList(props: TicketsListProps): JSX.Element {
  const { tickets, numberOfTicketsShown, onClick, className='' } = props;
  
  return (
    <div className="tickets-list__wrap" >
    <ul className={`tickets-list ${className}`}>
      {tickets.slice(0, numberOfTicketsShown).map((ticket, idx) => {
        return (
          <li key={idx}>
            <TicketCard ticket={ticket} />
          </li>
        )
      })}
    </ul>
    {!(numberOfTicketsShown >= tickets.length) && (
      <Button
        onClick={onClick}
        className=""
      >
        {`Показать еще ${MAX_TICKETS_AMOUNT} билетов!`} 
      </Button>
    )}
    </div>
  )
}