import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
  <main className="flex items-center justify-center  bg-black">
    <UserProfile path="/user-profile" />
  </main>
);

export default UserProfilePage;
