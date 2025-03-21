import { useState } from "react";
import { retrieveUserIdLogin } from "../api/api";
import { useNavigate } from "react-router";

function Login({ setCurrentUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    retrieveUserIdLogin(username, password)
      .then((data) => {
        setIsLoading(true);
        setCurrentUser(data);
        setIsLoading(false);
        localStorage.setItem("currentUser", JSON.stringify(data));
        navigate(`/mycollections/${data.username}/${data.user_id}`);
      })
      .catch((err) => {
        setLoginError(err.response.data.msg);
      });
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <main className="bg-pagebg h-screen mb-96">
      <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-pagebg md:text-2xl">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-pagebg"
                  >
                    Username
                  </label>
                  <input
                    type="name"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-hovercolor text-pagebg rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="username"
                    required
                    onChange={handleUsername}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-pagebg"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-hovercolor text-pagebg rounded-lg focus:ring-hovercolor focus:border-hovercolor block w-full p-2.5"
                    required
                    onChange={handlePassword}
                  />
                </div>
                {loginError ? (
                  <div className="place-content-center">
                    <p className="text-red-600 text-sm"></p>
                    <div
                      className="flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50"
                      role="alert"
                    >
                      <svg
                        className="shrink-0 inline w-4 h-4 me-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                      </svg>
                      <div>
                        <span className="font-medium">
                          <p>{loginError}</p>
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="flex items-center p-4 text-sm rounded-lg bg-white"
                    role="alert"
                  ></div>
                )}

                {isLoading ? (
                  <button
                    disabled
                    type="button"
                    className="py-2.5 px-5 me-2 text-sm w-full place-content-center font-medium text-white bg-actioncolor rounded-lg inline-flex items-center"
                  >
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#1C64F2"
                      />
                    </svg>
                    Loading...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full text-white bg-hovercolor hover:bg-actioncolor focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Sign in
                  </button>
                )}

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account yet?{" "}
                  <a
                    href="/signup"
                    className="font-medium text-hovercolor hover:text-hovercolor hover:underline"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
