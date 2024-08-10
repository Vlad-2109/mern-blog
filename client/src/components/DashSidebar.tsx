import { Sidebar } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiArrowSmRight, HiDocumentText, HiUser } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { UserService } from '../services/user.service';
import { signoutSuccess } from '../redux/user/userSlice';
import { useAppDispatch, useAppSelector } from '../redux/hook';

export const DashSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { currentUser } = useAppSelector(state => state.user);
  const [tab, setTab] = useState<string>('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) setTab(tabFromUrl);
  }, [location.search]);
  const handleSignout = async () => {
    try {
      const data = await UserService.signout();
      if (data) {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label={currentUser?.isAdmin ? 'Admin' : 'User'}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser?.isAdmin && (
            <Link to="/dashboard?tab=posts">
              <Sidebar.Item
                active={tab === 'posts'}
                icon={HiDocumentText}
                as="div"
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};
