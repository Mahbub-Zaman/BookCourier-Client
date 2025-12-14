import { createBrowserRouter } from "react-router-dom";

// Pages
import Home from "../Pages/Home";
import Profile from "../Pages/Profile/profile";
import UpdateProfile from "../Pages/Profile/UpdateProfile";
import Signup from "../Pages/Auth/Signup";
import Login from "../Pages/Auth/Login";
import ResetPassword from "../Pages/Auth/ForgotPassword";
import FAQPage from "../Pages/Faq";
import ErrorPage from "../Pages/Error/ErrorPage";
import CoverageArea from "../components/Area/CoverageArea";
import AllBooks from "../Pages/Books/AllBooks";
import BookDetails from "../Pages/Books/BookDetails";
import DashboardHome from "../components/Dashboard/DashboardHome";
import MyOrders from "../Pages/Dashboard/User/MyOrders";
import AddBook from "../Pages/Dashboard/Librarian/AddBook";
import MyBooks from "../Pages/Dashboard/Librarian/MyBooks";
import EditBook from "../Pages/Dashboard/Librarian/EditBook";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import ManageBooks from "../Pages/Dashboard/Admin/ManageBooks";
import Orders from "../Pages/Dashboard/Librarian/Orders";
import Payment from "../Pages/Dashboard/User/Payment";
import PaymentFailed from "../Pages/Dashboard/Payment/PaymentFailed";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentHistory from "../Pages/Dashboard/User/PaymentHistory";
import Transactions from "../Pages/Dashboard/Admin/Transactions";
import Wishlist from "../Pages/Dashboard/User/Wishlist";

// Layouts
import MainLayout from "../Layouts/MainLayout";
import DashboardLayout from "../Layouts/DashboardLayout";

// Routes
import PrivateRoute from "../Routes/PrivateRoute";
import AdminRoute from "./AdminRoute";
import LibrarianRoute from "./LibrarianRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      // Home page (default)
      {
        index: true,
        element: <Home />,
        loader: () => fetch("/Skills.json"),
      },

      // Public pages
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "forgot-password", element: <ResetPassword /> },
      { path: "books", element: <AllBooks /> },
      { path: "coverage", element: <CoverageArea /> },
      { path: "faq", element: <FAQPage /> },

      // Protected pages
      {
        path: "book/:id",
        element: (
          <PrivateRoute>
            <BookDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "update-profile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
      {
        path: 'payment/:orderId',
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
    ],
  },
  
  // Dashboard routes
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "my-orders",
        element: <MyOrders />,
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-history",
        element: <PaymentHistory/>
      },
      {
        path: "payment-success",
        element: <PaymentSuccess/>
      },
      {
        path: "payment-failed",
        element: <PaymentFailed/>
      },
      {
        path: "payment-cancelled",
        element: <PaymentFailed/>
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },

      //librarian Routes
      {
        path: "add-book",
        element: <LibrarianRoute><AddBook /></LibrarianRoute>,
      },
      {
        path: "my-books",
        element: <LibrarianRoute><MyBooks /></LibrarianRoute>,
      },
      {
        path: "edit-book/:id",
        element: <LibrarianRoute><EditBook /></LibrarianRoute>,
      },
      {
        path: "orders",
        element: <LibrarianRoute><Orders /></LibrarianRoute>,
      },
      
      // Admin Routes
      {
        path: "all-users",
        element: <AdminRoute><ManageUsers/></AdminRoute>
      },
      {
        path: "manage-books",
        element: <AdminRoute><ManageBooks/></AdminRoute>
      },
      {
        path: "transactions",
        element: <AdminRoute><Transactions/></AdminRoute>
      },
    ],
  },
  
  // For Error Page
  { path: "*", element: <ErrorPage /> },
]);

export default router;
