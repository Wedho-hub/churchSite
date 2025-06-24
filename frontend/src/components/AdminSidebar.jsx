/**
 * AdminSidebar component provides navigation links for admin panel.
 * Uses react-router-dom Link for client-side navigation.
 * The CSS import is removed if AdminSidebar.css does not exist.
 */
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="bg-dark text-white p-3 h-100">
      <h4>Admin Panel</h4>
      <ul className="nav flex-column mt-3">
        <li className="nav-item">
          <Link className="nav-link text-white" to="/admin/blogs">Manage Blogs</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/contact">Contact Messages</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/weather">Weather Widget</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
