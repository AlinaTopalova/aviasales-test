import './style.css';

export default function Loader(): JSX.Element {
  return (
  <div className="loading-container">
    <div className="shapes-container">
      <div className="circle left-circle"></div>
      <div className="circle middle-circle"></div>
      <div className="circle right-circle"></div>
	  </div>
	  <p className="loading-text">Loading...</p>
  </div>
  )
};