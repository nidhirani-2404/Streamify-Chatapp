// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router-dom";
// import { 
//   VideoIcon, 
//   PhoneIcon, 
//   MessageSquareTextIcon, 
//   MapPinIcon,
//   UsersIcon,
//   UserCheckIcon
// } from "lucide-react";
// import { getUserFriends } from "../lib/api";
// import { capitialize } from "../lib/utils";
// import { getLanguageFlag } from "../components/FriendCard";
// import PageLoader from "../components/PageLoader";
// import NoFriendsFound from "../components/NoFriendsFound";

// const FriendsPage = () => {
//   const { data: friends = [], isLoading, error } = useQuery({
//     queryKey: ["friends"],
//     queryFn: getUserFriends,
//   });
//   console.log("Friends:", friends);

//   if (isLoading) return <PageLoader />;

//   if (error) {
//     return (
//       <div className="p-6">
//         <div className="card bg-error/10 border border-error/20 p-6 text-center">
//           <h3 className="font-semibold text-lg mb-2 text-error">Error Loading Friends</h3>
//           <p className="text-base-content opacity-70">
//             Something went wrong while loading your friends. Please try again later.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (friends.length === 0) return <NoFriendsFound />;

//   return (
//     <div className="p-4 sm:p-6 lg:p-8">
//       <div className="container mx-auto space-y-6">
//         {/* Header Section */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-3">
//               <UsersIcon className="size-8 text-primary" />
//               Your Friends
//             </h1>
//             <p className="text-base-content opacity-70 mt-1">
//               {friends.length} {friends.length === 1 ? 'friend' : 'friends'} ready to chat and practice languages
//             </p>
//           </div>
          
//           <div className="flex gap-2">
//             <Link to="/notifications" className="btn btn-outline btn-sm">
//               <UserCheckIcon className="size-4 mr-2" />
//               Friend Requests
//             </Link>
//             <Link to="/" className="btn btn-primary btn-sm">
//               Find New Friends
//             </Link>
//           </div>
//         </div>

//         {/* Friends Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
//           {friends.map((friend) => (
//             <div 
//               key={friend._id} 
//               className="card bg-base-200 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
//             >
//               <div className="card-body p-5 space-y-4">
//                 {/* Friend Avatar and Info */}
//                 <div className="flex items-center gap-3">
//                   <div className="avatar">
//                     <div className="w-16 h-16 rounded-full ring-2 ring-primary/20">
//                       <img 
//                         src={friend.profilePic || '/default-avatar.png'} 
//                         alt={friend.fullName}
//                         className="object-cover"
//                       />
//                     </div>
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-lg font-semibold truncate">
//                       {friend.fullName}
//                     </h3>
//                     {friend.location && (
//                       <div className="flex items-center text-xs opacity-70 mt-1">
//                         <MapPinIcon className="size-3 mr-1 flex-shrink-0" />
//                         <span className="truncate">{friend.location}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Language Badges */}
//                 {(friend.nativeLanguage || friend.learningLanguage) && (
//                   <div className="flex flex-wrap gap-1.5">
//                     {friend.nativeLanguage && (
//                       <span className="badge badge-secondary text-xs">
//                         {getLanguageFlag(friend.nativeLanguage)}
//                         Native: {capitialize(friend.nativeLanguage)}
//                       </span>
//                     )}
//                     {friend.learningLanguage && (
//                       <span className="badge badge-outline text-xs">
//                         {getLanguageFlag(friend.learningLanguage)}
//                         Learning: {capitialize(friend.learningLanguage)}
//                       </span>
//                     )}
//                   </div>
//                 )}

//                 {/* Bio */}
//                 {friend.bio && (
//                   <p className="text-sm opacity-70 line-clamp-2">
//                     {friend.bio}
//                   </p>
//                 )}

//                 {/* Action Buttons */}
//                 <div className="flex flex-col gap-2 pt-2">
//                   <Link 
//                     to={`/chat/${friend._id}`} 
//                     className="btn btn-primary btn-sm w-full"
//                   >
//                     <MessageSquareTextIcon className="size-4 mr-2" />
//                     Start Chat
//                   </Link>
                  
//                   <div className="flex gap-2">
//                     <Link 
//                       to={`/call/${friend._id}`} 
//                       className="btn btn-outline btn-sm flex-1"
//                     >
//                       <PhoneIcon className="size-4 mr-1" />
//                       Voice Call
//                     </Link>
//                     <Link 
//                       to={`/videocall/${friend._id}`} 
//                       className="btn btn-outline btn-sm flex-1"
//                     >
//                       <VideoIcon className="size-4 mr-1" />
//                       Video Call
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Stats Section */}
//         <div className="card bg-base-300 p-6">
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
//             <div>
//               <div className="text-2xl font-bold text-primary">
//                 {friends.length}
//               </div>
//               <div className="text-sm opacity-70">Total Friends</div>
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-secondary">
//                 {new Set(friends.map(f => f.nativeLanguage).filter(Boolean)).size}
//               </div>
//               <div className="text-sm opacity-70">Languages Available</div>
//             </div>
//             <div>
//               <div className="text-2xl font-bold text-accent">
//                 {new Set(friends.map(f => f.location).filter(Boolean)).size}
//               </div>
//               <div className="text-sm opacity-70">Countries</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FriendsPage;

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { 
  VideoIcon, 
  PhoneIcon, 
  MessageSquareTextIcon, 
  MapPinIcon,
  UsersIcon,
  UserCheckIcon,
  SearchIcon,
  FilterIcon,
  HeartIcon,
  StarIcon,
  GlobeIcon,
  TrendingUpIcon
} from "lucide-react";
import { getUserFriends } from "../lib/api";
import { capitialize } from "../lib/utils";
import { getLanguageFlag } from "../components/FriendCard";
import PageLoader from "../components/PageLoader";
import NoFriendsFound from "../components/NoFriendsFound";

const FriendsPage = () => {
  const { data: friends = [], isLoading, error } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });
  console.log("Friends:", friends);

  if (isLoading) return <PageLoader />;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-300 p-6">
        <div className="container mx-auto max-w-2xl pt-20">
          <div className="card bg-gradient-to-br from-error/10 to-error/5 backdrop-blur-sm border border-error/20 shadow-2xl">
            <div className="card-body p-8 text-center">
              <div className="w-16 h-16 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <UsersIcon className="size-8 text-error" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-error">Error Loading Friends</h3>
              <p className="text-base-content/70 text-lg">
                Something went wrong while loading your friends. Please try again later.
              </p>
              <div className="mt-6">
                <button className="btn btn-error btn-outline">Try Again</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (friends.length === 0) return <NoFriendsFound />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header Section */}
        <div className="relative mb-12">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl blur-3xl -z-10"></div>
          
          <div className="card bg-base-100/80 backdrop-blur-sm shadow-2xl border-0">
            <div className="card-body p-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-lg">
                    <UsersIcon className="size-8 text-primary-content" />
                  </div>
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Your Friends
                    </h1>
                    <p className="text-base-content/70 text-lg mt-1 flex items-center gap-2">
                      <HeartIcon className="size-4 text-error fill-current" />
                      {friends.length} {friends.length === 1 ? 'friend' : 'friends'} ready to chat and practice languages
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <button className="btn btn-ghost btn-sm gap-2">
                    <SearchIcon className="size-4" />
                    Search
                  </button>
                  <button className="btn btn-ghost btn-sm gap-2">
                    <FilterIcon className="size-4" />
                    Filter
                  </button>
                  <Link to="/notifications" className="btn btn-outline btn-sm gap-2 hover:scale-105 transition-transform">
                    <UserCheckIcon className="size-4" />
                    Friend Requests
                  </Link>
                  <Link to="/" className="btn btn-primary btn-sm gap-2 hover:scale-105 transition-transform shadow-lg">
                    <StarIcon className="size-4" />
                    Find New Friends
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Friends Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {friends.map((friend, index) => (
            <div 
              key={friend._id} 
              className="group card bg-base-100/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-rotate-1 border-0"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              <div className="card-body p-6 space-y-5">
                {/* Enhanced Friend Avatar and Info */}
                <div className="flex items-center gap-4">
                  <div className="avatar relative">
                    <div className="w-20 h-20 rounded-2xl ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                      <img 
                        src={friend.profilePic || '/default-avatar.png'} 
                        alt={friend.fullName}
                        className="object-cover rounded-2xl"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-base-100 animate-pulse"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold truncate group-hover:text-primary transition-colors">
                      {friend.fullName}
                    </h3>
                    {friend.location && (
                      <div className="flex items-center text-sm opacity-70 mt-1 group-hover:opacity-100 transition-opacity">
                        <MapPinIcon className="size-4 mr-1 flex-shrink-0 text-primary" />
                        <span className="truncate">{friend.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Enhanced Language Badges */}
                {(friend.nativeLanguage || friend.learningLanguage) && (
                  <div className="flex flex-wrap gap-2">
                    {friend.nativeLanguage && (
                      <span className="badge badge-secondary gap-1 px-3 py-2 text-xs font-medium hover:scale-105 transition-transform">
                        {getLanguageFlag(friend.nativeLanguage)}
                        Native: {capitialize(friend.nativeLanguage)}
                      </span>
                    )}
                    {friend.learningLanguage && (
                      <span className="badge badge-outline gap-1 px-3 py-2 text-xs font-medium hover:scale-105 transition-transform">
                        {getLanguageFlag(friend.learningLanguage)}
                        Learning: {capitialize(friend.learningLanguage)}
                      </span>
                    )}
                  </div>
                )}

                {/* Enhanced Bio */}
                {friend.bio && (
                  <div className="bg-base-200/50 rounded-xl p-3">
                    <p className="text-sm opacity-80 line-clamp-2 leading-relaxed">
                      "{friend.bio}"
                    </p>
                  </div>
                )}

                {/* Enhanced Action Buttons */}
                <div className="flex flex-col gap-3 pt-3">
                  <Link 
                    to={`/chat/${friend._id}`} 
                    className="btn btn-primary btn-sm w-full gap-2 hover:scale-105 transition-transform shadow-lg"
                  >
                    <MessageSquareTextIcon className="size-4" />
                    Start Chat
                  </Link>
                  
                  <div className="flex gap-2">
                    <Link 
                      to={`/call/${friend._id}`} 
                      className="btn btn-outline btn-sm flex-1 gap-1 hover:scale-105 transition-transform"
                    >
                      <PhoneIcon className="size-4" />
                      Voice
                    </Link>
                    <Link 
                      to={`/videocall/${friend._id}`} 
                      className="btn btn-outline btn-sm flex-1 gap-1 hover:scale-105 transition-transform"
                    >
                      <VideoIcon className="size-4" />
                      Video
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Stats Section */}
        <div className="card bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-sm shadow-2xl border-0">
          <div className="card-body p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Your Network Stats
              </h2>
              <p className="text-base-content/70 mt-2">Building connections across the globe</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="text-center group hover:scale-105 transition-transform">
                <div className="p-4 bg-primary/10 rounded-2xl inline-block mb-3 group-hover:bg-primary/20 transition-colors">
                  <UsersIcon className="size-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-1">
                  {friends.length}
                </div>
                <div className="text-sm opacity-70 font-medium">Total Friends</div>
              </div>
              
              <div className="text-center group hover:scale-105 transition-transform">
                <div className="p-4 bg-secondary/10 rounded-2xl inline-block mb-3 group-hover:bg-secondary/20 transition-colors">
                  <GlobeIcon className="size-8 text-secondary" />
                </div>
                <div className="text-3xl font-bold text-secondary mb-1">
                  {new Set(friends.map(f => f.nativeLanguage).filter(Boolean)).size}
                </div>
                <div className="text-sm opacity-70 font-medium">Languages Available</div>
              </div>
              
              <div className="text-center group hover:scale-105 transition-transform">
                <div className="p-4 bg-accent/10 rounded-2xl inline-block mb-3 group-hover:bg-accent/20 transition-colors">
                  <TrendingUpIcon className="size-8 text-accent" />
                </div>
                <div className="text-3xl font-bold text-accent mb-1">
                  {new Set(friends.map(f => f.location).filter(Boolean)).size}
                </div>
                <div className="text-sm opacity-70 font-medium">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default FriendsPage;