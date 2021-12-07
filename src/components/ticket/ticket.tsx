import './style.css';
import moment from 'moment';
import { Ticket } from 'types';

type TicketCardProps = {
  ticket: Ticket
}

const formatTimeStart = (date: string, duration: number) => {
 return `${moment.parseZone(date).format('HH:mm')} - ${moment.parseZone(date).add(duration, 'minute').format('hh:mm')}`;
}

const formatTimeFlying = (minutes: number) => {
 const timeFlying = moment.duration(minutes, 'minute');
 if (timeFlying.days()) {
   return `${timeFlying.days()}д ${timeFlying.hours()}ч ${timeFlying.minutes()}м`;
 }
 if (timeFlying.hours()) {
  return `${timeFlying.hours()}ч ${timeFlying.minutes()}м`;
 }
 return `${timeFlying.minutes()}м`;
}

const formatStopsTitle = (stops: string[]) => {
  if (stops.length > 1) {
    return `${stops.length} пересадки`;
  }
  if (stops.length === 1) {
    return `${stops.length} пересадка`;
  }
  return 'Прямой рейс';
}

export default function TicketCard(props: TicketCardProps): JSX.Element {
const { ticket } = props;

  return (
    <div className="ticket">
      <div className="ticket__price-block">
        <span className="ticket__price">{ticket.price.toLocaleString('ru-RU')} Р</span>
        <img className="ticket__logo" src={`https://pics.avs.io/99/36/${ticket.carrier}.png`} alt="Логотип авиакомпании"/>
      </div>
      {ticket.segments.map(({ origin, destination, date, duration, stops }, idx) => {
        return (
          <div 
            key={idx}
            className="ticket__info-wrap">
            <div>
              <p className="ticket__info-title">{`${origin} - ${destination}`}</p>
              <p className="ticket__info-data">{formatTimeStart(date, duration)}</p>
            </div>
            <div>
              <p className="ticket__info-title">В пути</p>
              <p className="ticket__info-data">{formatTimeFlying(duration)}</p>
            </div>
            <div>
              <p className="ticket__info-title">{formatStopsTitle(stops)}</p>
              <p className="ticket__info-data">{stops.join(', ')}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
