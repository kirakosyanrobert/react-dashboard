import { useHistory } from 'react-router-dom';

const routes = {
    home: '/home',
    login: '/login',
    root: '/'
}

export function useNavigation() {
    const history = useHistory();

    function navigate(route) {
        return history.push(route);
    }

    function replace(route) {
        return history.replace(route);
    }

    function back() {
        return history.goBack();
    }

    return {
        routes,
        history,
        navigate,
        replace,
        back
    }
}