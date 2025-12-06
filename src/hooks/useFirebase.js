import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

export function useFirebase() {

    const writeDatafirebaseAsync = async (collectionName, data) => {
        if (data.deviceInfo != 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36') {
            try {
                const docRef = await addDoc(collection(db, collectionName), data);
                console.log('Documento creado con ID:', docRef.id);
            } catch (e) {
                console.error('Error agregando documento:', e);
            }
        }
    };

    return {
        writeDatafirebaseAsync
    };
}
