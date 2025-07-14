// import { useState } from "react";
// import { ShipWheelIcon } from "lucide-react";
// import { Link } from "react-router";
// import useLogin from "../hooks/useLogin";


// const LoginPage = () => {
//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });

//   // This is how we did it at first, without using our custom hook
//   // const queryClient = useQueryClient();
//   // const {
//   //   mutate: loginMutation,
//   //   isPending,
//   //   error,
//   // } = useMutation({
//   //   mutationFn: login,
//   //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
//   // });

//   // This is how we did it using our custom hook - optimized version
//   const { isPending, error, loginMutation } = useLogin();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     loginMutation(loginData);
//   };

//   return (
//     <div
//       className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
//       data-theme="forest"
//     >
//       <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
//         {/* LOGIN FORM SECTION */}
//         <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
//           {/* LOGO */}
//           <div className="mb-4 flex items-center justify-start gap-2">
//             <ShipWheelIcon className="size-9 text-primary" />
//             <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
//               Streamify
//             </span>
//           </div>

//           {/* ERROR MESSAGE DISPLAY */}
//           {error && (
//             <div className="alert alert-error mb-4">
//               <span>{error.response.data.message}</span>
//             </div>
//           )}

//           <div className="w-full">
//             <form onSubmit={handleLogin}>
//               <div className="space-y-4">
//                 <div>
//                   <h2 className="text-xl font-semibold">Welcome Back</h2>
//                   <p className="text-sm opacity-70">
//                     Sign in to your account to continue your language journey
//                   </p>
//                 </div>

//                 <div className="flex flex-col gap-3">
//                   <div className="form-control w-full space-y-2">
//                     <label className="label">
//                       <span className="label-text">Email</span>
//                     </label>
//                     <input
//                       type="email"
//                       placeholder="hello@example.com"
//                       className="input input-bordered w-full"
//                       value={loginData.email}
//                       onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
//                       required
//                     />
//                   </div>

//                   <div className="form-control w-full space-y-2">
//                     <label className="label">
//                       <span className="label-text">Password</span>
//                     </label>
//                     <input
//                       type="password"
//                       placeholder="••••••••"
//                       className="input input-bordered w-full"
//                       value={loginData.password}
//                       onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
//                       required
//                     />
//                   </div>

//                   <button type="submit" className="btn btn-primary w-full" disabled={isPending}>
//                     {isPending ? (
//                       <>
//                         <span className="loading loading-spinner loading-xs"></span>
//                         Signing in...
//                       </>
//                     ) : (
//                       "Sign In"
//                     )}
//                   </button>

//                   <div className="text-center mt-4">
//                     <p className="text-sm">
//                       Don't have an account?{" "}
//                       <Link to="/signup" className="text-primary hover:underline">
//                         Create one
//                       </Link>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>

//         {/* IMAGE SECTION */}
//         <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
//           <div className="max-w-md p-8">
//             {/* Illustration */}
//             {/* <div className="relative aspect-square max-w-sm mx-auto">
//               <img
//                 src="i.png"
//                 alt="Login image"
//                 className="w-full h-auto"
//               />

//             </div> */}

//             <div className="text-center space-y-3 mt-6">
//               <h2 className="text-xl font-semibold">Connect with language partners worldwide</h2>
//               <p className="opacity-70">
//                 Practice conversations, make friends, and improve your language skills together
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default LoginPage;
import { useState } from "react";
import { ShipWheelIcon, MessageCircle, Users, Globe, Sparkles } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!loginData.email || !loginData.password) {
      alert("Please fill in all fields");
      return;
    }
    
    console.log("Login attempt:", loginData);
    loginMutation(loginData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"
      data-theme="forest"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-40 h-40 bg-secondary/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-accent/10 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative border border-primary/20 flex flex-col lg:flex-row w-full max-w-6xl mx-auto bg-base-100/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
        {/* LOGIN FORM SECTION */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col">
          {/* LOGO */}
          <div className="mb-8 flex items-center justify-start gap-3">
            <div className="relative">
              <ShipWheelIcon className="size-10 text-primary animate-spin-slow" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md animate-pulse"></div>
            </div>
            <span className="text-4xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent tracking-wider">
              Streamify
            </span>
          </div>

          {/* ERROR MESSAGE DISPLAY */}
          {error && (
            <div className="alert alert-error mb-6 animate-shake">
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Header */}
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  Welcome Back
                </h2>
                <p className="text-base opacity-70 flex items-center justify-center lg:justify-start gap-2">
                  <MessageCircle className="size-4" />
                  Sign in to continue your conversation journey
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-5">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Email Address</span>
                  </label>
                  <input
                    type="email"
                    placeholder="hello@streamify.com"
                    className="input input-bordered w-full h-12 focus:input-primary transition-all duration-300 bg-base-200/50"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                    disabled={isPending}
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••••"
                    className="input input-bordered w-full h-12 focus:input-primary transition-all duration-300 bg-base-200/50"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                    disabled={isPending}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-full h-12 text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isPending || !loginData.email || !loginData.password}
                >
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-5" />
                      Sign In
                    </>
                  )}
                </button>

                <div className="text-center mt-6">
                  <p className="text-sm opacity-70">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-primary hover:text-primary-focus font-semibold hover:underline transition-all duration-200">
                      Create one now
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* ENHANCED IMAGE SECTION */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/10 items-center justify-center relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-20 h-20 bg-primary/20 rounded-full animate-float"></div>
            <div className="absolute top-1/3 right-10 w-16 h-16 bg-secondary/20 rounded-full animate-float delay-1000"></div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-accent/20 rounded-full animate-float delay-2000"></div>
          </div>

          <div className="relative z-10 max-w-lg p-8 text-center">
            {/* Feature icons */}
            <div className="flex justify-center space-x-8 mb-8">
              <div className="flex flex-col items-center space-y-2">
                <div className="p-4 bg-primary/20 rounded-full">
                  <MessageCircle className="size-8 text-primary" />
                </div>
                <span className="text-sm font-medium">Chat</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="p-4 bg-secondary/20 rounded-full">
                  <Users className="size-8 text-secondary" />
                </div>
                <span className="text-sm font-medium">Connect</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="p-4 bg-accent/20 rounded-full">
                  <Globe className="size-8 text-accent" />
                </div>
                <span className="text-sm font-medium">Global</span>
              </div>
            </div>

            {/* Main content */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Connect with people worldwide
              </h2>
              <p className="text-base opacity-80 leading-relaxed">
                Join millions of users sharing conversations, making friends, and building meaningful connections across the globe
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-primary/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">10M+</div>
                  <div className="text-sm opacity-70">Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">50+</div>
                  <div className="text-sm opacity-70">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">24/7</div>
                  <div className="text-sm opacity-70">Online</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;