import React from 'react';
import CrudHeader from './CrudHeader/CrudHeader';
import FormCrud from './FormNewNote/FormNewNote';
import Note from './Note/Note';
import links from './utility/links';
import './crud.css';

export default class CRUD extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
    };
  }

  handleNoteRemove = async (noteID) => {
    const response = await fetch(`${links.notes}/${noteID}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    if (!data.success) return;

    this.requestNotes();
  }

  requestNotes = async () => {
    const response = await fetch(`${links.notes}`);
    const notes = await response.json();
    this.setState((prevState) => ({ ...prevState, notes }));
  }

  requestAddingNote = async (content) => {
    const response = await fetch(`${links.notes}`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    })

    const data = await response.json();
    if (!data.success) return;

    this.requestNotes();
  }

  componentDidMount() {
    this.requestNotes();
  }

  render() {
    return (
      <div className={'crud'}>
        <CrudHeader requestNotes={this.requestNotes} />

        <div className={'crud__notes'}>
          {this.state.notes.map((note) => 
            <div className={'crud__note'} key={note.id}>
              <Note note={note} handleNoteRemove={this.handleNoteRemove}/>
            </div>
          )}
        </div>

        <FormCrud requestAddingNote={this.requestAddingNote}/>
      </div>
    )
  }
}
