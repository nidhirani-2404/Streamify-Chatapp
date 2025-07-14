// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { acceptFriendRequest, getFriendRequests } from "../lib/api";
// import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from "lucide-react";
// import NoNotificationsFound from "../components/NoNotificationsFound";

// const NotificationsPage = () => {
//   const queryClient = useQueryClient();

//   const { data: friendRequests, isLoading } = useQuery({
//     queryKey: ["friendRequests"],
//     queryFn: getFriendRequests,
//   });

//   const { mutate: acceptRequestMutation, isPending } = useMutation({
//     mutationFn: acceptFriendRequest,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
//       queryClient.invalidateQueries({ queryKey: ["friends"] });
//     },
//   });

//   const incomingRequests = friendRequests?.incomingReqs || [];
//   const acceptedRequests = friendRequests?.acceptedReqs || [];

//   return (
//     <div className="p-4 sm:p-6 lg:p-8">
//       <div className="container mx-auto max-w-4xl space-y-8">
//         <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">Notifications</h1>

//         {isLoading ? (
//           <div className="flex justify-center py-12">
//             <span className="loading loading-spinner loading-lg"></span>
//           </div>
//         ) : (
//           <>
//             {incomingRequests.length > 0 && (
//               <section className="space-y-4">
//                 <h2 className="text-xl font-semibold flex items-center gap-2">
//                   <UserCheckIcon className="h-5 w-5 text-primary" />
//                   Friend Requests
//                   <span className="badge badge-primary ml-2">{incomingRequests.length}</span>
//                 </h2>

//                 <div className="space-y-3">
//                   {incomingRequests.map((request) => (
//                     <div
//                       key={request._id}
//                       className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
//                     >
//                       <div className="card-body p-4">
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center gap-3">
//                             <div className="avatar w-14 h-14 rounded-full bg-base-300">
//                               <img src={request.sender.profilePic} alt={request.sender.fullName} />
//                             </div>
//                             <div>
//                               <h3 className="font-semibold">{request.sender.fullName}</h3>
//                               <div className="flex flex-wrap gap-1.5 mt-1">
//                                 <span className="badge badge-secondary badge-sm">
//                                   Native: {request.sender.nativeLanguage}
//                                 </span>
//                                 <span className="badge badge-outline badge-sm">
//                                   Learning: {request.sender.learningLanguage}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>

//                           <button
//                             className="btn btn-primary btn-sm"
//                             onClick={() => acceptRequestMutation(request._id)}
//                             disabled={isPending}
//                           >
//                             Accept
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             )}

//             {/* ACCEPTED REQS NOTIFICATONS */}
//             {acceptedRequests.length > 0 && (
//               <section className="space-y-4">
//                 <h2 className="text-xl font-semibold flex items-center gap-2">
//                   <BellIcon className="h-5 w-5 text-success" />
//                   New Connections
//                 </h2>

//                 <div className="space-y-3">
//                   {acceptedRequests.map((notification) => (
//                     <div key={notification._id} className="card bg-base-200 shadow-sm">
//                       <div className="card-body p-4">
//                         <div className="flex items-start gap-3">
//                           <div className="avatar mt-1 size-10 rounded-full">
//                             <img
//                               src={notification.recipient.profilePic}
//                               alt={notification.recipient.fullName}
//                             />
//                           </div>
//                           <div className="flex-1">
//                             <h3 className="font-semibold">{notification.recipient.fullName}</h3>
//                             <p className="text-sm my-1">
//                               {notification.recipient.fullName} accepted your friend request
//                             </p>
//                             <p className="text-xs flex items-center opacity-70">
//                               <ClockIcon className="h-3 w-3 mr-1" />
//                               Recently
//                             </p>
//                           </div>
//                           <div className="badge badge-success">
//                             <MessageSquareIcon className="h-3 w-3 mr-1" />
//                             New Friend
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </section>
//             )}

//             {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
//               <NoNotificationsFound />
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };
// export default NotificationsPage;
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon, SparklesIcon, HeartIcon } from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200/50 to-base-300/30 p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-5xl space-y-8">
        {/* Header with gradient and glass effect */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg">
              <BellIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Notifications
            </h1>
          </div>
          <p className="text-base-content/70 text-lg">Stay connected with your language learning community</p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
            <p className="text-base-content/60 animate-pulse">Loading your notifications...</p>
          </div>
        ) : (
          <>
            {/* Friend Requests Section */}
            {incomingRequests.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg">
                      <UserCheckIcon className="h-6 w-6 text-primary" />
                    </div>
                    Friend Requests
                  </h2>
                  <div className="badge badge-primary badge-lg gap-2 px-4 py-3">
                    <SparklesIcon className="h-4 w-4" />
                    {incomingRequests.length} new
                  </div>
                </div>

                <div className="grid gap-4">
                  {incomingRequests.map((request, index) => (
                    <div
                      key={request._id}
                      className="card bg-gradient-to-r from-base-100 to-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group border border-base-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="card-body p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="avatar">
                              <div className="w-16 h-16 rounded-full ring-4 ring-primary/20 ring-offset-2 ring-offset-base-100 group-hover:ring-primary/40 transition-all duration-300">
                                <img 
                                  src={request.sender.profilePic} 
                                  alt={request.sender.fullName}
                                  className="object-cover"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <h3 className="font-bold text-lg text-base-content group-hover:text-primary transition-colors">
                                {request.sender.fullName}
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                <div className="badge badge-secondary badge-md gap-1 px-3 py-2">
                                  <div className="w-2 h-2 bg-success rounded-full"></div>
                                  Native: {request.sender.nativeLanguage}
                                </div>
                                <div className="badge badge-outline badge-md gap-1 px-3 py-2">
                                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                                  Learning: {request.sender.learningLanguage}
                                </div>
                              </div>
                            </div>
                          </div>

                          <button
                            className="btn btn-primary btn-lg gap-2 px-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            onClick={() => acceptRequestMutation(request._id)}
                            disabled={isPending}
                          >
                            {isPending ? (
                              <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                              <>
                                <HeartIcon className="h-5 w-5" />
                                Accept
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Accepted Requests Section */}
            {acceptedRequests.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-success/20 to-success/10 rounded-lg">
                    <BellIcon className="h-6 w-6 text-success" />
                  </div>
                  <h2 className="text-2xl font-bold">New Connections</h2>
                </div>

                <div className="grid gap-4">
                  {acceptedRequests.map((notification, index) => (
                    <div 
                      key={notification._id} 
                      className="card bg-gradient-to-r from-success/5 to-success/10 shadow-lg hover:shadow-xl transition-all duration-300 border border-success/20"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="card-body p-6">
                        <div className="flex items-start gap-4">
                          <div className="avatar">
                            <div className="w-14 h-14 rounded-full ring-2 ring-success/30 ring-offset-2 ring-offset-base-100">
                              <img
                                src={notification.recipient.profilePic}
                                alt={notification.recipient.fullName}
                                className="object-cover"
                              />
                            </div>
                          </div>
                          <div className="flex-1 space-y-2">
                            <h3 className="font-bold text-lg text-base-content">
                              {notification.recipient.fullName}
                            </h3>
                            <p className="text-base-content/80 text-base">
                              🎉 {notification.recipient.fullName} accepted your friend request
                            </p>
                            <p className="text-sm text-base-content/60 flex items-center gap-1">
                              <ClockIcon className="h-4 w-4" />
                              Recently
                            </p>
                          </div>
                          <div className="badge badge-success badge-lg gap-2 px-4 py-3">
                            <MessageSquareIcon className="h-4 w-4" />
                            New Friend
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Empty State */}
            {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
              <div className="flex justify-center py-12">
                <NoNotificationsFound />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;