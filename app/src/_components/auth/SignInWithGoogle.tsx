import { signInWithGoogle } from "../../_lib/auth/actions";
import Button from "../Button";

export default function SignInWithGoogle() {
  return (
    <Button
      type="button"
      degree="secondary"
      onClick={signInWithGoogle}
      extraStyle="w-full py-2.5 flex items-center justify-center gap-2 rounded-md border border-slate-400"
    >
      <svg
        className="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
      >
        <path
          fill="#FFC107"
          d="M43.611 20.083h-2.033V20H24v8h11.303C33.678 32.64 29.308 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.151 7.961 3.039l5.657-5.657C33.64 6.345 29.084 4 24 4 12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20c0-1.341-.138-2.647-.389-3.917z"
        />
        <path
          fill="#FF3D00"
          d="M6.306 14.691l6.571 4.819C14.655 16.108 18.962 14 24 14c3.059 0 5.842 1.151 7.961 3.039l5.657-5.657C33.64 6.345 29.084 4 24 4c-7.438 0-13.734 4.074-17.694 10.691z"
        />
        <path
          fill="#4CAF50"
          d="M24 44c5.183 0 9.799-1.966 13.317-5.146l-6.168-5.238C29.047 35.091 26.63 36 24 36c-5.281 0-9.672-3.407-11.297-8.075l-6.56 5.061C10.241 40.229 16.627 44 24 44z"
        />
        <path
          fill="#1976D2"
          d="M43.611 20.083h-2.033V20H24v8h11.303C34.585 32.64 29.308 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.151 7.961 3.039l5.657-5.657C33.64 6.345 29.084 4 24 4 12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20c0-1.341-.138-2.647-.389-3.917z"
        />
      </svg>
      <span>Sign in with Google</span>
    </Button>
  );
}
