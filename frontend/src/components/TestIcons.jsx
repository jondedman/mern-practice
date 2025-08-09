
import {
  FaFacebook,
  FaThumbsUp,
  FaCommentAlt,
  FaShare,
  FaFacebookMessenger,
  FaBell,
  FaUserFriends,
  FaUserPlus,
  FaUserMinus,
  FaSearch,
  FaPhotoVideo,
  FaCog,
  FaSignOutAlt,
  FaEllipsisH,
  FaUsers,
  FaHome
} from "react-icons/fa";

export default function TestIcons() {
  const icons = [
    { label: "Facebook Logo", icon: <FaFacebook className="text-blue-600" /> },
    { label: "Like", icon: <FaThumbsUp className="text-blue-500" /> },
    { label: "Comment", icon: <FaCommentAlt className="text-gray-600" /> },
    { label: "Share", icon: <FaShare className="text-gray-600" /> },
    { label: "Messenger", icon: <FaFacebookMessenger className="text-blue-500" /> },
    { label: "Notifications", icon: <FaBell className="text-yellow-500" /> },
    { label: "Friends", icon: <FaUserFriends className="text-gray-600" /> },
    { label: "Add Friend", icon: <FaUserPlus className="text-green-500" /> },
    { label: "Remove Friend", icon: <FaUserMinus className="text-red-500" /> },
    { label: "Search", icon: <FaSearch className="text-gray-600" /> },
    { label: "Photo/Video", icon: <FaPhotoVideo className="text-purple-500" /> },
    { label: "Settings", icon: <FaCog className="text-gray-600" /> },
    { label: "Logout", icon: <FaSignOutAlt className="text-gray-600" /> },
    { label: "More Options", icon: <FaEllipsisH className="text-gray-600" /> },
    { label: "Groups", icon: <FaUsers className="text-gray-600" /> },
    { label: "Home", icon: <FaHome className="text-gray-600" /> }
  ];

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Facebook Clone Icon Preview</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {icons.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center space-y-2 border p-4 rounded shadow"
          >
            <div className="text-3xl">{item.icon}</div>
            <span className="text-sm text-center">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
