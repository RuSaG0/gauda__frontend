import React from 'react';
import AdminPanel from '../components/AdminPanel';
import User from '../components/User';
import Inner from '../components/styled/Inner';

const AdminPage = () => (
  <User>
    {({ data: { me } }) => (
      <Inner>
        {(!me || !me.permissions.includes('ADMIN')) && (
          <h3>
            401 // You have to have admin permissions to access this data.
          </h3>
        )}
        {me && me.permissions.includes('ADMIN') && <AdminPanel />}
      </Inner>
    )}
  </User>
);

export default AdminPage;
