import { useHistory } from 'react-router-dom';

const routes = {
    // home: '/home',
    moderators: '/moderators',
    organizations: '/organizations',
    organizationDetails: (id) => `/organizations/${id}`,
    createOrganization: '/create-organization',
    settings: '/settings',
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