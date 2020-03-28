import React from 'react';

import { Button, ButtonVariants } from '../../components/ui/Button';
import { StorageKey } from '../../consts';
import { useNavigation, useTranslation } from '../../hooks';


function SettingsPage() {
  const { navigate, routes } = useNavigation();
  const translate = useTranslation();
  
  function handleLogOut () {
    localStorage.removeItem(StorageKey.Token);
    navigate(routes.login);
  }

  return (
    <div>
        <h1 className="mt-4">Settings Page</h1>
        <Button
          title={translate(({buttons}) => buttons.logOut)}
          variant={ButtonVariants.Danger}
          onClick={handleLogOut}
        />
    </div>
  )
}


export default SettingsPage;