import "./styles/MainPage.css"
import {Button} from "antd";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const userInfo = localStorage.getItem("userInfo")
    const {firstname, lastname} = JSON.parse(userInfo)
    const navigate = useNavigate()
    return (
        <div className="headerWrapper">
            <p>{firstname} {lastname}</p>
            <Button
                onClick={() => {
                    localStorage.removeItem('userInfo')
                    navigate('/login')
                }}
                type="primary"
                danger
            >
                Logout
            </Button>
        </div>
    )
}

export default Header