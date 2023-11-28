import { signOut } from "../utils/firebase/auth.utils";
import { useAuth } from "../context/AuthContext";
const Account = () => {
  const { authUser, setAuthUser, setIsLoggedIn } = useAuth();

  const handleSignOut = () => {
    signOut(setAuthUser, setIsLoggedIn);
  };
  return (
    <div className="p-4">
      <div className="text-xl mb-4">Account</div>
      <h3>{authUser?.displayName}</h3>
      <h3>{authUser?.email}</h3>
      <button
        onClick={handleSignOut}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Account;
