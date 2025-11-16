import './dialog-box.scss';

export const DialogBox = ({ dialog, nextDialog }) => {
    return (
        <>
            <div className="dialog-box__container" onClick={() => nextDialog()}>
                <span>
                    {dialog?.desc}
                </span>
            </div>
            {
                dialog?.img &&
                <img className="dialog-box__speaker" src={`.././img/characters/${dialog.img}`} />
            }
        </>
    )
}
