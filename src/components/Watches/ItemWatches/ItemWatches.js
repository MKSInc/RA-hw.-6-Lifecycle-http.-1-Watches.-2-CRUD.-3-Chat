import React from 'react';
import PropTypes from 'prop-types';
import './item-watches.css';

class ItemWatches extends React.Component {
  constructor(props) {
    super(props);
    this.interval = null;
    this.state = {
      time: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      style: {
        // Стили отвечающие за поворот стрелок.
        hand: {
          hours: {},
          minutes: {},
          seconds: {},
        }
      },
    }
  }

  getTime() {
    const date = new Date();
    const currTimezoneOffset = date.getTimezoneOffset() / 60; // Смещение локального часового пояса от нулевого (Рига -3).
    const offset = currTimezoneOffset + this.props.item.timezone;

    date.setHours(date.getHours() + offset);

    return {
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
    }
  }

  getHandStyle(deg) {
    return { transform: `translate(-50%, -100%) rotate(${deg}deg)` };
  }

  changeTime() {
    const time = this.getTime();
    this.setState((prevState) => ({
      ...prevState,
      time,
      style: {
        hand: {
          // Один час равен повороту на 30 градусов + каждая минута увеличивает поворот еще на 0.5 градуса.
          hours: this.getHandStyle(time.hours * 30 + time.minutes / 2),
          minutes: this.getHandStyle(time.minutes * 6), // Одна минута равна повороту на 6 градусов.
          seconds: this.getHandStyle(time.seconds * 6), // Одна секунда равна повороту на 6 градусов.
        }
      }
    }));
  }

  componentDidMount() {
    this.changeTime();
    // Вычисляем время до отсчета следующей секунды.
    const diff = 1000 - new Date().getMilliseconds();

    // Ждем наступления следующей секунды и запускаем интервал.
    // Это позволяет синхронизировать начало вращение стрелки с наступлением реальной секунды,
    // А также синхронизировать начало вращения стрелок между всеми компонентами.
    setTimeout(() => {
      this.interval = setInterval(() => this.changeTime(), 1000);
    }, diff);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  formatTime(digit) {
    return digit > 9 ? digit: `0${digit}`;
  }
  
  render() {
    const { item, handleItemRemove } = this.props;
    const { time: { hours, minutes, seconds }, style } = this.state;

    return (
      <div className={'watches__item item-watches'}>
        <div className={'item-watches__title'}>{item.title}</div>
        <div className={'item-watches__main'}>
          <div className={'item-watches__time-digit'}>
            {this.formatTime(hours)}:{this.formatTime(minutes)}:{this.formatTime(seconds)}
          </div>
          <div className={'item-watches__clock-face clock-face'}>
            <div className={'clock-face__hand clock-face__hour-hand'} style={style.hand.hours}></div>
            <div className={'clock-face__hand clock-face__minute-hand'} style={style.hand.minutes}></div>
            <div className={'clock-face__hand clock-face__second-hand'} style={style.hand.seconds}></div>
          </div>
  
          <button className={'item-watches__btn-remove'} onClick={() => handleItemRemove(item)}>
            <span className={'_visually-hidden'}>Удалить</span>
          </button>
        </div>
      </div>
    )
  }
}

ItemWatches.propTypes = {
  item: PropTypes.object.isRequired,
  handleItemRemove: PropTypes.func.isRequired,
}

export default ItemWatches;
