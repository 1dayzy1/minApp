import React, { useState } from 'react'
import "./Reg.css"
import axios from 'axios'

function Register({cls, close}) {
    console.log(cls)

    const[login, setLogin] = useState('')
    const[pass, setPass] = useState('')
    const[repeatPass, setRepeatPass] = useState('')
    const[file, setFile] = useState(null);

    const register = async() =>{
        // console.log(login, pass, repeatPass, file)
        if(!login && !pass && !repeatPass && !file)return

        const res_users = await axios.get("https://194e4aa72d1c5629.mokky.dev/users");

        console.log(res_users.data)

        const exists = res_users.data.find(el => el.login === login);

        if(exists){
            alert("Такой пользователь уже существует")

        }


        if(pass !== repeatPass){
            alert("Пароли не совпадают")
        }

        const formDate = new FormData();
        formDate.append("file", file);

        const res_file = await axios.post("https://194e4aa72d1c5629.mokky.dev/uploads", formDate);

        console.log(res_file.data.url)
        const res_user = await axios.post("https://194e4aa72d1c5629.mokky.dev/users",{
            login:login,
            pass:pass,
            avatar_url:res_file.data.url
        })

    }


  return (
     <div className={cls}>

        <div className="shadow" onClick={close}></div>

        <div className="auth-card">
            
            <div className="auth-header">
                <h2>Создать аккаунт</h2>
                <p>Присоединяйтесь к нашей социальной сети</p>
            </div>

           
            <div className="auth-form">
                
              
                <div className="form-group">
                    <label htmlFor="username">Логин (Имя пользователя)</label>
                    <div className="input-wrapper">
                        <i className="fa-solid fa-user input-icon"></i>
                        <input type="text" id="username" name="username" onChange={(e) => setLogin(e.target.value)} placeholder="Придумайте логин" required />
                    </div>
                </div>

                
                <div className="form-group">
                    <label htmlFor="password">Пароль</label>
                    <div className="input-wrapper">
                        <i className="fa-solid fa-lock input-icon"></i>
                        <input type="password" id="password" name="password" onChange={(e) => setPass(e.target.value)} placeholder="Введите пароль" required />
                    </div>
                </div>

                
                <div className="form-group">
                    <label htmlFor="confirmPassword">Повторите пароль</label>
                    <div className="input-wrapper">
                        <i className="fa-solid fa-shield-halved input-icon"></i>
                        <input type="password" id="confirmPassword" name="confirmPassword" onChange={(e) => setRepeatPass(e.target.value)} placeholder="Повторите пароль" required/>
                    </div>
                </div>

                
                <div className="form-group">
                    <label>Аватар профиля</label>
                    <label htmlFor="avatar" className="file-upload-label">
                        <i className="fa-solid fa-cloud-arrow-up file-icon"></i>
                        <span id="file-name-text">Выберите изображение</span>
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} id="avatar" name="avatar" accept="image/*"/>
                    </label>
                </div>

               
                <button  onClick={register} className="btn-submit">Зарегистрироваться</button>

            </div>

            
            <div className="auth-footer">
                Уже есть аккаунт? 
            </div>

        </div>
    </div>
  )
}

export default Register
