import { Comment, HStack, Text, VStack } from '@/shared/ui';
import { useEffect, useState, type FC } from 'react';
import styles from './PostCardComments.module.scss';
import { type PostCardProps } from '../../model/types/post';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { postActions } from '../../model/slice/postSlice';

export const PostCardComments: FC<PostCardProps> = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [isOpenAllCmts, setIsOpenAllCmts] = useState(false);
  const dispatch = useAppDispatch();
  // const [replies, setReplies] = useState([]);

  useEffect(() => {
    const replies = post?.comments?.filter((c) => c.reply);
    console.log('1', replies);
    // dispatch(postActions.setAllReplies(replies));
    // setReplies(replies);
  }, []);

  useEffect(() => {
    setComments(post.comments);
  }, [post.comments]);

  return (
    <VStack className={styles.comments}>
      {comments.length <= 3 ? (
        comments?.map((comment) => (
          <Comment
            key={comment._id}
            src={comment.user.avatar}
            name={comment.user.username}
            content={comment.content}
            createdAt={comment.createdAt}
            comment={comment}
          />
        ))
      ) : (
        <>
          <Text
            className={styles.allCmts}
            color="default"
            size={12}
            fw={600}
            onClick={() => {
              setIsOpenAllCmts(!isOpenAllCmts);
            }}
          >
            Все комментарии({comments.length})
          </Text>
          {isOpenAllCmts && (
            <VStack>
              {comments?.map((comment) => (
                <Comment
                  key={comment._id}
                  src={comment.user.avatar}
                  name={comment.user.username}
                  content={comment.content}
                  createdAt={comment.createdAt}
                  comment={comment}
                />
              ))}
            </VStack>
          )}
        </>
      )}
    </VStack>
  );
};
