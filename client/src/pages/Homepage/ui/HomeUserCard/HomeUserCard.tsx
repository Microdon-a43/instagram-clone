import { type IUser } from '@/entities/User/model/types/user';
import { UserCard } from '@/shared/ui';
import { Button } from 'antd';
import { type FC } from 'react';

interface UserCardProps {
  user: IUser;
}

export const HomeUserCard: FC<UserCardProps> = ({ user }) => {
  return (
    <>
      <UserCard
        size={56}
        id={user?._id}
        title={user?.fullname}
        src={user?.avatar}
        content={user?.username}
      >
        <Button>Switch</Button>
      </UserCard>
    </>
  );
};
