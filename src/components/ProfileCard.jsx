export default function ProfileCard() {
  const staff = JSON.parse(localStorage.getItem("staffProfile"));

  return (
    <div className="profile-card">
      <h3>{staff.name}</h3>
      <p>{staff.email}</p>
      <p>{staff.department}</p>
    </div>
  );
}
