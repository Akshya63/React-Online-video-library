import { Link } from "react-router-dom";


export function UserError() {
    return (
        <div>
            <h2>Invaild Credentials</h2>
            <Link to='/user-login'>Try Again</Link>
        </div>
    )
}