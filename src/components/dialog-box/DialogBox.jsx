import { BiCaretDown } from 'react-icons/bi';
import './dialog-box.scss';

export const DialogBox = ({ dialog, nextDialog }) => {
    return (
        <>
            <div className="dialog-box__container" onClick={() => nextDialog()}>
                <span>
                    {dialog?.desc}
                </span>
                <span className="dialog-box__arrow-container">
                    <BiCaretDown fill='black' />
                </span>
            </div>
            {
                dialog?.img &&
                <img className={`dialog-box__speaker ${dialog.npc ? 'dialog-box__speaker--npc' : ''}`} src={`.././img/characters/${dialog.img}`} />
            }
        </>
    )
}
