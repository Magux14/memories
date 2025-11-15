import { useEffect } from 'react';
import { useDialog } from '../../hooks/dialog';
import { lstStories } from '../../../data/stories';
import './home-page.scss';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {

    const { setDialog, nextDialog, currentDialog } = useDialog();
    const navigate = useNavigate()


    const goToStory = (story) => {
        navigate(`/story/${story.id}`)
    }

    useEffect(() => {
        console.log(lstStories);
        setDialog(lstStories[1].lstDialogs);
    }, [])

    return (
        <div className="home-page__container">
            {
                lstStories.map((item, index) =>
                    <div className="home-page__story-container" key={item.name + index} onClick={() => goToStory(item)}>
                        {item.name}
                    </div>
                )
            }
            {/* <DialogBox dialog={currentDialog} nextDialog={nextDialog} /> */}
        </div>
    )
}
