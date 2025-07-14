import { axiosInstance } from "./axios";
//import { axiosInstance } from "./axiosInstance";


export const signup = async (signupData) => {
  try {
    const response = await axiosInstance.post("/auth/signup", signupData);
    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const login = async (loginData) => {
  try {
    const response = await axiosInstance.post("/auth/login", loginData);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.error("Error in getAuthUser:", error);
    return null;  // safe fallback
  }
};

export const completeOnboarding = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/onboarding", userData);
    return response.data;
  } catch (error) {
    console.error("Onboarding error:", error);
    throw error;
  }
};




// export async function getUserFriends(req, res) {
//   try {
//     console.log("📡 getMyFriends route hit");

//     if (!req.user) {
//       console.log("❌ req.user is undefined");
//       return res.status(401).json({ message: "Unauthorized - no user info" });
//     }

//     console.log("👤 Logged-in user ID:", req.user.id);
//     console.log("🔍 Fetching user from DB...");

//     const user = await User.findById(req.user.id)
//       .select("friends")
//       .populate("friends", "fullName profilePic nativeLanguage learningLanguage");

//     if (!user) {
//       console.log("❌ User not found in DB");
//       return res.status(404).json({ message: "User not found" });
//     }

//     console.log("✅ Friends fetched:", user.friends.length);
//     console.log("👥 Friends list:", user.friends);

//     res.status(200).json(user.friends);
//   } catch (error) {
//     console.error("❌ Error in getMyFriends:", error.message);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }



export async function getUserFriends() {
  try {
    const response = await axiosInstance.get("/users/friends");
    const data = response.data;

    // Normalize response to always return an array
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.friends)) return data.friends;
    if (data && typeof data === "object") return [data]; // Wrap single friend in array

    return [];
  } catch (error) {
    console.error("Error fetching user friends:", error);
    return [];
  }
}
// export async function getUserFriends() {
//   try {
//     const response = await axiosInstance.get("/users/friends");
//     const data = response.data;

//     // Normalize response to always return an array
//     if (Array.isArray(data)) return data;
//     if (Array.isArray(data?.friends)) return data.friends;
//     if (data && typeof data === "object") return [data]; // Wrap single friend in array

//     return [];
//   } catch (error) {
//     console.error("Error fetching user friends:", error);
//     return [];
//   }
// }



export async function getRecommendedUsers() {
  try {
    const response = await axiosInstance.get("/users");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching recommended users:", error);
    return [];
  }
}

export async function getOutgoingFriendReqs() {
  try {
    const response = await axiosInstance.get("/users/outgoing-friend-requests");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching outgoing friend requests:", error);
    return [];
  }
}

export async function sendFriendRequest(userId) {
  try {
    const response = await axiosInstance.post(`/users/friend-request/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error sending friend request:", error);
    throw error;
  }
}

export async function getFriendRequests() {
  try {
    const response = await axiosInstance.get("/users/friend-requests");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching friend requests:", error);
    return [];
  }
}

export async function acceptFriendRequest(requestId) {
  try {
    const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
    return response.data;
  } catch (error) {
    console.error("Error accepting friend request:", error);
    throw error;
  }
}

export async function getStreamToken() {
  try {
    const response = await axiosInstance.get("/chat/token");
    return response.data;
  } catch (error) {
    console.error("Error getting stream token:", error);
    throw error;
  }
}
