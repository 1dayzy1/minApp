import React, { useState } from 'react'
import './Auth.css'
import axios from 'axios';
function Auth({cls, close, setAuth}) {

    const [login,  setLogin] = useState('');
    const [pass,  setPass] = useState('');


    const auth = async() =>{
        try {


            if(!login && !pass)return

            const res_user = await axios.get("https://194e4aa72d1c5629.mokky.dev/users");
            const exists = res_user.data.find(el => el.login === login && el.pass === pass);

            if(!exists){
                alert("Неправильный пароль или логин")
            }

            localStorage.setItem("userId", exists.id);
            close();
            setLogin("")
            setPass("");
            setAuth(true);
            localStorage.setItem("user", JSON.stringify({
                id:exists.id,
                login:exists.login,
                url:exists.avatar_url
            }))
            

        } catch (error) {
            console.log(error)
        }
    }
    

  return (
    <div className={cls}>
        <div className="shadow" onClick={close}></div>
      <div className="login__container">
        <h2 className="login__title">Авторизация</h2>

        <input
          className="login__input"
          type="text"
          placeholder="Логин"
          autoComplete="username"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />

        <input
          className="login__input"
          type="password"
          placeholder="Пароль"
          autoComplete="current-password"
          value={pass}

          onChange={(e) => setPass(e.target.value)}
        />

        <button className="login__button" type="button" onClick={auth}>
          Войти
        </button>
      </div>
    </div>
  )
}

export default Auth
