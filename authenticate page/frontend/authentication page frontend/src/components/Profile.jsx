import { useAuth } from "../authcontext";

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>Please login first.</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default Profile;
