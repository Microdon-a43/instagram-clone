import { type IUser } from '@/entities/User/model/types/user';
import { FollowBtn } from '@/features';
import { UserCard, VStack } from '@/shared/ui';
import { type FC } from 'react';

interface FollowModalProps {
  data: IUser[];
}

export const FollowModal: FC<FollowModalProps> = ({ data }) => {
  return (
    <VStack>
      {data.length > 0 ? (
        data.map((user) => (
          <UserCard
            key={user._id}
            id={user._id}
            title={user.fullname}
            content={user.username}
            src={user.avatar}
          >
            <FollowBtn user={user} id={user._id} />
          </UserCard>
        ))
      ) : (
        <div>Ничего нет</div>
      )}
    </VStack>
  );
};
