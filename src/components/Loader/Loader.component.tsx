import logo from './logo.svg';

import './Loader.styles.css';

const Loader = () => {
  return (
    <div className="loader">
      <img src={logo} className="loader__logo" alt="logo" />
    </div>
  )
}

export default Loader
