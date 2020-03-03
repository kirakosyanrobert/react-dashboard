import React from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap';

import { useNavigation, useEffectOnce } from '../../hooks';
import { fetchDataAction } from '../../store/test/testAction';
import { StorageKey } from '../../consts';
import { Button, ButtonVariants, ButtonSizes } from '../../components/ui/Button';

function HomePage({users, fetchData}) {
  const {navigate, routes} = useNavigation();

  useEffectOnce(() => {
    fetchData();
  });

  return (
      <div>
          <h1>Home Page</h1>
          <Button
            title="Go To Login"
            outlined
            variant={ButtonVariants.Success}
            onClick={() => navigate(routes.login)}
          />
          <Button
            title="Log Out"
            outlined
            size={ButtonSizes.Small}
            onClick={() => localStorage.removeItem(StorageKey.Token)}
          />
          <ListGroup className="w-25">
            {users.map((user, index) => (
              <ListGroup.Item key={`user-${index}`}>
                {user.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
      </div>
  )
}


const mapStateToProps = state => ({
    users: state.users.users
});

const mapDispatchToProps = dispatch => ({
    fetchData: () => dispatch(fetchDataAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);