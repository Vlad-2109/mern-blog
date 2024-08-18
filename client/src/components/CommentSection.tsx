import { Link } from 'react-router-dom';
import { CommentSectionProps, IGetComment } from '../types/types';
import { useAppSelector } from '../redux/hook';
import { Alert, Button, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { CommentService } from '../services/comment.service';
import { Comment } from './Comment';

export const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const { currentUser } = useAppSelector((state) => state.user);
  const [comment, setComment] = useState<string>('');
  const [commentError, setCommentError] = useState<string | null>(null);
  const [comments, setComments] = useState<IGetComment[] | []>([]);
  console.log(comments);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const data = await CommentService.createComment({
        content: comment,
        postId,
        userId: currentUser?._id,
      });
      if (data) {
        setComment('');
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error: any) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const data = await CommentService.getPostComments(postId);
        if (data) {
          setComments(data);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt="avatar"
          />
          <Link
            to={'/dashboard?tab=profile'}
            className="text-xs text-cyan-600 hover:underline"
          >
            @ {currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          <p>You must be signed in to comment</p>
          <Link to={'/sign-in'} className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          className="border border-teal-500 rounded-md p-3"
          onSubmit={handleSubmit}
        >
          <Textarea
            placeholder="Add a comment..."
            rows={3}
            maxLength={200}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-xs">
              {200 - comment.length} characters remaining
            </p>
            <Button outline gradientDuoTone="purpleToBlue" type="submit">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments.length == 0 ? (
        <p className="text-sm my-5">No comments yet!</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </>
      )}
    </div>
  );
};