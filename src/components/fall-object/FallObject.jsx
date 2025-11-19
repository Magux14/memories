
import './fall-object.scss';
export const FallObject = ({ imgName, callbackClose }) => {
    return (
        <div className="fall-container" onClick={() => callbackClose()}
            style={{
                backgroundImage: `url(../img/background/wood.webp)`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <img src={`../img/objects/${imgName}`} className="falling-object" />
            {/* <img src={`../img/characters/jor.webp`} className="falling-object" /> */}
        </div>
    )
}
