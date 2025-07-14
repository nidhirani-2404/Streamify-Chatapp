import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";
import { MessageCircleIcon, VideoIcon } from "lucide-react";

const FriendCard = ({ friend }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex items-center space-x-4">
        {/* USER INFO */}
        <div className="flex items-center space-x-3 flex-1">
          <img
            src={friend.profilePic || "/default-avatar.png"}
            alt={friend.fullName}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
          />
          
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
              {friend.fullName}
            </h3>
            
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                {getLanguageFlag(friend.nativeLanguage)}
                <span>Native: {friend.nativeLanguage}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                {getLanguageFlag(friend.learningLanguage)}
                <span>Learning: {friend.learningLanguage}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex space-x-2">
          {/* Message Button */}
          <Link
            to={`/chat/${friend._id}`}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
          >
            <MessageCircleIcon size={16} />
            <span>Chat</span>
          </Link>
          
          {/* Video Call Button */}
          <Link
            to={`/call/${[friend._id, friend._id].sort().join("-")}`}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200"
          >
            <VideoIcon size={16} />
            <span>Call</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;
  
  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];
  
  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/16x12/${countryCode}.png`}
        alt={`${language} flag`}
        className="w-4 h-3 rounded-sm"
      />
    );
  }
  return null;
}