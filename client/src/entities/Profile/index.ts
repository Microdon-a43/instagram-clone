export { profileActions, profileReducer } from './model/slice/profileSlice';

// Types
export { type ProfileState, FollowEnum } from './model/types/profile';

// UI
export { FollowModal } from './ui/FollowModal/FollowModal';
export { ProfileInfo } from './ui/ProfileInfo/ProfileInfo';
export { EditProfile } from './ui/EditProfile/EditProfile';
export { MyPosts } from './ui/MyPosts/MyPosts';
export { SavedPosts } from './ui/SavedPosts/SavedPosts';
export { MyMarks } from './ui/MyMarks/MyMarks';
export { ProfilePosts } from './ui/ProfilePosts/ProfilePosts';

// Services
export { updateProfile } from './model/service/updateProfile';
export { followUser } from './model/service/follow';
export { unfollowUser } from './model/service/unfollow';
export { getUserProfile } from './model/service/getUserProfile';
export { searchUsers } from './model/service/searchUsers';
export { getMyPosts } from './model/service/getMyPosts';

// Hooks
export { useProfileModal } from './model/hooks/useProfileModal';

// Selectors
export { getSearchLoading } from './model/selectors/getSearchLoading';
export { getSearchUsers } from './model/selectors/getSearchUsers';
export { getAllUsers } from './model/selectors/getAllUsers';
export { getUserLoading } from './model/selectors/getUserLoading';
export { getProfileUpdateError } from './model/selectors/getProfileUpdateError';
export { getProfileUpdateSuccess } from './model/selectors/getProfileUpdateSuccess';
export { getUserNewChat } from './model/selectors/getUserNewChat';
export { getPersonalPosts } from './model/selectors/getPersonalPosts';
export { getUserProfileSelect } from './model/selectors/getUserProfileSelect';
