import { useNavigate, useParams } from 'react-router-dom';
import { useDialog } from '../../hooks/useDialog';
import { lstStories } from '../../../data/stories';
import { useEffect } from 'react';
import { DialogBox } from '../../components/dialog-box/DialogBox';
import './story.scss';

export const Story = () => {

    console.log('story')
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
        console.log('currentDialog', currentDialog);
    }, [currentDialog]);

    return (
        <>
            {
                story &&
                <div className="story__container"
                    style={{
                        backgroundImage: `url(..//img/background/${story?.background})`,
                        backgroundSize: '100% 100%'
                    }}
                >
                    <DialogBox dialog={currentDialog} nextDialog={() => handleNextDialog()} />
                </div>
            }
        </>
    )
}
