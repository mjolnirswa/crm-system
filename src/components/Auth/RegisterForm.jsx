import { useState } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { emailValidation, passwordValidation, passwordsEquals } from "../../utils/FormValidation";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const RegisterForm = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [repeatPasswordValue, setRepeatPasswordValue] = useState('')
    const [isEmailValid, setEmailValid] = useState(true);
    const [isPasswordValid, setPasswordValid] = useState(true);
    const [isPasswordsAreEqual, setPasswordsEqual] = useState(true);

    const handleEmailChange = (value) => {
        setEmailValue(value);
    }

    const handlePasswordChange = (value) => {
        setPasswordValue(value);
    }

    const handleRepeatPasswordChange = (value) => {
        setRepeatPasswordValue(value)
    }

    const handleFormValidate = () => {
        setEmailValid(emailValidation(emailValue))
        setPasswordValid(passwordValidation(passwordValue))
        setPasswordsEqual(passwordsEquals(passwordValue, repeatPasswordValue))
    }

    const handleRegister = () => {
        const auth = getAuth();
        handleFormValidate()

        if (isEmailValid === false || isPasswordValid === false) {
            return
        }

        createUserWithEmailAndPassword (auth, emailValue, passwordValue)
        .then(({user}) => {
            dispatch(setUser({
                email: user.email,
                id: user.uid,
                token: user.accessToken
            }))
            navigate("/clients")
        })
        .catch((error) => {
            console.log(error)
        });
    }

    return (
        <div className="w-full">
            <div className="pt-5 space-y-6">
                <div>
                    <h1 className="mx-auto text-center text-xl items-center justify-center font-medium">
                        Регистрация
                    </h1>
                </div>

                <Input
                label='Почта'
                placeholder='example@gmail.com'
                type='text'
                onChange={handleEmailChange}
                >
                </Input>

                <div className={isEmailValid === true ? 'hidden' : 'block'}>
                    <p className="text-red-500 text-sm">Почта введена некорректно</p>
                </div>

                <Input
                label='Пароль'
                placeholder='*********'
                type='password'
                onChange={handlePasswordChange}
                >
                </Input>

                <div className={isPasswordValid === true ? 'hidden' : 'block'}>
                    <p className="text-red-500 text-sm">Введен неправльный пароль</p>
                </div>

                <Input
                label='Повторите пароль'
                placeholder='*********'
                type='password'
                onChange={handleRepeatPasswordChange}
                >
                </Input>

                <div className={isPasswordsAreEqual === true ? 'hidden' : 'block'}>
                    <p className="text-red-500 text-sm">Пароли не совпадают</p>
                </div>

                <Button 
                textSize='text-md'
                onClick={handleRegister}>
                    Зарегистрироваться
                </Button>

                <div className="text-center">
                    или
                </div>

                <Button 
                textSize='text-md'
                onClick={props.toggleForm}  
                >
                        Войти
                </Button>
            </div>
        </div>
    )
}

export default RegisterForm;