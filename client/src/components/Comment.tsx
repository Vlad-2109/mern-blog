import moment from 'moment';
import { useEffect, useState } from 'react';
import { CommentProps } from '../types/types';
import { UserService } from '../services/user.service';
import { User } from '../redux/types';

export const Comment: React.FC<CommentProps> = ({ comment }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await UserService.getUser(comment.userId);
        if (data) {
          setUser(data);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user?.profilePicture}
          alt={user?.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : 'anonymous user'}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-500 pb-2">{comment.content}</p>
      </div>
    </div>
  );
};