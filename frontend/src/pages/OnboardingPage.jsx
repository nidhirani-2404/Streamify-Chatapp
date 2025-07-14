// import { useState } from "react";
// import useAuthUser from "../hooks/useAuthUser";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { completeOnboarding } from "../lib/api";
// import { LoaderIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon } from "lucide-react";
// import { LANGUAGES } from "../constants";

// const OnboardingPage = () => {
//   const { authUser } = useAuthUser();
//   const queryClient = useQueryClient();

//   const [formState, setFormState] = useState({
//     fullName: authUser?.fullName || "",
//     bio: authUser?.bio || "",
//     nativeLanguage: authUser?.nativeLanguage || "",
//     learningLanguage: authUser?.learningLanguage || "",
//     location: authUser?.location || "",
//     profilePic: authUser?.profilePic || "",
//   });

//   const { mutate: onboardingMutation, isPending } = useMutation({
//     mutationFn: completeOnboarding,
//     onSuccess: () => {
//       toast.success("Profile onboarded successfully");
//       queryClient.invalidateQueries({ queryKey: ["authUser"] });
//     },

//     onError: (error) => {
//       toast.error(error.response.data.message);
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     onboardingMutation(formState);
//   };

//   const handleRandomAvatar = () => {
//     const idx = Math.floor(Math.random() * 100) + 1; // 1-100 included
//     const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

//     setFormState({ ...formState, profilePic: randomAvatar });
//     toast.success("Random profile picture generated!");
//   };

//   return (
//     <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
//       <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
//         <div className="card-body p-6 sm:p-8">
//           <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Complete Your Profile</h1>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* PROFILE PIC CONTAINER */}
//             <div className="flex flex-col items-center justify-center space-y-4">
//               {/* IMAGE PREVIEW */}
//               <div className="size-32 rounded-full bg-base-300 overflow-hidden">
//                 {formState.profilePic ? (
//                   <img
//                     src={formState.profilePic}
//                     alt="Profile Preview"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="flex items-center justify-center h-full">
//                     <CameraIcon className="size-12 text-base-content opacity-40" />
//                   </div>
//                 )}
//               </div>

//               {/* Generate Random Avatar BTN */}
//               <div className="flex items-center gap-2">
//                 <button type="button" onClick={handleRandomAvatar} className="btn btn-accent">
//                   <ShuffleIcon className="size-4 mr-2" />
//                   Generate Random Avatar
//                 </button>
//               </div>
//             </div>

//             {/* FULL NAME */}
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Full Name</span>
//               </label>
//               <input
//                 type="text"
//                 name="fullName"
//                 value={formState.fullName}
//                 onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
//                 className="input input-bordered w-full"
//                 placeholder="Your full name"
//               />
//             </div>

//             {/* BIO */}
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Bio</span>
//               </label>
//               <textarea
//                 name="bio"
//                 value={formState.bio}
//                 onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
//                 className="textarea textarea-bordered h-24"
//                 placeholder="Tell others about yourself and your language learning goals"
//               />
//             </div>

//             {/* LANGUAGES */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* NATIVE LANGUAGE */}
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Native Language</span>
//                 </label>
//                 <select
//                   name="nativeLanguage"
//                   value={formState.nativeLanguage}
//                   onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
//                   className="select select-bordered w-full"
//                 >
//                   <option value="">Select your native language</option>
//                   {LANGUAGES.map((lang) => (
//                     <option key={`native-${lang}`} value={lang.toLowerCase()}>
//                       {lang}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* LEARNING LANGUAGE */}
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Learning Language</span>
//                 </label>
//                 <select
//                   name="learningLanguage"
//                   value={formState.learningLanguage}
//                   onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
//                   className="select select-bordered w-full"
//                 >
//                   <option value="">Select language you're learning</option>
//                   {LANGUAGES.map((lang) => (
//                     <option key={`learning-${lang}`} value={lang.toLowerCase()}>
//                       {lang}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* LOCATION */}
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Location</span>
//               </label>
//               <div className="relative">
//                 <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
//                 <input
//                   type="text"
//                   name="location"
//                   value={formState.location}
//                   onChange={(e) => setFormState({ ...formState, location: e.target.value })}
//                   className="input input-bordered w-full pl-10"
//                   placeholder="City, Country"
//                 />
//               </div>
//             </div>

//             {/* SUBMIT BUTTON */}

//             <button className="btn btn-primary w-full" disabled={isPending} type="submit">
//               {!isPending ? (
//                 <>
//                   <ShipWheelIcon className="size-5 mr-2" />
//                   Complete Onboarding
//                 </>
//               ) : (
//                 <>
//                   <LoaderIcon className="animate-spin size-5 mr-2" />
//                   Onboarding...
//                 </>
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default OnboardingPage;

import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { 
  LoaderIcon, 
  MapPinIcon, 
  ShipWheelIcon, 
  ShuffleIcon, 
  CameraIcon, 
  User, 
  Globe, 
  Languages, 
  MessageSquare,
  Sparkles,
  CheckCircle,
  Target
} from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formState.fullName || !formState.nativeLanguage || !formState.learningLanguage) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    console.log("Onboarding data:", formState);
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  const completionPercentage = () => {
    const fields = [
      formState.fullName,
      formState.bio,
      formState.nativeLanguage,
      formState.learningLanguage,
      formState.location,
      formState.profilePic
    ];
    const completed = fields.filter(field => field && field.length > 0).length;
    return Math.round((completed / fields.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-40 h-40 bg-secondary/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-accent/10 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative w-full max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <ShipWheelIcon className="size-12 text-primary animate-spin-slow" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md animate-pulse"></div>
            </div>
            <span className="text-4xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent tracking-wider">
              Streamify
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Complete Your Profile
          </h1>
          <p className="text-base opacity-70 mb-4">
            Let's set up your profile to connect you with the perfect language partners
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Profile Completion</span>
              <span className="text-sm font-bold text-primary">{completionPercentage()}%</span>
            </div>
            <div className="w-full bg-base-300 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage()}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-base-100/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-primary/20 overflow-hidden">
          <div className="p-6 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* PROFILE PICTURE SECTION */}
              <div className="flex flex-col items-center space-y-6">
                <div className="relative group">
                  <div className="size-36 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden border-4 border-primary/30 shadow-xl">
                    {formState.profilePic ? (
                      <img
                        src={formState.profilePic}
                        alt="Profile Preview"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <CameraIcon className="size-16 text-primary opacity-60" />
                      </div>
                    )}
                  </div>
                  
                  {/* Random Avatar Button */}
                  <button 
                    type="button" 
                    onClick={handleRandomAvatar} 
                    className="btn btn-accent btn-sm mt-4 hover:scale-105 transition-all duration-300"
                    disabled={isPending}
                  >
                    <ShuffleIcon className="size-4 mr-2" />
                    Generate Random Avatar
                  </button>
                </div>
              </div>

              {/* FORM FIELDS */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* LEFT COLUMN */}
                <div className="space-y-6">
                  {/* FULL NAME */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <User className="size-4 text-primary" />
                        Full Name *
                      </span>
                    </label>
                    <input
                      type="text"
                      value={formState.fullName}
                      onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                      className="input input-bordered w-full h-12 focus:input-primary transition-all duration-300 bg-base-200/50"
                      placeholder="Your full name"
                      required
                      disabled={isPending}
                    />
                  </div>

                  {/* NATIVE LANGUAGE */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <Globe className="size-4 text-secondary" />
                        Native Language *
                      </span>
                    </label>
                    <select
                      value={formState.nativeLanguage}
                      onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                      className="select select-bordered w-full h-12 focus:select-primary transition-all duration-300 bg-base-200/50"
                      required
                      disabled={isPending}
                    >
                      <option value="">Select your native language</option>
                      {LANGUAGES.map((lang) => (
                        <option key={`native-${lang}`} value={lang.toLowerCase()}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* LOCATION */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <MapPinIcon className="size-4 text-accent" />
                        Location
                      </span>
                    </label>
                    <div className="relative">
                      <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-accent opacity-70" />
                      <input
                        type="text"
                        value={formState.location}
                        onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                        className="input input-bordered w-full h-12 pl-10 focus:input-primary transition-all duration-300 bg-base-200/50"
                        placeholder="City, Country"
                        disabled={isPending}
                      />
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-6">
                  {/* BIO */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <MessageSquare className="size-4 text-primary" />
                        Bio
                      </span>
                    </label>
                    <textarea
                      value={formState.bio}
                      onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                      className="textarea textarea-bordered h-24 focus:textarea-primary transition-all duration-300 bg-base-200/50 resize-none"
                      placeholder="Tell others about yourself and your language learning goals..."
                      disabled={isPending}
                    />
                  </div>

                  {/* LEARNING LANGUAGE */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <Languages className="size-4 text-secondary" />
                        Learning Language *
                      </span>
                    </label>
                    <select
                      value={formState.learningLanguage}
                      onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                      className="select select-bordered w-full h-12 focus:select-primary transition-all duration-300 bg-base-200/50"
                      required
                      disabled={isPending}
                    >
                      <option value="">Select language you're learning</option>
                      {LANGUAGES.map((lang) => (
                        <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                          {lang}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* FEATURES PREVIEW */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Target className="size-5 text-primary" />
                  What you'll get:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-5 text-green-500" />
                    <span className="text-sm">Perfect language matches</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-5 text-green-500" />
                    <span className="text-sm">Global conversation partners</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="size-5 text-green-500" />
                    <span className="text-sm">Premium chat features</span>
                  </div>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button 
                type="submit" 
                className="btn btn-primary w-full h-14 text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                disabled={isPending || !formState.fullName || !formState.nativeLanguage || !formState.learningLanguage}
              >
                {isPending ? (
                  <>
                    <LoaderIcon className="animate-spin size-5 mr-2" />
                    Setting up your profile...
                  </>
                ) : (
                  <>
                    <Sparkles className="size-5 mr-2" />
                    Complete Onboarding
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default OnboardingPage;