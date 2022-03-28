import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";



const LoginPage = ({ setToken, auth, setUserName }) => {
    const navigate = useNavigate();
    const response = ((res) => {
        console.log(res);
        if (res.accessToken) {
            setToken(res.accessToken)
            navigate('/details');
            auth(false);
            setUserName(res.profileObj.name)
        }
    });

    return (
        <div className="conatiner">
            <div className="loginBox">
                <div className="loginText">Login as a google user</div >
                <GoogleLogin
                    clientId='343939420622-8q9692l6256mohbdfqp04nk1r4g2n8cd.apps.googleusercontent.com'
                    buttonText="login with google"
                    onSuccess={response}
                    onFailure={response}
                    cookiePolicy={'single_host_origin'}
                    scope={"https://www.googleapis.com/auth/youtube.readonly"}
                />
                <iframe>
                    <video src="https://www.youtube.com/watch?v=TBieFYBvhDo" />
                </iframe>
            </div>
        </div>
    )
}
export default LoginPage;