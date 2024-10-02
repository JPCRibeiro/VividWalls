import { useContext } from "react";
import NewPost from "../components/UploadForm";
import { UserContext } from "../components/UserProvider";
import { Navigate } from "react-router-dom";

export default function Upload() {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    return;
  }

  return (
    <>
      {user ? (
        <main className="p-[30px]">
          <div className="flex flex-col items-center justify-center text-white mt-[60px]">
            <NewPost />
          </div>
        </main>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
}