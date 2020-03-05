import React from 'react';

import { Button, ButtonVariants } from '../../components/ui/Button';
import { StorageKey } from '../../consts';
import { useNavigation } from '../../hooks';


function SettingsPage() {
  const { navigate, routes } = useNavigation();

  function handleLogOut () {
    localStorage.removeItem(StorageKey.Token);
    navigate(routes.login);
  }

  return (
    <div>
        <h1 className="mt-4">Settings Page</h1>
        <Button
          title="Log out"
          variant={ButtonVariants.Danger}
          onClick={handleLogOut}
        />
    </div>
  )
}


export default SettingsPage;