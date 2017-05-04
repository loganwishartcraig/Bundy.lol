import { AppDispatcher } from '../Dispatcher/AppDispatcher';
import Logger from '../Utility/Logging'

import { CacheService } from '../Services/CacheService';
import { ProfileService } from '../Services/ProfileService';
import { ProfileConstants } from '../Constants/ProfileConstants';

const updateProfile = () => {
  Logger.log('Updating profile...');
  ProfileService
    .getProfile()
    .then(profile => {
      Logger.log("Updated profile recieved.", {user: profile.user.email});
      setProfile(profile);
    })
    .catch(err => {

    });
};

const setProfile = (profile) => {

  AppDispatcher.dispatch({
    type: ProfileConstants.SET_PROFILE,
    user: profile.user,
    groups: profile.groups,
    todos: profile.todos
  });

}

export const ProfileActions = {
  updateProfile,
  setProfile
  // setFromCache
}