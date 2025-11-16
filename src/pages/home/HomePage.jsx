import { lstStories } from '../../../data/stories';
import { useNavigate } from 'react-router-dom';
import './home-page.scss';
import { useEffect, useState } from 'react';
import { Login } from '../../components/login/Login';

export const HomePage = () => {

    const [hasPermission, setHassPermision] = useState(false);

    const navigate = useNavigate()
    const goToStory = (story) => {
        navigate(`/story/${story.id}`);
    }

    const lstStoriesFiltered = lstStories.filter(item => item.name).toSorted((a, b) => a.date > b.date ? 1 : -1);

    useEffect(() => {
        const haveAccess = sessionStorage.getItem('access');
        console.log(haveAccess)
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
                        <div className="home-page__story-container" key={item.name + index} onClick={() => goToStory(item)}>
                            <div>
                                {item.date}
                            </div>
                            <div>
                                #{index + 1}. {item.name}
                            </div>
                        </div>
                    )
            }
        </div>
    )
}
