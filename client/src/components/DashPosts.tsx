import { useEffect, useState } from 'react';
import { useAppSelector } from '../redux/hook';
import { IGetPost } from '../types/types';
import { PostService } from '../services/post.service';
import { Table, TableCell } from 'flowbite-react';
import { Link } from 'react-router-dom';

export const DashPosts: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState<IGetPost[] | []>([]);
  const [showMore, setShowMore] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await PostService.getPosts(currentUser?._id);
        if (data) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchPosts();
  }, [currentUser?._id]);

  const handleShowMore = async() => {
    const startIndex = userPosts.length;
    try {
      const data = await PostService.getPostsWithStartIndex(currentUser?._id, startIndex);
      if (data) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <div className='table-auto overflow-x-scroll w-full
    md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser?.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body key={post._id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <TableCell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link className='font-medium text-gray-900 dark:text-white' to={`/post/${post.slug}`}>{post.title}</Link>
                  </TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>
                    <span className='font-medium text-red-500 hover:underline cursor-pointer'>Delete</span>
                  </TableCell>
                  <TableCell>
                    <Link className='text-teal-500 hover: underline' to={`/update-post/${post._id}`}>
                      <span>Edit</span>
                    </Link>
                  </TableCell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {
            showMore && (
              <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
                Show more
              </button>
            )
          }
        </>
      ) : (
        <p>You have no posts yet!</p>
      )}
    </div>
  );
};
