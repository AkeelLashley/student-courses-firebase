import { signInWithGoogle } from "../utils/firebase/auth.utils";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { setAuthUser, setIsLoggedIn } = useAuth();

  const handleGoogleSignIn = () => {
    signInWithGoogle(setAuthUser, setIsLoggedIn);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleGoogleSignIn}
        className="bg-red-500 text-white font-bold py-2 px-4 rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
}
