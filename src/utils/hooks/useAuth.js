import { useSelector } from "react-redux";

export function useAuth() {
    const { email, id, token, name } = useSelector(state => state.user)

    return {
        isAuth: !!email,
        email,
        id,
        token,
        name
    }
}