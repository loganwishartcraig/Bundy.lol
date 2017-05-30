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
  Logger.log('Updating profile...');

  setTimeout(() => {

  ProfileService
    .getProfile()
    .then(profile => {
      Logger.log("Updated profile recieved.", {user: profile.user.email});
      setProfile(profile);
    })
    .catch(err => {
      console.warn(err)
    });
  }, 3000)
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