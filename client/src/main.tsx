import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx';
import Signup from './pages/signup.jsx';
import Login from './pages/login.jsx';
import MyProfile from './pages/myProfile.jsx';
import ErrorPage from './components/error.jsx';
import ExplorePage from './pages/explore.jsx';
import Home from './pages/home.jsx';
import Library from './pages/library.jsx';
import Profile from './pages/profile.jsx';
import AboutUs from './pages/AboutArtVine.js';
import CompositionDetails from './pages/compositionDetails.js';

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
      },{
        path: '/compositionDetails',
        element: <CompositionDetails />
      },{
        path: '/about',
        element: <AboutUs />
      }
    ]
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}

