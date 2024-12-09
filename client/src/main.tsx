import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import App from './App.jsx';
import Signup from './pages/signup.js';
import Login from './pages/login.js';
import MyProfile from './pages/myProfile.jsx';
import ErrorPage from './components/error.jsx';
import ExplorePage from './pages/explore.jsx';
//import AboutArtVine from './pages/AboutArtVine.tsx';
import Home from './pages/home.jsx';
import Library from './pages/library.jsx';
import Profile from './pages/profile.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/myprofile',
        element: <MyProfile />
      }, {
        path: '/profile/:name',
        element: <Profile />
      }, {
        path: '/explore',
        element: <ExplorePage />
      }, {
        path: '/library',
        element: <Library />
      }, 
    ]
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}

