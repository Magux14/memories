import { useState } from "react"

export const useDialog = () => {

    const [lstDialog, setLstDialog] = useState([]);
    const [currentDialogIndex, setCurrentDialogIndex] = useState(0);

    const setDialog = (lstDialog) => {
        setLstDialog(lstDialog);
    }

    const nextDialog = () => {
        let nextDialog = currentDialogIndex + 1;
        if (nextDialog >= lstDialog.length) {
            nextDialog = -1;
        }
        console.log(nextDialog);
        setCurrentDialogIndex(nextDialog)
        return nextDialog == -1;
    }

    return {
        setDialog,
        nextDialog,
        currentDialog: lstDialog[currentDialogIndex]
    }

}