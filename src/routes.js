import Main from "./component/main/Main";
import Account from "./component/account/Account";
import Camera from "./component/camera/camera";
import Dashboard from "./component/dashboard/dashboard";
import Login from "./component/login";
import Home from "./component/home/Home";
import TestPage from "./component/TestPage";
import Page404 from "./component/Page404";
import ThietBi from "./component/thietbi";
import HomeDB from "./component/dotbay/HomeDB";
import HomeDL from "./component/nhapdulieu/HomeDL";
import PhotoMS from "./component/photoms/photoms";
import Main3D from "./component/Main3D";
import test from "./component/test/DataFetching";
//------------------------------------------------------------
import Redirect404 from "./component/RedirectPage/Redirect404";
import ProtectedRoute from "./protectedRouter";
import DataFetching from "./component/test/DataFetching";
import Bieudothongke from "./component/test/bieudothongke";

const routes = [
  {
    path: "app",
    element: <ProtectedRoute component={Main} />,
    children: [
      {
        path: "thongtincanhan",
        element: <ProtectedRoute component={Account} />,
      },
      { path: "bando", element: <ProtectedRoute component={Account} /> },
      { path: "camera", element: <ProtectedRoute component={Camera} /> },
      { path: "thongke", element: <ProtectedRoute component={Dashboard} /> },
      { path: "trangchu", element: <ProtectedRoute component={Home} /> },
      {
        path: "thietbi",
        element: <ProtectedRoute component={ThietBi} />,
      },
      {
        path: "dotbay",
        element: <ProtectedRoute component={HomeDB} />,
      },
      {
        path: "nhapdulieu",
        element: <ProtectedRoute component={HomeDL} />,
      },
      {
        path: "quanlyanh",
        element: <ProtectedRoute component={PhotoMS} />,
      },
      { path: "ts", element: <ProtectedRoute component={TestPage} /> },
      { path: "m3d", element: <ProtectedRoute component={Main3D} /> },
      { path: "*", element: <ProtectedRoute component={Redirect404} /> },
      { path: "test", element: <ProtectedRoute component={DataFetching} /> },
    ],
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/404",
    element: <ProtectedRoute component={Page404} />,
  },
  {
    path: "*",
    element: <ProtectedRoute component={Redirect404} />,
  },
];

export default routes;
