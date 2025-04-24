import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { PrivateRoute } from "./auth/components/PrivateRoute";
import { AuthLayout } from "./auth/layout/AuthLayout";
import { LoginPage } from "./auth/pages/LoginPage";
import { RegisterPage } from "./auth/pages/RegisterPage";
import { awaitSleep } from "./lib/sleep";

// import ChatLayout from "./chat/layout/ChatLayout";

const ChatLayout = lazy(async () => {
  await awaitSleep(1500);
  return import("./chat/layout/ChatLayout");
});

const ChatPage = lazy(async () => {
  return import("./chat/pages/ChatPage");
});

const NotFoundChatPage = lazy(() => import("./chat/pages/NotFoundChat"));

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        {/* Chat Routes */}
        <Route
          path="/chat"
          element={
            <Suspense
              fallback={
                <div className="flex justify-center items-center min-h-screen">
                  <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
              }
            >
              <PrivateRoute isAuthenticated={false}>
                <ChatLayout />
              </PrivateRoute>
            </Suspense>
          }
        >
          <Route index element={<NotFoundChatPage />} />
          <Route path=":clientId" element={<ChatPage />} />
        </Route>

        {/* Reedirect to Auth */}
        <Route path="/" element={<Navigate to={"/auth"} replace />} />
      </Routes>
    </BrowserRouter>
  );
};
