import { TransferFilterOption } from 'types';
import './style.css';

type FilterProps = {
  onChange: (option: TransferFilterOption) => void,
  className: string
}

const FilterOptionLabel = {
  [TransferFilterOption.All]: 'Все',
  [TransferFilterOption.NoTransfer]: 'Без пересадок',
  [TransferFilterOption.OneTransfer]: '1 пересадка',
  [TransferFilterOption.TwoTransfer]: '2 пересадки',
  [TransferFilterOption.ThreeTransfer]: '3 пересадки',
}

export default function Filters(props: FilterProps): JSX.Element {
  const { onChange, className = '' } = props;

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    onChange(value as TransferFilterOption)
  }

  return (
    <section className={`filters ${className}`}>
      <h1 className="filters__title">Количество пересадок</h1>
      <ul className="filters__list">
        {Object.values(TransferFilterOption).map((option) => (
          <li key={option} className="filters__item">
            <input
              className="filters__checkbox visually-hidden"
              type="checkbox"
              onChange={handleChange}
              value={option}
              id={option}
            />
            <label htmlFor={option}>{FilterOptionLabel[option]}</label>
          </li>
        ))}
      </ul>
    </section>
  );
}