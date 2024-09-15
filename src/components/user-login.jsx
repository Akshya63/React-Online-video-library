import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function UserLogin() {
    let navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['user-id']);

    const formik = useFormik({
        initialValues: {
            UserId: '',
            Password: '',
        },
        onSubmit: (user) => {
            axios.get('http://127.0.0.1:3030/get-users')
                .then(response => {
                    const data = response.data.find(item => item.UserId === user.UserId);
                    if (data) {
                        if (data.Password === user.Password) {
                            setCookie('user-id', user.UserId);
                            navigate('/user-dashboard');
                        } else {
                            navigate('/user-error');
                        }
                    } else {
                        navigate('/user-error');
                    }
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    navigate('/user-error');
                });
        }
    });

    return (
        <div>
            <h2>User Login</h2>
            <form onSubmit={formik.handleSubmit} className="w-25">
                <dl>
                    <dt>UserId</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="UserId" value={formik.values.UserId} className="form-control" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} name="Password" value={formik.values.Password} className="form-control" /></dd>
                </dl>
                <button type="submit" className="btn btn-warning">Login</button>
            </form>
        </div>
    );
}
