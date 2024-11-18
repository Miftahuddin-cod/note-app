import React from 'react';

class NoteInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
            maxTitleLength: 50,
        }

        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }

    onTitleChangeEventHandler(event) {
        const { maxTitleLength } = this.state;
        const title = event.target.value;

        if (title.length <= maxTitleLength) {
            this.setState({
                title,
            });
        }
    }

    onBodyChangeEventHandler(event) {
        this.setState(() => {
            return {
                body: event.target.value,
            }
        });
    }

    onSubmitEventHandler(event) {
        event.preventDefault();
    
        if (this.state.title.trim() === '' || this.state.body.trim() === '') {
            alert('Judul dan Isi catatan tidak boleh kosong!');
            return; 
        }
        
        this.props.addNote(this.state);
    }

    render() {
        const remainingCharacters = this.state.maxTitleLength - this.state.title.length;

        return (
            <div className='note-input'>
                <h2 className='note-input__title'>Buat Catatan</h2>
                <div className='note-input__title__char-limit'>Sisa Karakter : {remainingCharacters}</div>
                <form onSubmit={this.onSubmitEventHandler}>
                    <input type="text" placeholder="Ini adalah judul ..." value={this.state.title} onChange={this.onTitleChangeEventHandler} />
                    <textarea className='note-input__body' placeholder='Tuliskan catatanmu disini ...' value={this.state.body} onChange={this.onBodyChangeEventHandler} />
                    <button type="submit">Buat</button>
                </form>
            </div>
        )
    }
}

export default NoteInput;