import { useEffect, useState } from 'react';
import { useAppSelector } from '../redux/hook';
import { Button, Modal, Table, TableCell } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { IGetComment } from '../types/types';
import { CommentService } from '../services/comment.service';

export const DashComments: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const [comments, setComments] = useState<IGetComment[] | []>([]);
  const [showMore, setShowMore] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState<string>('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await CommentService.getComments();
        if (data) {
          setComments(data.comments);
          if (data.comments.length < 5) {
            setShowMore(false);
          }
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };

    if (currentUser?.isAdmin) {
      fetchComments();
    }
  }, [currentUser?._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const data = await CommentService.getCommentsWithStartIndex(startIndex);
      if (data) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const data = await CommentService.deleteCommentById(commentIdToDelete);
      if (data) {
        setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete));
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div
      className="table-auto overflow-x-scroll w-full
    md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
    >
      {currentUser?.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>Number of likes</Table.HeadCell>
              <Table.HeadCell>PostId</Table.HeadCell>
              <Table.HeadCell>UserId</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {comments.map((comment) => (
              <Table.Body key={comment._id} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {comment.content}
                  </TableCell>
                  <TableCell>{comment.numberOfLikes}</TableCell>
                  <TableCell>{comment.postId}</TableCell>
                  <TableCell>
                    {comment.userId}
                  </TableCell>
                  <TableCell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </TableCell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no comments yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteComment}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
