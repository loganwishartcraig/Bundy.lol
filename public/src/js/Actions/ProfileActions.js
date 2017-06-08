import { AppDispatcher } from '../Dispatcher/AppDispatcher';
import Logger from '../Utility/Logging'

import { CacheService } from '../Services/CacheService';
import { ProfileService } from '../Services/ProfileService';
import { ProfileConstants } from '../Constants/ProfileConstants';


/**
 * Action used to request a fresh user profile
 * Requests from server, then sets profile
 */
const updateProfile = () => {

  ProfileService
    .getProfile()
    .then(profile => { setProfile(profile); })
    .catch(err => { console.warn(err); });

};


/**
 * Action used to set a users profile
 *
 * @param      {Object}  profile  The users profile object { user: Object, groups: [ Object ] }
 */
const setProfile = profile => {
  AppDispatcher.dispatch({
    type: ProfileConstants.SET_PROFILE,
    user: profile.user,
    groups: profile.groups
  });
};



export const ProfileActions = {
  updateProfile,
  setProfile
};