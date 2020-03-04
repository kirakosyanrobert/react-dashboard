import React from 'react';

import { Button, ButtonVariants, ButtonSizes } from '../../components/ui/Button';
import { useNavigation } from '../../hooks';
import { StorageKey } from '../../consts';

export function LoginPage() {
  const {navigate, routes} = useNavigation();

    return (
        <div>
          <Button
            title="Go To Home"
            variant={ButtonVariants.Warning}
            size={ButtonSizes.Medium}
            onClick={() => navigate(routes.home)}
          />
          <Button
            title="Login"
            variant={ButtonVariants.Primary}
            onClick={() => localStorage.setItem(StorageKey.Token, 'Auth-Token')}
          />
        </div>
    )
}