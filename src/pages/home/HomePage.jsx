import { lstStories } from '../../../data/stories';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Login } from '../../components/login/Login';
import { BiCaretRightCircle } from "react-icons/bi";
import './home-page.scss';

export const HomePage = () => {

    const [hasPermission, setHassPermision] = useState(false);

    const navigate = useNavigate()
    const goToStory = (story) => {
        navigate(`/story/${story.id}`);
    }

    const lstStoriesFiltered = lstStories.filter(item => item.name).toSorted((a, b) => a.date < b.date ? 1 : -1);

    useEffect(() => {
        const haveAccess = sessionStorage.getItem('access');
        if (haveAccess) {
            setHassPermision(true);
        }
    }, [])

    return (
        <div className="home-page__container">

            {
                !hasPermission
                    ?
                    <Login callbackClose={() => setHassPermision(true)} />
                    :
                    lstStoriesFiltered.map((item, index) =>
                        <div className={`home-page__story-container home-page__story-container--${item.type}`} key={item.name + index} onClick={() => goToStory(item)}>
                            <div>
                                <span className="home-page__number">
                                    #{lstStoriesFiltered.length - index}
                                </span>
                            </div>
                            <div className="home-page__story-content-container">
                                <div>
                                    {item.name}
                                </div>
                                <div className="home-page__date">
                                    {item.date}
                                </div>
                            </div>
                            <div>
                                <BiCaretRightCircle />
                            </div>
                        </div>
                    )
            }
        </div>
    )
}
