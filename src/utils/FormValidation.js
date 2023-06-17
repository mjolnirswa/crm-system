export const emailValidation = (email) => {
    if(!email) {
        return false
    }

    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export const passwordValidation = (password) => {
    if(!password || password.lenght <= 5) {
        return false
    }

    return true
}

export const passwordsEquals = (password1, password2) => {
    if (password1 !== password2) {
        return false
    }

    return true
}