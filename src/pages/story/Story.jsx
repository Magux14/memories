import { useNavigate, useParams } from 'react-router-dom';
import { useDialog } from '../../hooks/useDialog';
import { lstStories } from '../../../data/stories';
import { useEffect } from 'react';
import { DialogBox } from '../../components/dialog-box/DialogBox';
import './story.scss';
import { useFirebase } from '../../hooks/useFirebase';

export const Story = () => {

    const { story, setStory, nextDialog, currentDialog } = useDialog();
    const { writeDatafirebaseAsync } = useFirebase();
    const { id } = useParams();
    const navigate = useNavigate()


    const handleNextDialog = () => {
        const finish = nextDialog();
        if (finish) {
            navigate('/');
        }
    }

    useEffect(() => {
        const index = lstStories.findIndex(item => item.id == id);
        if (index != -1) {
            setStory(lstStories[index]);
            writeDatafirebaseAsync('stories', {
                storyName: lstStories[index].name,
                date: new Date(),
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

    return (
        <>
            {
                story &&
                <div className="story__container"
                    style={{
                        backgroundImage: `url(../img/background/${story?.background ? story.background : 'default.webp'})`,
                        backgroundSize: 'auto 100%',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    <div className="story__date">
                        {story.date}
                    </div>
                    <DialogBox dialog={currentDialog} nextDialog={() => handleNextDialog()} />
                </div>
            }
        </>
    )
}
