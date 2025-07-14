// import { useState } from "react";
// import { ShipWheelIcon } from "lucide-react";
// import { Link } from "react-router";

// import useSignUp from "../hooks/useSignUp";

// const SignUpPage = () => {
//   const [signupData, setSignupData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//   });

//   // This is how we did it at first, without using our custom hook
//   // const queryClient = useQueryClient();
//   // const {
//   //   mutate: signupMutation,
//   //   isPending,
//   //   error,
//   // } = useMutation({
//   //   mutationFn: signup,
//   //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
//   // });

//   // This is how we did it using our custom hook - optimized version
//   const { isPending, error, signupMutation } = useSignUp();

//   const handleSignup = (e) => {
//     e.preventDefault();
//     signupMutation(signupData);
//   };

//   return (
//     <div
//       className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
//       data-theme="forest"
//     >
//       <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
//         {/* SIGNUP FORM - LEFT SIDE */}
//         <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
//           {/* LOGO */}
//           <div className="mb-4 flex items-center justify-start gap-2">
//             <ShipWheelIcon className="size-9 text-primary" />
//             <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
//               Streamify
//             </span>
//           </div>

//           {/* ERROR MESSAGE IF ANY */}
//           {error && (
//             <div className="alert alert-error mb-4">
//               <span>{error.response.data.message}</span>
//             </div>
//           )}

//           <div className="w-full">
//             <form onSubmit={handleSignup}>
//               <div className="space-y-4">
//                 <div>
//                   <h2 className="text-xl font-semibold">Create an Account</h2>
//                   <p className="text-sm opacity-70">
//                     Join Streamify and start your language learning adventure!
//                   </p>
//                 </div>

//                 <div className="space-y-3">
//                   {/* FULLNAME */}
//                   <div className="form-control w-full">
//                     <label className="label">
//                       <span className="label-text">Full Name</span>
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="John Doe"
//                       className="input input-bordered w-full"
//                       value={signupData.fullName}
//                       onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
//                       required
//                     />
//                   </div>
//                   {/* EMAIL */}
//                   <div className="form-control w-full">
//                     <label className="label">
//                       <span className="label-text">Email</span>
//                     </label>
//                     <input
//                       type="email"
//                       placeholder="john@gmail.com"
//                       className="input input-bordered w-full"
//                       value={signupData.email}
//                       onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
//                       required
//                     />
//                   </div>
//                   {/* PASSWORD */}
//                   <div className="form-control w-full">
//                     <label className="label">
//                       <span className="label-text">Password</span>
//                     </label>
//                     <input
//                       type="password"
//                       placeholder="********"
//                       className="input input-bordered w-full"
//                       value={signupData.password}
//                       onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
//                       required
//                     />
//                     <p className="text-xs opacity-70 mt-1">
//                       Password must be at least 6 characters long
//                     </p>
//                   </div>

//                   <div className="form-control">
//                     <label className="label cursor-pointer justify-start gap-2">
//                       <input type="checkbox" className="checkbox checkbox-sm" required />
//                       <span className="text-xs leading-tight">
//                         I agree to the{" "}
//                         <span className="text-primary hover:underline">terms of service</span> and{" "}
//                         <span className="text-primary hover:underline">privacy policy</span>
//                       </span>
//                     </label>
//                   </div>
//                 </div>

//                 <button className="btn btn-primary w-full" type="submit">
//                   {isPending ? (
//                     <>
//                       <span className="loading loading-spinner loading-xs"></span>
//                       Loading...
//                     </>
//                   ) : (
//                     "Create Account"
//                   )}
//                 </button>

//                 <div className="text-center mt-4">
//                   <p className="text-sm">
//                     Already have an account?{" "}
//                     <Link to="/login" className="text-primary hover:underline">
//                       Sign in
//                     </Link>
//                   </p>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>

//         {/* SIGNUP FORM - RIGHT SIDE */}
//         <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
//           <div className="max-w-md p-8">
//             {/* Illustration */}
//             <div className="relative aspect-square max-w-sm mx-auto">
//               <img src="/i.png" alt="Language connection illustration" className="w-full h-full" />
//             </div>

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

// export default SignUpPage;


import { useState } from "react";
import { ShipWheelIcon, UserPlus, Mail, Lock, User, Shield, Globe2, Heart, Star } from "lucide-react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!signupData.fullName || !signupData.email || !signupData.password) {
      alert("Please fill in all fields");
      return;
    }
    
    if (signupData.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    
    console.log("Signup attempt:", signupData);
    signupMutation(signupData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"
      data-theme="forest"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 left-20 w-40 h-40 bg-primary/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-accent/10 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative border border-primary/20 flex flex-col lg:flex-row w-full max-w-6xl mx-auto bg-base-100/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
        {/* ENHANCED RIGHT SIDE - FEATURES */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-secondary/20 via-primary/15 to-accent/10 items-center justify-center relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 right-10 w-20 h-20 bg-secondary/20 rounded-full animate-float"></div>
            <div className="absolute top-1/3 left-10 w-16 h-16 bg-primary/20 rounded-full animate-float delay-1000"></div>
            <div className="absolute bottom-20 right-1/4 w-12 h-12 bg-accent/20 rounded-full animate-float delay-2000"></div>
          </div>

          <div className="relative z-10 max-w-lg p-8 text-center">
            {/* Welcome message */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-4">
                <UserPlus className="size-10 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Join Streamify Today!
              </h2>
              <p className="text-base opacity-80 leading-relaxed">
                Create your account and become part of our global community of conversation enthusiasts
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 text-left">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <Globe2 className="size-4 text-primary" />
                </div>
                <span className="text-sm">Connect with users worldwide</span>
              </div>
              <div className="flex items-center space-x-3 text-left">
                <div className="flex-shrink-0 w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                  <Heart className="size-4 text-secondary" />
                </div>
                <span className="text-sm">Make meaningful friendships</span>
              </div>
              <div className="flex items-center space-x-3 text-left">
                <div className="flex-shrink-0 w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                  <Star className="size-4 text-accent" />
                </div>
                <span className="text-sm">Premium chat experience</span>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-primary/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-xs opacity-70">Secure</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">Free</div>
                <div className="text-xs opacity-70">Forever</div>
              </div>
            </div>
          </div>
        </div>

        {/* SIGNUP FORM SECTION */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col">
          {/* LOGO */}
          <div className="mb-6 flex items-center justify-start gap-3">
            <div className="relative">
              <ShipWheelIcon className="size-10 text-primary animate-spin-slow" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md animate-pulse"></div>
            </div>
            <span className="text-4xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent tracking-wider">
              Streamify
            </span>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="alert alert-error mb-6 animate-shake">
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleSignup} className="space-y-6">
              {/* Header */}
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  Create Account
                </h2>
                <p className="text-base opacity-70">
                  Join Streamify and start your conversation journey!
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {/* FULL NAME */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <User className="size-4" />
                      Full Name
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="input input-bordered w-full h-12 focus:input-primary transition-all duration-300 bg-base-200/50"
                    value={signupData.fullName}
                    onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                    required
                    disabled={isPending}
                  />
                </div>

                {/* EMAIL */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <Mail className="size-4" />
                      Email Address
                    </span>
                  </label>
                  <input
                    type="email"
                    placeholder="john@streamify.com"
                    className="input input-bordered w-full h-12 focus:input-primary transition-all duration-300 bg-base-200/50"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    required
                    disabled={isPending}
                  />
                </div>

                {/* PASSWORD */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <Lock className="size-4" />
                      Password
                    </span>
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••••"
                    className="input input-bordered w-full h-12 focus:input-primary transition-all duration-300 bg-base-200/50"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    required
                    disabled={isPending}
                  />
                  <label className="label">
                    <span className="label-text-alt opacity-70">
                      Password must be at least 6 characters long
                    </span>
                  </label>
                </div>

                {/* TERMS CHECKBOX */}
                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-3">
                    <input 
                      type="checkbox" 
                      className="checkbox checkbox-primary checkbox-sm" 
                      required 
                      disabled={isPending}
                    />
                    <span className="text-sm leading-tight flex items-center gap-1">
                      <Shield className="size-4 opacity-70" />
                      I agree to the{" "}
                      <span className="text-primary hover:underline font-medium">terms of service</span> and{" "}
                      <span className="text-primary hover:underline font-medium">privacy policy</span>
                    </span>
                  </label>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button 
                type="submit" 
                className="btn btn-primary w-full h-12 text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isPending || !signupData.fullName || !signupData.email || !signupData.password}
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="size-5" />
                    Create Account
                  </>
                )}
              </button>

              {/* LOGIN LINK */}
              <div className="text-center mt-6">
                <p className="text-sm opacity-70">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:text-primary-focus font-semibold hover:underline transition-all duration-200">
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
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

export default SignUpPage;
 