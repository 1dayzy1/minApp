import { Link } from "react-router-dom"
import "./header.css"
import Register from "../register/Register"
import { useEffect, useState } from "react"
import Auth from "../auth/Auth";

function Header() {


    const [registerModal, setRegisterModal] = useState(false);
    const [authModal, setAuthModal] = useState(false);
    const [isAuth, setIsAuth] = useState(!!localStorage.getItem("userId"));
    const [clsAuth, setClsAuth] = useState("header-auth");
    const [user, setUser] = useState("")


    useEffect(() => {

        const checkAuth = () => {
            const id = localStorage.getItem("userId");

            if (id) {
                setIsAuth(true)
                setClsAuth("header-auth auth");
                setUser(JSON.parse(localStorage.getItem("user")))
            } else {
                setClsAuth("header-auth")
                setUser({});
                setIsAuth(false)
            }
        }

        checkAuth();


    }, [isAuth])

    const closeModal = () => {
        setRegisterModal(false)
    }
    const closeModalAuth = () => {
        setAuthModal(false)
    }
    return (
        <header className="site-header">
            <div className="header-container">


                <div className="header-logo">
                    <a href="#"><i className="fa-solid fa-share-nodes"></i><span>MinApp</span></a>
                </div>


                <nav className="header-nav">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <span className="nav-link active">
                                <i className="fa-solid fa-house"></i>
                                <Link to={'/'} className="link">Лента</Link>
                            </span>

                        </li>
                        <li className="nav-item">

                            <span className="nav-link">
                                <i className="fa-solid fa-bookmark"></i>
                                <Link to={'/'} className="link">Избранное</Link>
                            </span>

                        </li>
                        <li className="nav-item">

                            <span className="nav-link">
                                <i className="fa-solid fa-user"></i>
                                <Link to={'/'} className="link">Личный кабинет</Link>
                            </span>


                        </li>
                    </ul>
                </nav>


                <div className={clsAuth}>


                    <div className="login-block">

                        <span className="btn btn-login" onClick={() => {
                            setAuthModal(true);
                            setRegisterModal(false)
                        }}>Войти</span>
                        <span className="btn btn-register" onClick={() => {
                            setRegisterModal(true)
                            setAuthModal(false);

                        }}>Регистрация</span>

                    </div>


                    <div className="auth">
                        <div className="auth__user">
                            <img
                                className="auth__avatar"
                                src={user.url}
                                alt="Пользователь"
                            />

                            <div className="auth__info">
                                <span className="auth__name">{user.login}</span>
                                <button
                                    className="auth__logout"
                                    onClick={() => {
                                        localStorage.removeItem("userId");
                                        localStorage.removeItem("user");

                                        setIsAuth(false);
                                        setClsAuth("header-auth");
                                        setUser({});
                                    }}
                                >
                                    Выйти
                                </button>
                            </div>
                        </div>
                    </div>


                </div>

            </div>

            <Register cls={`${registerModal ? "auth-wrapper active" : "auth-wrapper"}`} close={closeModal} />
            <Auth cls={`${authModal ? "login active" : "login"}`} close={closeModalAuth} setAuth={setIsAuth}  />
        </header>
    )
}

export default Header
