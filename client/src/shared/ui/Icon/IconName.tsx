import Home from '@/shared/assets/svg/Home.svg';
import Messenger from '@/shared/assets/svg/Messenger.svg';
import LikeIcon from '@/shared/assets/svg/LikeIcon.svg';
import AddPostIcon from '@/shared/assets/svg/AddPostIcon.svg';
import FindIcon from '@/shared/assets/svg/FindIcon.svg';
import Search from '@/shared/assets/svg/Search.svg';
import Light from '@/shared/assets/svg/Light.svg';
import Dark from '@/shared/assets/svg/Dark.svg';
import Dots from '@/shared/assets/svg/Dots.svg';
import Comment from '@/shared/assets/svg/Comment.svg';
import SharePosts from '@/shared/assets/svg/SharePosts.svg';
import SharePostsBig from '@/shared/assets/svg/SharePostsBig.svg';
import Save from '@/shared/assets/svg/Save.svg';
import Heart from '@/shared/assets/svg/Heart.svg';
import FilledHeart from '@/shared/assets/svg/FilledHeart.svg';
import Clip from '@/shared/assets/svg/Clip.svg';
import Camera from '@/shared/assets/svg/Camera.svg';
import Moon from '@/shared/assets/svg/Moon.svg';
import Emoji from '@/shared/assets/svg/Emoji.svg';
import NewMessages from '@/shared/assets/svg/NewMessages.svg';
import Arrow from '@/shared/assets/svg/Arrow.svg';
import Plus from '@/shared/assets/svg/Plus.svg';
import Send from '@/shared/assets/svg/Send.svg';
import Pic from '@/shared/assets/svg/Pic.svg';
import Info from '@/shared/assets/svg/Info.svg';
import Microphone from '@/shared/assets/svg/Microphone.svg';
import Bookmark from '@/shared/assets/svg/Bookmark.svg';
import Grid from '@/shared/assets/svg/Grid.svg';
import Mark from '@/shared/assets/svg/Mark.svg';
import Close from '@/shared/assets/svg/Close.svg';

export type IconType =
  | 'Home'
  | 'Messenger'
  | 'LikeIcon'
  | 'AddPostIcon'
  | 'FindIcon'
  | 'Search'
  | 'Dark'
  | 'Light'
  | 'Dots'
  | 'Comment'
  | 'SharePosts'
  | 'SharePostsBig'
  | 'Save'
  | 'Heart'
  | 'Clip'
  | 'Camera'
  | 'Moon'
  | 'FilledHeart'
  | 'Emoji'
  | 'Arrow'
  | 'NewMessages'
  | 'Plus'
  | 'Send'
  | 'Microphone'
  | 'Info'
  | 'Pic'
  | 'Bookmark'
  | 'Grid'
  | 'Mark'
  | 'Close';

export const iconName: Record<IconType, JSX.Element> = {
  Home: <Home />,
  Messenger: <Messenger />,
  LikeIcon: <LikeIcon />,
  AddPostIcon: <AddPostIcon />,
  FindIcon: <FindIcon />,
  Search: <Search />,
  Light: <Light />,
  Dark: <Dark />,
  Dots: <Dots />,
  Comment: <Comment />,
  SharePosts: <SharePosts />,
  SharePostsBig: <SharePostsBig />,
  Save: <Save />,
  Heart: <Heart />,
  Clip: <Clip />,
  Camera: <Camera />,
  Moon: <Moon />,
  FilledHeart: <FilledHeart />,
  Emoji: <Emoji />,
  NewMessages: <NewMessages />,
  Arrow: <Arrow />,
  Plus: <Plus />,
  Send: <Send />,
  Microphone: <Microphone />,
  Info: <Info />,
  Pic: <Pic />,
  Grid: <Grid />,
  Bookmark: <Bookmark />,
  Mark: <Mark />,
  Close: <Close />
};
