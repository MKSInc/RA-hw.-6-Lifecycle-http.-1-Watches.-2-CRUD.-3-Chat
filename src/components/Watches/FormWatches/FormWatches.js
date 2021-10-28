import { useState } from 'react';
import PropTypes from 'prop-types';
import './form-watches.css';

// Проверять временную зону одной регуляркой во время ввода не получилось.
const regTimezone1 = /^[+-\d]?$/; // Проверка на ввод первого символа.
const regTimezone2 = /^[+-]?\d{1,2}$/; // Проверка на ввод остальных символов.

function FormWatches({ addItem }) {
  const formEmptyValue = { title: '', timezone: '' };
  const [form, setForm] = useState(formEmptyValue);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Эта конструкция условий не пропускает значения в input, которые не соответствуют формату временной зоны,
    // и пропускает пустую строку (позволяя тем самым очистить input).
    if (name === 'timezone') {
      if (value.length === 1) {
        if (!regTimezone1.test(value)) return;
      } else if (value.length > 1) {
        if (!regTimezone2.test(value)) return;
      }
    }

    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.title.length === 0 || form.timezone.length === 0) return;

    addItem({
      title: form.title,
      timezone: parseInt(form.timezone),
    });

    setForm(formEmptyValue);
  }

  return (
    <form className={'watches__form form-watches'} onSubmit={handleSubmit}>
        <div className={'form-watches__body'}>
          <div className={'form-watches__column form-watches__column-1'}>
            <div className={'form-watches__item item-form-watches'}>
              <label className={'item-form-watches__title'} htmlFor={'watches-input-title'}>Название</label>
              <input 
                className={'item-form-watches__input'}
                id={'watches-input-title'}
                name={'title'}
                value={form.title}
                onChange={handleInputChange} />
            </div>
          </div>

          <div className={'form-watches__column form-watches__column-2'}>
            <div className={'form-watches__item item-form-watches'}>
              <label className={'item-form-watches__title'} htmlFor={'watches-input-timezone'}>Временная зона</label>
              <input 
                className={'item-form-watches__input'}
                id={'watches-input-timezone'}
                name={'timezone'}
                value={form.timezone}
                onChange={handleInputChange}
                placeholder={'Примеры: 2, 0, -1, +3'} />
            </div>
          </div>

          <div className={'form-watches__column form-watches__column-3'}>
            <div className={'form-watches__item item-form-watches'}>
              <button className={'item-form-watches__btn'}>Добавить</button>
            </div>
          </div>
        </div>
      </form>
  )
}

FormWatches.propTypes = {
  addItem: PropTypes.func.isRequired,
}

export default FormWatches;
