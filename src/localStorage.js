import { Map,List,fromJS } from 'immutable';
import User from '@models/User';
import Cause from '@models/Cause';
import DonationProfile from '@models/DonationProfile';

export const localState = ()=>{
    try{
        const persistedState = localStorage.getItem('state');
        if (persistedState===null){
            return undefined;
        }else{
            var payload  = JSON.parse(persistedState);
           // console.log('persisted : '+persistedState);
            const donations = payload.users.current.donationProfile.donations;
            payload.users.current.donationProfile.donations = donations?fromJS(donations):List();
            payload.users.current.donationProfile = new DonationProfile(payload.users.current.donationProfile);
            if (payload.cause.cause){
                //payload.cause.cause.photoLinks = payload.cause.cause.photoLinks?fromJS(payload.cause.cause.photoLinks):List();
                payload.cause.cause.tags = payload.cause.cause.tags?fromJS(payload.cause.cause.tags):List();
                payload.cause.cause.adminIds = payload.cause.cause.adminIds?fromJS(payload.cause.cause.adminIds):List();
                payload.cause.cause.donationIds = payload.cause.cause.donationIds?fromJS(payload.cause.cause.donationIds):List();
            }

            payload = {
                users:Map({
                    users: Map(payload.users.users),
                    isLoading: payload.users.isLoading,
                    current: payload.users.current?User.fromJS(payload.users.current): new User()
                }),
                errors:Map(payload.errors),
                questionnaires:Map(payload.questionnaires),
                status:Map(payload.status),
                cause:Map({
                    cause:payload.cause.cause?Cause.fromJS(payload.cause.cause):new Cause()})
            }
            return payload;
        }

    }catch(err){
        console.log(err);
        return undefined;
    }
}

export const saveState = (state)=>{
    try{
        const persistedState = JSON.stringify(state);
        localStorage.setItem("state", persistedState);
    }catch(err){
        console.log(err);
    }
}