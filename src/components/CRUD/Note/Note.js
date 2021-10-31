import './note.css';
import PropTypes from 'prop-types';

function Note({ note, handleNoteRemove }) {
  return (
    <div className={'note'}>
      <div className={'note__body'}>
        <p className={'note__text'}>{note.content}</p>
        <button className={'note__btn-remove'} onClick={() => handleNoteRemove(note.id)}>
          <span className={'_visually-hidden'}>remove</span>
        </button>
      </div>
    </div>
  )
}

Note.propTypes = {
  note: PropTypes.object.isRequired,
  handleNoteRemove: PropTypes.func.isRequired,
}

export default Note;