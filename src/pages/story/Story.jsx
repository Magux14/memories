import { useNavigate, useParams } from 'react-router-dom';
import { useDialog } from '../../hooks/useDialog';
import { lstStories } from '../../../data/stories';
import { useEffect } from 'react';
import { DialogBox } from '../../components/dialog-box/DialogBox';
import './story.scss';

export const Story = () => {

    const { story, setStory, nextDialog, currentDialog } = useDialog();
    const { id } = useParams();
    const navigate = useNavigate()


    const handleNextDialog = () => {
        const finish = nextDialog();
        if (finish) {
            navigate('/');
        }
    }

    useEffect(() => {
        console.log(lstStories);
        const index = lstStories.findIndex(item => item.id == id);
        if (index != -1) {
            setStory(lstStories[index]);
        }
    }, []);

    useEffect(() => {
        const haveAccess = sessionStorage.getItem('access');
        if (!haveAccess) {
            navigate('/');
        }
    }, [currentDialog]);

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
