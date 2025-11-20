import { useEffect, useState } from 'react';
import './question.scss';
import { useFirebase } from '../../hooks/useFirebase';

export const Question = ({ story, callbackClose }) => {

    const [text, setText] = useState('');
    const { writeDatafirebaseAsync } = useFirebase();

    const handleAnswer = () => {
        callbackClose();
        const obj = {
            storyName: story.name,
            date: new Date(),
            deviceInfo: navigator.userAgent,
            input: text,
            ready: true
        }
        console.log(obj);
        writeDatafirebaseAsync('answers', obj);
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!text) {
                return;
            }
            const obj = {
                storyName: story.name,
                date: new Date(),
                deviceInfo: navigator.userAgent,
                input: text,
                ready: false
            }
            console.log(obj);
            writeDatafirebaseAsync('answers', obj);
        }, 1_000);

        return () => clearTimeout(timeout);
    }, [text]);

    return (
        <div className="question__container">
            <textarea className="question__textarea" onChange={(ev) => setText(ev.target.value)}></textarea>
            <button className="question__button" onClick={() => handleAnswer()} disabled={text.length < 2}>Contestar</button>
        </div>
    )
}
