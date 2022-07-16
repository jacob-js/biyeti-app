import { showToast } from "./feedbacks";
import { StorageAccessFramework } from 'expo-file-system';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export const isEventAdmin = (user, members) =>{
    const member = members.find(member => member.user?.id === user.id);
    if(!member) return false;
    return member?.role === 'admin';
};

export const saveQrToDisk = (svgRef, event, ticket) => {
    svgRef.toDataURL(async(data) => {
        if(Platform.OS === 'android'){
            const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
            if(permissions.granted){
                const dirUri = permissions.directoryUri;
                let dir = StorageAccessFramework.getUriForDirectoryInRoot('Bookit');
                if(!dir){
                    dir = await StorageAccessFramework.makeDirectoryAsync(dirUri, 'Bookit');
                }
                const file = await StorageAccessFramework.createFileAsync(`${dirUri}/${dir}`, `${event.name.split(' ').join('-')}-${ticket.name}.png`, 'image/png');
                await StorageAccessFramework.writeAsStringAsync(file, data, { encoding: 'base64' });
                showToast('QR Code enregistré dans votre librairie');
            }
        }else{
            const filename = FileSystem.documentDirectory + `${event.name.split(' ').join('-')}-${ticket.name}.png`;
            await FileSystem.writeAsStringAsync(filename, data, { encoding: 'base64' });
            await MediaLibrary.saveToLibraryAsync(filename);
            showToast('QR Code enregistré dans votre librairie');
        }
    });
}