import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { Dashboard } from '../pages/Dashboard';
import { Projects } from '../pages/Projects';
import { Layout } from '../components/Layout';
import { PrivateRoute } from '../components/PrivateRoute';
import { OnlyAdminPrivateRoute } from '../components/OnlyAdminPrivateRoute';
import { CreatePost } from '../pages/CreatePost';
import { PostPage } from '../pages/PostPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'sign-in', element: <SignIn /> },
      { path: 'sign-up', element: <SignUp /> },
      {
        path: 'dashboard',
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: 'create-post',
        element: (
          <OnlyAdminPrivateRoute>
            <CreatePost />
          </OnlyAdminPrivateRoute>
        ),
      },
      { path: 'projects', element: <Projects /> },
      { path: 'post/:postSlug', element: <PostPage />}
    ],
  },
]);
