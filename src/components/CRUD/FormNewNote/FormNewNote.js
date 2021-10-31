import { useState } from 'react';
import './form-crud.css';

function FormNewNote({ requestAddingNote }) {
  const [form, setForm] = useState({
    content: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ prevForm, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.content.length === 0) return;
    requestAddingNote(form.content);
  }

  return (
    <form className={'crud__form form-new-note'} onSubmit={handleSubmit}>
      <header className={'form-new-note__header'}>
        <div className={'form-new-note__title'}>New Note</div>
        <button className={'form-new-note__btn-send'}>
          <span className={'_visually-hidden'}>send</span>
        </button>
      </header>
      <textarea 
        className={'form-new-note__input'} 
        name={'content'} 
        value={form.content} 
        onChange={handleInputChange}
        rows={'8'}></textarea>
    </form>
  )
}

export default FormNewNote;
