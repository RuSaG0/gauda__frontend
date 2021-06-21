import UpdateItem from '../components/UpdateItem';
import User from '../components/User';
import Error from '../components/ErrorMessage';
import Container from '../components/styled/Container';

const Update = ({ query }) => (
  <div>
    <User>
      {({ data: { me } }) => {
        if (!me || !me.permissions.includes('ADMIN'))
          return (
            <Container>
              <h2>401 // You have to have admin rights to do that.</h2>
            </Container>
          );
        return <UpdateItem id={query.id} />;
      }}
    </User>
  </div>
);

export default Update;
