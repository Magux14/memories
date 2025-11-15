import { lstStories } from '../../../data/stories';
import { useNavigate } from 'react-router-dom';
import './home-page.scss';

export const HomePage = () => {

    const navigate = useNavigate()
    const goToStory = (story) => {
        navigate(`/story/${story.id}`)
    }

    return (
        <div className="home-page__container">
            {
                lstStories.filter(item => item.name).map((item, index) =>
                    <div className="home-page__story-container" key={item.name + index} onClick={() => goToStory(item)}>
                        {item.name}
                    </div>
                )
            }
        </div>
    )
}
