import React from 'react';
import NoteList from './NoteList';
import { getInitialData } from "../utils";
import NoteInput from './NoteInput';

class NoteApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: getInitialData(),
            searchKeyword: '',
        };

        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onArchiveHandler = this.onArchiveHandler.bind(this);
        this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
        this.onSearchNoteHandler = this.onSearchNoteHandler.bind(this);
    }

    onDeleteHandler(id) {
        const notes = this.state.notes.filter(note => note.id !== id);
        this.setState({ notes });
    }

    onArchiveHandler(id) {
        const notes = this.state.notes.map(note =>
            note.id === id ? { ...note, archived: !note.archived } : note
        );
        this.setState({ notes });
    }

    onAddNoteHandler({ title, body }) {
        this.setState((prevState) => {
            return {
                notes: [
                    ...prevState.notes,
                    {
                        id: +new Date(),
                        title,
                        body,
                        archived: false,
                        createdAt: new Date(),
                    }
                ]
            }
        });
    }

    onSearchNoteHandler(event) {
        this.setState({ searchKeyword: event.target.value });
    }

    render() {
        const filteredNotes = this.state.notes.filter(note =>
            note.title.toLowerCase().includes(this.state.searchKeyword.toLowerCase())
        );
        const activeNotes = filteredNotes.filter(note => note.archived === false);
        const archivedNotes = filteredNotes.filter(note => note.archived === true);

        return (
            <div>
                <div className='note-app__header'>
                    <h1>Notes App</h1>
                    <div className='note-search'>
                        <input type='text' value={this.state.searchKeyword} placeholder='Cari catatan ...' onChange={this.onSearchNoteHandler} />
                    </div>
                </div>
                <div className='note-app__body'>
                    <NoteInput addNote={this.onAddNoteHandler} />
                    <h2>Catatan Aktif</h2>
                    <NoteList notes={activeNotes} onDelete={this.onDeleteHandler} onArchive={this.onArchiveHandler} />
                    <h2>Arsip</h2>
                    <NoteList notes={archivedNotes} onDelete={this.onDeleteHandler} onArchive={this.onArchiveHandler} />
                </div>
            </div >
        )
    }
}

export default NoteApp;