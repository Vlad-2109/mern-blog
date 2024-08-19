import moment from 'moment';
import { useEffect, useState } from 'react';
import { CommentProps } from '../types/types';
import { UserService } from '../services/user.service';
import { User } from '../redux/types';
import { FaThumbsUp } from 'react-icons/fa';
import { useAppSelector } from '../redux/hook';

export const Comment: React.FC<CommentProps> = ({ comment, onLike }) => {
  const [user, setUser] = useState<User | null>(null);
  const { currentUser } = useAppSelector((state) => state.user);

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
        <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
          <button
            type="button"
            onClick={() => onLike(comment._id)}
            className={`text-gray-400 hover:text-blue-500 ${
              currentUser &&
              comment.likes.includes(currentUser._id) &&
              '!text-blue-500'
            }`}
          >
            <FaThumbsUp className="text-sm" />
          </button>
          <p className='text-gray-400'>
            {
            comment.numberOfLikes > 0 && comment.numberOfLikes + ' ' + (comment.numberOfLikes === 1 ? 'like' : 'likes')
            }
          </p>
        </div>
      </div>
    </div>
  );
};
