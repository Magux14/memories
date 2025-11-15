import { useState } from "react"

export const useDialog = () => {

    const [story, setStory] = useState();
    const [currentDialogIndex, setCurrentDialogIndex] = useState(0);

    const nextDialog = () => {
        let nextDialog = currentDialogIndex + 1;
        if (nextDialog > story.lstDialog.length) {
            nextDialog = -1;
        }
        console.log(nextDialog);
        setCurrentDialogIndex(nextDialog)
        return nextDialog == -1;
    }

    return {
        story,
        setStory,
        nextDialog,
        currentDialog: story ? story.lstDialog[currentDialogIndex] : null
    }

}