import { useState } from 'react';
import PropTypes from 'prop-types';
import './crud__header.css'

function CrudHeader({ requestNotes }) {
  const [isBtnAnimated, setIsBtnAnimated] = useState(false);

  const handleClick = () => {
    if (isBtnAnimated) return;
    setIsBtnAnimated(true);
    setTimeout(() => setIsBtnAnimated(false), 500);

    requestNotes();
  }
  
  return (
    <header className={'crud__header'}>
      <div className={'crud__title'}>Notes</div>
      <button className={`crud__btn-udate${isBtnAnimated ? ' crud__btn-udate_animated': ''}`} onClick={handleClick}>
        <span className={'material-icons'}>autorenew</span>
        <span className={'_visually-hidden'}>update</span>
      </button>
    </header>
  )
}

CrudHeader.propTypes = {
  requestNotes: PropTypes.func.isRequired,
}

export default CrudHeader;