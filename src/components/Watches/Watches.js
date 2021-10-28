import React from 'react';
import FormWatches from './FormWatches/FormWatches';
import ItemWatches from './ItemWatches/ItemWatches';
import { nanoid } from 'nanoid';
import './watches.css';

const watchesDefValue = [
  {
    id: nanoid(),
    title: 'Москва',
    timezone: 3,
  },
  {
    id: nanoid(),
    title: 'Лондон',
    timezone: 1,
  }
];

export default class Watches extends React.Component {
  constructor(props) {
    super(props)
    this.state = { watches : watchesDefValue };
  }

  addItem = (item) => {
    item.id = nanoid();
    this.setState((prevState) => ({ ...prevState, watches: [...prevState.watches, item]}));
  }

  handleItemRemove = (item) => {
    this.setState((prevState) => ({ 
      ...prevState,
      watches: prevState.watches.filter((prevItem) => prevItem.id !== item.id) 
    }));
  }

  render() {
    return (
      <div className={'watches'}>
        <FormWatches addItem={this.addItem} />

        <div className={'watches__items'}>
          {this.state.watches.map((item) => 
            <ItemWatches 
              key={item.id}
              item={item}
              handleItemRemove={this.handleItemRemove} />)}
        </div>
      </div>
    )
  }
}
