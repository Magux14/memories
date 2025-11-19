import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

export function useFirebase() {

    const writeDatafirebaseAsync = async (collectionName, data) => {
        try {
            // const docRef = await addDoc(collection(db, collectionName), data);
            console.log('Documento creado con ID:', docRef.id);
        } catch (e) {
            console.error('Error agregando documento:', e);
        }
    };

    return {
        writeDatafirebaseAsync
    };
}
