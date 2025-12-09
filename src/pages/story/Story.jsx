import { useNavigate, useParams } from 'react-router-dom';
import { useDialog } from '../../hooks/useDialog';
import { lstStories } from '../../../data/stories';
import { useEffect, useState } from 'react';
import { DialogBox } from '../../components/dialog-box/DialogBox';
import './story.scss';
import { useFirebase } from '../../hooks/useFirebase';
import { FallObject } from '../../components/fall-object/FallObject';
import { Question } from '../../components/question/Question';
import { HitDices } from '../../components/mini-games/hit-dices/HitDices';

export const Story = () => {

    const [openDate] = useState(new Date())
    const { story, setStory, nextDialog, currentDialog } = useDialog();
    const { writeDatafirebaseAsync } = useFirebase();
    const { id } = useParams();
    const navigate = useNavigate()

    const handleNextDialog = () => {
        const finish = nextDialog();
        if (finish) {
            writeDatafirebaseAsync('finishedStories', {
                storyName: story?.name,
                startDate: openDate,
                endDate: new Date(),
                deviceInfo: navigator.userAgent
            })
            navigate('/');
        }
    }

    const close = () => {
        navigate('/');
    }

    const getGameComponent = (name) => {
        switch (name) {
            case 'hitDices': return <HitDices callbackClose={close} callbackSuccess={handleNextDialog} />
            default: <></>
        }
    }

    const getBackground = () => {
        const mainPath = '../img/background';
        if (currentDialog?.background) {
            return `../img/memories/${story.name}/${currentDialog.background}`;
        }

        return `${mainPath}/${story?.background ? story.background : 'default.webp'}`
    }

    useEffect(() => {
        const index = lstStories.findIndex(item => item.id == id);
        if (index != -1) {
            setStory(lstStories[index]);
            writeDatafirebaseAsync('stories', {
                storyName: lstStories[index].name,
                date: openDate,
                deviceInfo: navigator.userAgent
            })
        }
    }, []);

    useEffect(() => {
        const haveAccess = sessionStorage.getItem('access');
        if (!haveAccess) {
            navigate('/');
        }
    }, []);

    const renderDialog = (currentDialog) => {

        if (currentDialog) {
            if (currentDialog.type == 'video') {
                return <video className={`story__video story__image--flash`} src={`../video/${currentDialog?.src}`} autoPlay={true} controls={true}></video>
            }

            if (currentDialog.type == 'game') {
                return <>
                    {
                        getGameComponent(currentDialog.gameName)
                    }
                </>
            }
        }

        return <img
            src={getBackground()}
            className={`story__image ${(story.type == 'memories' || story.type == 'game') && currentDialog?.background ? 'story__image--flash' : ''}`}
            alt=""
        />
    }

    if (!story) {
        return;
    }

    return (
        <>
            {
                story.type == 'fallingObject'
                    ?
                    <FallObject imgName={story.img} callbackClose={close} />
                    :
                    <div className={`story__container story__container--${story.type}`}                    >
                        <div className="story__date">
                            {story.date}
                        </div>
                        {
                            renderDialog(currentDialog)
                        }
                        {
                            currentDialog?.type == 'question' &&
                            <Question story={story} callbackClose={handleNextDialog} />
                        }
                        <DialogBox dialog={currentDialog} nextDialog={() => handleNextDialog()} />
                    </div>
            }
        </>
    )
}
