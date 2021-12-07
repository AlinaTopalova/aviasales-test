import './style.css';

type ButtonProps = {
  onClick: () => void,
  className: string,
  children: string
}

export default function Button(props: ButtonProps): JSX.Element {
  const { onClick, className='', children } = props;
  
  return (
    <button
      className={`button ${className}`}
      type="button"
      onClick = {onClick}
    >
      {children}
    </button>
  )
}