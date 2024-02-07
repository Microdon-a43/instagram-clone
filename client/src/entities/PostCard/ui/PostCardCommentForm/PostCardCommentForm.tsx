import { getAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { classNames, type Mods } from '@/shared/lib/classNames';
import { Button, Form, HStack, Icon, Text, VStack } from '@/shared/ui';
import EmojiPicker, {
  EmojiStyle,
  type EmojiClickData
} from 'emoji-picker-react';
import { useState, type ChangeEvent, type FC } from 'react';
import { useSelector } from 'react-redux';
import { getReplyComment } from '../../model/selectors/getReplyComment';
import { commentPost } from '../../model/service/commentPost';
import { postActions } from '../../model/slice/postSlice';
import { type PostCardProps } from '../../model/types/post';
import styles from './PostCardCommentForm.module.scss';

export const PostCardCommentForm: FC<PostCardProps> = ({ post }) => {
  const [comment, setComment] = useState<string>('');
  const [showPickers, setShowPickers] = useState(false);
  const dispatch = useAppDispatch();
  const reply = useSelector(getReplyComment);
  const neededComment = post.comments.find((c) => c._id === reply);

  const handleChanges = (emojiData: EmojiClickData, event: MouseEvent) => {
    setComment((comment) => comment + emojiData.emoji);
  };

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(commentPost({ post, comment, reply }));
    dispatch(postActions.setOnDeleteReply());
    setComment('');
  };

  const onDeleteReply = () => {
    dispatch(postActions.setOnDeleteReply());
  };

  const mods: Mods = {
    [styles.active]: reply
  };

  return (
    <VStack>
      <HStack className={styles.commentForm} gap={16} align="center">
        <Icon
          type="Emoji"
          onClick={() => {
            setShowPickers(!showPickers);
          }}
        />
        {showPickers && (
          <div className={styles.pickers}>
            <EmojiPicker
              onEmojiClick={handleChanges}
              autoFocusSearch={false}
              emojiStyle={EmojiStyle.NATIVE}
            />
          </div>
        )}
        <Form onSubmit={onSubmit}>
          <input
            placeholder={!reply && 'Add a comment'}
            className={classNames(styles.input, mods, [])}
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          {reply && (
            <div className={styles.repliesTo}>
              <Text size={12} color={'default'}>
                #{neededComment?.user?.fullname}
              </Text>
              <Icon type="Close" onClick={onDeleteReply} />
            </div>
          )}

          <Button variant="outline" border disabled={!comment}>
            <Text color="blue">Post</Text>
          </Button>
        </Form>
      </HStack>
    </VStack>
  );
};
