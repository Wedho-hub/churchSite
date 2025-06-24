import AdminSidebar from "../components/AdminSidebar";
import "../assets/styles.css"; // Make sure we have global styles

const AdminDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row" style={{ minHeight: "100vh" }}>
        <div className="col-md-3 col-lg-2 bg-dark text-white p-0">
          <AdminSidebar />
        </div>
        <div className="col-md-9 col-lg-10 p-4">
          <h2>Welcome, Admin</h2>
          <p>Use the sidebar to manage blogs, messages, and more.</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
