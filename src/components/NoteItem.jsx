import React from 'react';
import { showFormattedDate } from '../utils';
import DeleteButton from './DeleteButton';
import ArchiveButton from './ArchiveButton';

function NoteItem({ id, title, body, archived, createdAt, onDelete, onArchive }) {
    return (
        <div className='note-item'>
            <div className="note-item__content">
                <h3 className='note-item__title'>{title}</h3>
                <div className='note-item__date'>{showFormattedDate(createdAt)}</div>
                <div className='note-item__body'>{body}</div>
            </div>
            <div className='note-item__action'>
                <DeleteButton id={id} onDelete={onDelete} />
                <ArchiveButton id={id} onArchive={onArchive} archived={archived}/>
            </div>
        </div>
    );
}

export default NoteItem;