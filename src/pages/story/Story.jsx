import { useNavigate, useParams } from 'react-router-dom';
import { useDialog } from '../../hooks/useDialog';
import { lstStories } from '../../../data/stories';
import { useEffect, useState } from 'react';
import { DialogBox } from '../../components/dialog-box/DialogBox';
import './story.scss';
import { useFirebase } from '../../hooks/useFirebase';
import { FallObject } from '../../components/fall-object/FallObject';
import { Question } from '../../components/question/Question';

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
                    <div className="story__container"
                        style={{
                            backgroundImage: `url(../img/background/${story?.background ? story.background : 'default.webp'})`,
                            backgroundSize: '120% auto',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                        <div className="story__date">
                            {story.date}
                        </div>
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
