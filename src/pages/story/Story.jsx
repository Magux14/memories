import { useNavigate, useParams } from 'react-router-dom';
import { useDialog } from '../../hooks/dialog';
import { lstStories } from '../../../data/stories';
import { useEffect } from 'react';
import { DialogBox } from '../../components/dialog-box/DialogBox';
import './story.scss';

export const Story = () => {

    console.log('story')
    const { setDialog, nextDialog, currentDialog } = useDialog();
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
            setDialog([...lstStories[index].lstDialogs].concat([{}]));
        }
    }, []);

    return (
        <div className="story__container">
            <DialogBox dialog={currentDialog} nextDialog={() => handleNextDialog()} />
        </div>
    )
}
