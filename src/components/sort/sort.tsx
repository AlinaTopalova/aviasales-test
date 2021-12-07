import { SortOption } from 'types';
import './style.css';

type SortProps = {
  onClick: (option: SortOption) => void,
  sortBy?: SortOption,
}

const SortOptionLabel = {
  [SortOption.Сheap]: 'Самый дешевый',
  [SortOption.Fast]: 'Самый быстрый',
  [SortOption.Optimal]: 'Оптимальный',
}

export default function Sort(props: SortProps): JSX.Element {
  const { onClick, sortBy } = props;

  return (
    <section className="sort__wrap">
      <ul className="sort__list">
        {Object.values(SortOption).map((option) => {
          const isSelected = sortBy === option;

          return (
            <li
              key={option}
              className={`sort__item ${isSelected ? 'sort__item--active' : ''}`}
              tabIndex={0}
              onClick={() => onClick(option)}
            >
              {SortOptionLabel[option]}
            </li>
          )
        })}
      </ul>
    </section>
  )
}