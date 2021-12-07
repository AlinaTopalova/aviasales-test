import './style.css';

export default function Header(): JSX.Element {

  return (
    <div className="logo-wrap">
      <img 
        className="logo"
        src="img/logo.png"
        alt="Логотип Aviasales"
      />
    </div>
  )
}