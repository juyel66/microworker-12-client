import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./Components/ErrorPage/ErrorPage.jsx";
import Roots from "./Components/Roots/Roots.jsx";
import Home from "./Components/Home/Home.jsx";
import Register from "./Components/Register/Register.jsx";
import Login from "./Components/Login/Login.jsx";
import AuthProvider from "./Components/AuthProvider/AuthProvider.jsx";
import DashBoard from "./Components/DashBoard/DashBoard.jsx";
import TaskCreatorHome from "./Components/DashBoard/TaskCreatorHome/TaskCreatorHome.jsx";
import AdminHome from "./Components/DashBoard/AdminHome/AdminHome.jsx";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import WelcomePage from "./Components/DashBoard/DashboardHome/WelcomePage/WelcomePage.jsx";
import AddNewTask from "./Components/DashBoard/AddNewTask/AddNewTask.jsx";
import ManageUser from "./Components/DashBoard/ManageUser/ManageUser.jsx";
import AdminRout from "./Components/DashBoard/AdminRout/AdminRout.jsx";
import PrivetRout from "./Components/PrivetRout/PrivetRout.jsx";
import TaskList from "./Components/DashBoard/TaskList/TaskList.jsx";
import TaskDetails from "./Components/DashBoard/TaskDetails/TaskDetails.jsx";
import MySubmissions from "./Components/DashBoard/MySubmissions/MySubmissions.jsx";
import MyTasks from "./Components/DashBoard/MyTasks/MyTasks.jsx";
import PurchaseCoin from "./Components/DashBoard/PurchaseCoins/PurchaseCoin.jsx";
import CheckoutForm from "./Components/DashBoard/PurchaseCoins/CheckOutForm/CheckOutForm.jsx";
import Payment from "./Components/DashBoard/Payment/Payment.jsx";
import PaymentHistory from "./Components/DashBoard/PaymentHistory/PaymentHistory.jsx";
import ManageTask from "./Components/DashBoard/ManageTask/ManageTask.jsx";
import UpdateTask from "./Components/DashBoard/MyTasks/UpdateTask/UpdateTask.jsx";
import ViewDetails from "./Components/DashBoard/TaskReview/ViewDetails/ViewDetails.jsx";
import WithDrawals from "./Components/DashBoard/WithDrawals/WithDrawals.jsx";
import WorkerHome from "./Components/DashBoard/WorkerHome/WorkerHome.jsx";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <Roots></Roots>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
  {
    path: "dashboard",
    errorElement: <ErrorPage></ErrorPage>,
    element: <PrivetRout><DashBoard></DashBoard></PrivetRout> ,
    children: [
      // worker
      {
        path: "workerHome",
        element: <WorkerHome></WorkerHome>,
      },
      {
        path: 'taskList',
        element:<TaskList></TaskList>
      },
      {
        path: 'taskDetails/:id',
        element: <TaskDetails></TaskDetails>
      },
      {
        path: 'mySubmissions',
        element: <MySubmissions></MySubmissions>
      },
      {
        path: 'welcome',
        element: <WelcomePage></WelcomePage>
      },
      {
        path: 'WithDrawals',
        element: <WithDrawals></WithDrawals>
      },
      // taskCreator
      {
        path: "TaskCreatorHome",
        element: <TaskCreatorHome></TaskCreatorHome>,
      },
      {
        path: 'addNewTask',
        element: <AddNewTask></AddNewTask>
      },
      {
        path: 'updateTask/:id',
        element: <UpdateTask></UpdateTask>,
        loader: ({params}) => fetch(`https://server-theta-umber.vercel.app/addTask/${params.id}`)
      },
      {
        path: 'myTasks',
        element: <MyTasks></MyTasks>
      },
      {
        path:'purchaseCoin',
        element: <PurchaseCoin></PurchaseCoin>
      },
      {
        path:'checkout/:coins/:price',
        element: <CheckoutForm></CheckoutForm>
      },
      {
        path: 'payment/:amount',
        element: <Payment></Payment>
      },
      {
        path: 'paymentHistory',
        element: <PaymentHistory></PaymentHistory>
      },
      {
        path: 'viewDetails/:id',
        element: <ViewDetails></ViewDetails>
      },

      // admin
      {
        path: "adminHome",
        element: <AdminRout><AdminHome></AdminHome></AdminRout>,
      },

      {
        path:'manageUser',
        element: <AdminRout><ManageUser></ManageUser></AdminRout>
      },
      {
        path: 'manageTask',
        element: <ManageTask></ManageTask>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className="container mx-auto">
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
