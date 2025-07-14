// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
// import {
//   getOutgoingFriendReqs,
//   getRecommendedUsers,
//   getUserFriends,
//   sendFriendRequest,
// } from "../lib/api";
// import { Link } from "react-router-dom";
// import {
//   CheckCircleIcon,
//   MapPinIcon,
//   UserPlusIcon,
//   UsersIcon,
// } from "lucide-react";

// import { capitialize } from "../lib/utils";

// import FriendCard, { getLanguageFlag } from "../components/FriendCard";
// import NoFriendsFound from "../components/NoFriendsFound";

// const HomePage = () => {
//   const queryClient = useQueryClient();
//   const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

//   // Fetch user's current friends
//   const { data: friends = [], isLoading: loadingFriends } = useQuery({
//     queryKey: ["friends"],
//     queryFn: getUserFriends,
//   });

//   // Fetch recommended users to connect with
//   const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
//     queryKey: ["users"],
//     queryFn: getRecommendedUsers,
//   });

//   // Fetch outgoing friend requests
//   const { data: outgoingFriendReqs = [] } = useQuery({
//     queryKey: ["outgoingFriendReqs"],
//     queryFn: getOutgoingFriendReqs,
//   });

//   // Handle sending friend requests
//   const { mutate: sendRequestMutation, isPending } = useMutation({
//     mutationFn: sendFriendRequest,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
//     },
//   });

//   // Only update outgoingRequestsIds if different
//   useEffect(() => {
//     const newOutgoingIds = new Set();
//     outgoingFriendReqs.forEach((req) => newOutgoingIds.add(req.recipient._id));

//     setOutgoingRequestsIds((prev) => {
//       const isSame =
//         prev.size === newOutgoingIds.size &&
//         [...prev].every((id) => newOutgoingIds.has(id));
//       return isSame ? prev : newOutgoingIds;
//     });
//   }, [outgoingFriendReqs]);

//   return (
//     <div className="p-4 sm:p-6 lg:p-8">
//       <div className="container mx-auto space-y-10">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//           <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
//             Your Friends
//           </h2>
//           <Link to="/notifications" className="btn btn-outline btn-sm">
//             <UsersIcon className="mr-2 size-4" />
//             Friend Requests
//           </Link>
//         </div>

//         {loadingFriends ? (
//           <div className="flex justify-center py-12">
//             <span className="loading loading-spinner loading-lg" />
//           </div>
//         ) : friends.length === 0 ? (
//           <NoFriendsFound />
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//             {friends.map((friend) => (
//               <FriendCard key={friend._id} friend={friend} />
//             ))}
//           </div>
//         )}

//         <section>
//           <div className="mb-6 sm:mb-8">
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//               <div>
//                 <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
//                   Meet New Learners
//                 </h2>
//                 <p className="opacity-70">
//                   Discover perfect language exchange partners based on your
//                   profile
//                 </p>
//               </div>
//             </div>
//           </div>

//           {loadingUsers ? (
//             <div className="flex justify-center py-12">
//               <span className="loading loading-spinner loading-lg" />
//             </div>
//           ) : recommendedUsers.length === 0 ? (
//             <div className="card bg-base-200 p-6 text-center">
//               <h3 className="font-semibold text-lg mb-2">
//                 No recommendations available
//               </h3>
//               <p className="text-base-content opacity-70">
//                 Check back later for new language partners!
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {recommendedUsers.map((user) => {
//                 const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

//                 return (
//                   <div
//                     key={user._id}
//                     className="card bg-base-200 hover:shadow-lg transition-all duration-300"
//                   >
//                     <div className="card-body p-5 space-y-4">
//                       <div className="flex items-center gap-3">
//                         <div className="avatar size-16 rounded-full">
//                           <img
//                             src={user.profilePic}
//                             alt={user.fullName}
//                             className="rounded-full"
//                           />
//                         </div>

//                         <div>
//                           <h3 className="font-semibold text-lg">
//                             {user.fullName}
//                           </h3>
//                           {user.location && (
//                             <div className="flex items-center text-xs opacity-70 mt-1">
//                               <MapPinIcon className="size-3 mr-1" />
//                               {user.location}
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       <div className="flex flex-wrap gap-1.5">
//                         <span className="badge badge-secondary">
//                           {getLanguageFlag(user.nativeLanguage)}
//                           Native: {capitialize(user.nativeLanguage)}
//                         </span>
//                         <span className="badge badge-outline">
//                           {getLanguageFlag(user.learningLanguage)}
//                           Learning: {capitialize(user.learningLanguage)}
//                         </span>
//                       </div>

//                       {user.bio && (
//                         <p className="text-sm opacity-70">{user.bio}</p>
//                       )}

//                       <button
//                         className={`btn w-full mt-2 ${
//                           hasRequestBeenSent ? "btn-disabled" : "btn-primary"
//                         }`}
//                         onClick={() => sendRequestMutation(user._id)}
//                         disabled={hasRequestBeenSent || isPending}
//                       >
//                         {hasRequestBeenSent ? (
//                           <>
//                             <CheckCircleIcon className="size-4 mr-2" />
//                             Request Sent
//                           </>
//                         ) : (
//                           <>
//                             <UserPlusIcon className="size-4 mr-2" />
//                             Send Friend Request
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
// import {
//   getOutgoingFriendReqs,
//   getRecommendedUsers,
//   getUserFriends,
//   sendFriendRequest,
// } from "../lib/api";
// import { Link } from "react-router-dom";
// import {
//   CheckCircleIcon,
//   MapPinIcon,
//   UserPlusIcon,
//   UsersIcon,
//   HeartIcon,
//   SparklesIcon,
//   GlobeIcon,
//   MessageCircleIcon,
//   PhoneIcon,
// } from "lucide-react";

// import { capitialize } from "../lib/utils";

// import FriendCard, { getLanguageFlag } from "../components/FriendCard";
// import NoFriendsFound from "../components/NoFriendsFound";

// const HomePage = () => {
//   const queryClient = useQueryClient();
//   const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

//   // Fetch user's current friends
//   const { data: friends = [], isLoading: loadingFriends } = useQuery({
//     queryKey: ["friends"],
//     queryFn: getUserFriends,
//   });

//   // Fetch recommended users to connect with
//   const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
//     queryKey: ["users"],
//     queryFn: getRecommendedUsers,
//   });

//   // Fetch outgoing friend requests
//   const { data: outgoingFriendReqs = [] } = useQuery({
//     queryKey: ["outgoingFriendReqs"],
//     queryFn: getOutgoingFriendReqs,
//   });

//   // Handle sending friend requests
//   const { mutate: sendRequestMutation, isPending } = useMutation({
//     mutationFn: sendFriendRequest,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
//     },
//   });

//   // Only update outgoingRequestsIds if different
//   useEffect(() => {
//     const newOutgoingIds = new Set();
//     outgoingFriendReqs.forEach((req) => newOutgoingIds.add(req.recipient._id));

//     setOutgoingRequestsIds((prev) => {
//       const isSame =
//         prev.size === newOutgoingIds.size &&
//         [...prev].every((id) => newOutgoingIds.has(id));
//       return isSame ? prev : newOutgoingIds;
//     });
//   }, [outgoingFriendReqs]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200/50 to-base-300/30 p-4 sm:p-6 lg:p-8">
//       <div className="container mx-auto space-y-12">
        
//         {/* Friends Section */}
//         <section className="space-y-8">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg">
//                 <HeartIcon className="h-6 w-6 text-white" />
//               </div>
//               <div>
//                 <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
//                   Your Friends
//                 </h2>
//                 <p className="text-base-content/70 mt-1">
//                   Connect with your language learning community
//                 </p>
//               </div>
//             </div>
//             <Link 
//               to="/notifications" 
//               className="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
//             >
//               <UsersIcon className="h-5 w-5" />
//               Friend Requests
//             </Link>
//           </div>

//           {loadingFriends ? (
//             <div className="flex flex-col items-center justify-center py-16">
//               <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
//               <p className="text-base-content/60 animate-pulse">Loading your friends...</p>
//             </div>
//           ) : friends.length === 0 ? (
//             <div className="flex justify-center py-12">
//               <NoFriendsFound />
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {friends.map((friend, index) => (
//                 <div
//                   key={friend._id}
//                   className="card bg-gradient-to-br from-base-100 to-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group border border-base-300"
//                   style={{ animationDelay: `${index * 100}ms` }}
//                 >
//                   <div className="card-body p-4 space-y-3">
//                     <div className="flex items-center gap-3">
//                       <div className="avatar">
//                         <div className="w-12 h-12 rounded-full ring-2 ring-primary/20 ring-offset-1 ring-offset-base-100 group-hover:ring-primary/40 transition-all duration-300">
//                           <img
//                             src={friend.profilePic}
//                             alt={friend.fullName}
//                             className="rounded-full object-cover"
//                           />
//                         </div>
//                       </div>

//                       <div className="flex-1 min-w-0">
//                         <h3 className="font-semibold text-base text-base-content group-hover:text-primary transition-colors truncate">
//                           {friend.fullName}
//                         </h3>
//                         {friend.location && (
//                           <div className="flex items-center text-xs text-base-content/70 mt-0.5">
//                             <MapPinIcon className="h-3 w-3 mr-1 flex-shrink-0" />
//                             <span className="truncate">{friend.location}</span>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <div className="flex flex-wrap gap-1.5">
//                       <div className="badge badge-primary badge-sm gap-1 px-2 py-1">
//                         <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
//                         {getLanguageFlag(friend.nativeLanguage)}
//                         <span className="hidden sm:inline">Native: </span>
//                         {capitialize(friend.nativeLanguage)}
//                       </div>
//                       <div className="badge badge-outline badge-sm gap-1 px-2 py-1">
//                         <div className="w-1.5 h-1.5 bg-warning rounded-full"></div>
//                         {getLanguageFlag(friend.learningLanguage)}
//                         <span className="hidden sm:inline">Learning: </span>
//                         {capitialize(friend.learningLanguage)}
//                       </div>
//                     </div>

//                     {friend.bio && (
//                       <div className="bg-base-300/30 rounded-md p-2 border-l-2 border-primary/50">
//                         <p className="text-xs text-base-content/80 italic line-clamp-2">{friend.bio}</p>
//                       </div>
//                     )}

//                     <div className="flex gap-2">
//                       <Link
//                         to={`/chat/${friend._id}`}
//                         className="btn btn-primary btn-sm flex-1 gap-2 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
//                       >
//                         <MessageCircleIcon className="h-4 w-4" />
//                         Message
//                       </Link>
//                       <button
//                         className="btn btn-secondary btn-sm gap-2 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
//                         onClick={() => {
//                           // Handle voice/video call functionality
//                           alert(`Calling ${friend.fullName}...`);
//                           // You can integrate with your call service here
//                           // Example integrations:
//                           // - window.open(`tel:${friend.phoneNumber}`) for phone calls
//                           // - Start WebRTC call
//                           // - Integrate with Twilio, Agora, or other calling services
//                         }}
//                       >
//                         <PhoneIcon className="h-4 w-4" />
//                         <span className="hidden sm:inline">Call</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </section>

//         {/* Recommended Users Section */}
//         <section className="space-y-8">
//           <div className="text-center mb-8">
//             <div className="flex items-center justify-center gap-3 mb-4">
//               <div className="p-3 bg-gradient-to-r from-secondary to-accent rounded-full shadow-lg">
//                 <GlobeIcon className="h-6 w-6 text-white" />
//               </div>
//               <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
//                 Meet New Learners
//               </h2>
//             </div>
//             <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
//               Discover perfect language exchange partners based on your profile and interests
//             </p>
//           </div>

//           {loadingUsers ? (
//             <div className="flex flex-col items-center justify-center py-16">
//               <div className="loading loading-spinner loading-lg text-secondary mb-4"></div>
//               <p className="text-base-content/60 animate-pulse">Finding perfect matches...</p>
//             </div>
//           ) : recommendedUsers.length === 0 ? (
//             <div className="card bg-gradient-to-r from-base-200 to-base-300 shadow-xl border border-base-300 p-8 text-center max-w-md mx-auto">
//               <div className="p-4 bg-base-300/50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
//                 <SparklesIcon className="h-8 w-8 text-base-content/50" />
//               </div>
//               <h3 className="font-bold text-xl mb-2">No recommendations available</h3>
//               <p className="text-base-content/70">
//                 Check back later for new language partners!
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {recommendedUsers.map((user, index) => {
//                 const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

//                 return (
//                   <div
//                     key={user._id}
//                     className="card bg-gradient-to-br from-base-100 to-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group border border-base-300"
//                     style={{ animationDelay: `${index * 100}ms` }}
//                   >
//                     <div className="card-body p-4 space-y-3">
//                       <div className="flex items-center gap-3">
//                         <div className="avatar">
//                           <div className="w-12 h-12 rounded-full ring-2 ring-secondary/20 ring-offset-1 ring-offset-base-100 group-hover:ring-secondary/40 transition-all duration-300">
//                             <img
//                               src={user.profilePic}
//                               alt={user.fullName}
//                               className="rounded-full object-cover"
//                             />
//                           </div>
//                         </div>

//                         <div className="flex-1">
//                           <h3 className="font-semibold text-base text-base-content group-hover:text-secondary transition-colors">
//                             {user.fullName}
//                           </h3>
//                           {user.location && (
//                             <div className="flex items-center text-xs text-base-content/70 mt-0.5">
//                               <MapPinIcon className="h-3 w-3 mr-1" />
//                               {user.location}
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       <div className="flex flex-wrap gap-1.5">
//                         <div className="badge badge-secondary badge-sm gap-1 px-2 py-1">
//                           <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
//                           {getLanguageFlag(user.nativeLanguage)}
//                           Native: {capitialize(user.nativeLanguage)}
//                         </div>
//                         <div className="badge badge-outline badge-sm gap-1 px-2 py-1">
//                           <div className="w-1.5 h-1.5 bg-warning rounded-full"></div>
//                           {getLanguageFlag(user.learningLanguage)}
//                           Learning: {capitialize(user.learningLanguage)}
//                         </div>
//                       </div>

//                       {user.bio && (
//                         <div className="bg-base-300/30 rounded-md p-2 border-l-2 border-secondary/50">
//                           <p className="text-xs text-base-content/80 italic line-clamp-2">{user.bio}</p>
//                         </div>
//                       )}

//                       <button
//                         className={`btn btn-sm w-full gap-2 shadow-md transition-all duration-300 ${
//                           hasRequestBeenSent 
//                             ? "btn-success btn-disabled" 
//                             : "btn-primary hover:shadow-lg hover:scale-105"
//                         }`}
//                         onClick={() => sendRequestMutation(user._id)}
//                         disabled={hasRequestBeenSent || isPending}
//                       >
//                         {isPending ? (
//                           <>
//                             <span className="loading loading-spinner loading-xs"></span>
//                             Sending...
//                           </>
//                         ) : hasRequestBeenSent ? (
//                           <>
//                             <CheckCircleIcon className="h-4 w-4" />
//                             Request Sent
//                           </>
//                         ) : (
//                           <>
//                             <UserPlusIcon className="h-4 w-4" />
//                             Send Friend Request
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// };

// export default HomePage;


import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router-dom";
import {
  CheckCircleIcon,
  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
  HeartIcon,
  SparklesIcon,
  GlobeIcon,
  MessageCircleIcon,
  PhoneIcon,
} from "lucide-react";

import { capitialize } from "../lib/utils";

import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  // Fetch user's current friends
  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  // Fetch recommended users to connect with
  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  // Fetch outgoing friend requests
  const { data: outgoingFriendReqs = [] } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  // Handle sending friend requests
  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
    },
  });

  // Voice call handler
  const handleVoiceCall = (friend) => {
    // Option 1: Direct phone call (if you have phone numbers)
    if (friend.phoneNumber) {
      window.location.href = `tel:${friend.phoneNumber}`;
      return;
    }

    // Option 2: WebRTC call (redirect to call page)
    window.open(`/call/${friend._id}`, '_blank');
    
    // Option 3: Third-party service integration
    // Examples:
    // - Twilio: window.open(`https://your-twilio-app.com/call/${friend._id}`)
    // - Agora: window.open(`https://your-agora-app.com/call/${friend._id}`)
    // - Jitsi Meet: window.open(`https://meet.jit.si/call-${friend._id}`)
    // - Google Meet: window.open(`https://meet.google.com/new`)
    // - Zoom: window.open(`https://zoom.us/start/videomeeting`)
    
    // Option 4: WhatsApp call (if you have WhatsApp numbers)
    // window.open(`https://wa.me/${friend.whatsappNumber}`)
    
    // Option 5: Skype call
    // window.open(`skype:${friend.skypeId}?call`)
  };

  // Only update outgoingRequestsIds if different
  useEffect(() => {
    const newOutgoingIds = new Set();
    outgoingFriendReqs.forEach((req) => newOutgoingIds.add(req.recipient._id));

    setOutgoingRequestsIds((prev) => {
      const isSame =
        prev.size === newOutgoingIds.size &&
        [...prev].every((id) => newOutgoingIds.has(id));
      return isSame ? prev : newOutgoingIds;
    });
  }, [outgoingFriendReqs]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200/50 to-base-300/30 p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-12">
        
        {/* Friends Section */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg">
                <HeartIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Your Friends
                </h2>
                <p className="text-base-content/70 mt-1">
                  Connect with your language learning community
                </p>
              </div>
            </div>
            <Link 
              to="/notifications" 
              className="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <UsersIcon className="h-5 w-5" />
              Friend Requests
            </Link>
          </div>

          {loadingFriends ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
              <p className="text-base-content/60 animate-pulse">Loading your friends...</p>
            </div>
          ) : friends.length === 0 ? (
            <div className="flex justify-center py-12">
              <NoFriendsFound />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {friends.map((friend, index) => (
                <div
                  key={friend._id}
                  className="card bg-gradient-to-br from-base-100 to-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group border border-base-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="card-body p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-full ring-2 ring-primary/20 ring-offset-1 ring-offset-base-100 group-hover:ring-primary/40 transition-all duration-300">
                          <img
                            src={friend.profilePic}
                            alt={friend.fullName}
                            className="rounded-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base text-base-content group-hover:text-primary transition-colors truncate">
                          {friend.fullName}
                        </h3>
                        {friend.location && (
                          <div className="flex items-center text-xs text-base-content/70 mt-0.5">
                            <MapPinIcon className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{friend.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      <div className="badge badge-primary badge-sm gap-1 px-2 py-1">
                        <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                        {getLanguageFlag(friend.nativeLanguage)}
                        <span className="hidden sm:inline">Native: </span>
                        {capitialize(friend.nativeLanguage)}
                      </div>
                      <div className="badge badge-outline badge-sm gap-1 px-2 py-1">
                        <div className="w-1.5 h-1.5 bg-warning rounded-full"></div>
                        {getLanguageFlag(friend.learningLanguage)}
                        <span className="hidden sm:inline">Learning: </span>
                        {capitialize(friend.learningLanguage)}
                      </div>
                    </div>

                    {friend.bio && (
                      <div className="bg-base-300/30 rounded-md p-2 border-l-2 border-primary/50">
                        <p className="text-xs text-base-content/80 italic line-clamp-2">{friend.bio}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Link
                        to={`/chat/${friend._id}`}
                        className="btn btn-primary btn-sm flex-1 gap-2 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
                      >
                        <MessageCircleIcon className="h-4 w-4" />
                        Message
                      </Link>
                      <button
                        className="btn btn-secondary btn-sm gap-2 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
                        onClick={() => handleVoiceCall(friend)}
                        title={`Call ${friend.fullName}`}
                      >
                        <PhoneIcon className="h-4 w-4" />
                        <span className="hidden sm:inline">Call</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recommended Users Section */}
        <section className="space-y-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-secondary to-accent rounded-full shadow-lg">
                <GlobeIcon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                Meet New Learners
              </h2>
            </div>
            <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
              Discover perfect language exchange partners based on your profile and interests
            </p>
          </div>

          {loadingUsers ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="loading loading-spinner loading-lg text-secondary mb-4"></div>
              <p className="text-base-content/60 animate-pulse">Finding perfect matches...</p>
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="card bg-gradient-to-r from-base-200 to-base-300 shadow-xl border border-base-300 p-8 text-center max-w-md mx-auto">
              <div className="p-4 bg-base-300/50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <SparklesIcon className="h-8 w-8 text-base-content/50" />
              </div>
              <h3 className="font-bold text-xl mb-2">No recommendations available</h3>
              <p className="text-base-content/70">
                Check back later for new language partners!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendedUsers.map((user, index) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                return (
                  <div
                    key={user._id}
                    className="card bg-gradient-to-br from-base-100 to-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group border border-base-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="card-body p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-12 h-12 rounded-full ring-2 ring-secondary/20 ring-offset-1 ring-offset-base-100 group-hover:ring-secondary/40 transition-all duration-300">
                            <img
                              src={user.profilePic}
                              alt={user.fullName}
                              className="rounded-full object-cover"
                            />
                          </div>
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold text-base text-base-content group-hover:text-secondary transition-colors">
                            {user.fullName}
                          </h3>
                          {user.location && (
                            <div className="flex items-center text-xs text-base-content/70 mt-0.5">
                              <MapPinIcon className="h-3 w-3 mr-1" />
                              {user.location}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        <div className="badge badge-secondary badge-sm gap-1 px-2 py-1">
                          <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                          {getLanguageFlag(user.nativeLanguage)}
                          Native: {capitialize(user.nativeLanguage)}
                        </div>
                        <div className="badge badge-outline badge-sm gap-1 px-2 py-1">
                          <div className="w-1.5 h-1.5 bg-warning rounded-full"></div>
                          {getLanguageFlag(user.learningLanguage)}
                          Learning: {capitialize(user.learningLanguage)}
                        </div>
                      </div>

                      {user.bio && (
                        <div className="bg-base-300/30 rounded-md p-2 border-l-2 border-secondary/50">
                          <p className="text-xs text-base-content/80 italic line-clamp-2">{user.bio}</p>
                        </div>
                      )}

                      <button
                        className={`btn btn-sm w-full gap-2 shadow-md transition-all duration-300 ${
                          hasRequestBeenSent 
                            ? "btn-success btn-disabled" 
                            : "btn-primary hover:shadow-lg hover:scale-105"
                        }`}
                        onClick={() => sendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent || isPending}
                      >
                        {isPending ? (
                          <>
                            <span className="loading loading-spinner loading-xs"></span>
                            Sending...
                          </>
                        ) : hasRequestBeenSent ? (
                          <>
                            <CheckCircleIcon className="h-4 w-4" />
                            Request Sent
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="h-4 w-4" />
                            Send Friend Request
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;

