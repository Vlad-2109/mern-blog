import { Sidebar } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { UserService } from '../services/user.service';
import { signoutSuccess } from '../redux/user/userSlice';
import { useAppDispatch } from '../redux/hook';

export const DashSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
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
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label={'User'}
              labelColor="dark"
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>

          <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignout}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};
