import { lstStories } from '../../../data/stories';
import { useNavigate } from 'react-router-dom';
import './home-page.scss';

export const HomePage = () => {

    const navigate = useNavigate()
    const goToStory = (story) => {
        navigate(`/story/${story.id}`)
    }

    const lstStoriesFiltered = lstStories.filter(item => item.name).toSorted((a, b) => a.date > b.date ? 1 : -1);

    return (
        <div className="home-page__container">
            {
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
