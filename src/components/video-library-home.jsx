import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react"
import { Link } from "react-router-dom";

export function RegisterLink() {
    return (
        <Link to='/register-user' className="btn btn-warning">Register</Link>
    )
}

export function PasswordComponent() {
    return (
        <div className="input-group">
            <input type="password" placeholder="Your Password" className="form-control" />
            <button className="btn btn-warning">Continue</button>
        </div>
    )
}

export function VideoLibraryHome() {

    const [view, setView] = useState('');

    const formik = useFormik({
        initialValues: { UserId: '', UserName: '', Password: '', Email: '', Mobile: '' },
        onSubmit: (user) => {
            axios.get(`http://127.0.0.1:3030/get-user/${user.Email}`)
                .then(response => {
                    var data = response.data.find(client => client.Email === user.Email);
                    if (data) {
                        setView(<PasswordComponent />);
                    } else {
                        setView(<RegisterLink />)
                    }

                })

        }
    })
    return (
        <div style={{ height: '100vh' }} className="d-flex justify-content-center align-items-center">
            <main className='text-center'>
                <h1>Watch Technology Videos</h1>
                <p>Any Where any time</p>
                <div>
                    <form className="input-group" onSubmit={formik.handleSubmit}>
                        <input type="email" onChange={formik.handleChange} name="Email" className="form-control" placeholder="Your email address" />
                        <button type="submit" className="btn btn-danger">Get Started <span className="bi bi-chevron-right"></span></button>

                    </form>
                    <div className="my-3">
                        {view}
                    </div>
                </div>

            </main>
        </div>
    )
}