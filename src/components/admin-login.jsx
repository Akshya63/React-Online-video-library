import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function AdminLogin() {

    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['admin-id']);

    const formik = useFormik({
        initialValues: {
            UserId: '',
            Password: ''
        },
        onSubmit: (values) => {
            axios.get('http://127.0.0.1:3030/get-admin')
                .then(response => {
                    const adminData = response.data[0];
                    if (adminData && values.UserId === adminData.UserId && values.Password === adminData.Password) {
                        setCookie('admin-id', values.UserId);
                        navigate('/admin-dashboard', { replace: true });
                    } else {
                        navigate('/admin-error', { replace: true });
                    }
                })
                .catch(error => {
                    console.error('Error fetching admin data:', error);
                    navigate('/admin-error', { replace: true });
                });
        }
    });

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }} >
            <form className="w-25" onSubmit={formik.handleSubmit}>
                <div className="text-center bi bi-person-circle"> Admin Login</div>
                <dl>
                    <dt>Admin Id</dt>
                    <dd><input type="text" name="UserId" onChange={formik.handleChange} value={formik.values.UserId} className="form-control" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" onChange={formik.handleChange} value={formik.values.Password} className="form-control" /></dd>
                </dl>
                <button type="submit" className="btn btn-danger w-100">Login</button>
            </form>
        </div>
    );
}
