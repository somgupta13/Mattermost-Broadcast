
import {Client4} from 'mattermost-redux/client';
import manifest from '../../manifest.js';


export const add = async (message, usersList) => {
    console.log(message);
    console.log(usersList);
    var usersid=[];
    usersList.forEach(element => {
        usersid.push(element.id);
    });
    await fetch(window.location.origin+'/plugins/'+manifest.id+'/broadcast', Client4.getOptions({
        method: 'post',
        body: JSON.stringify({Message:message, Usersid:usersid}),
    }));
};








