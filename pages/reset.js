import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

const ResetPassword = props => (
  <div>
    <p>Reset password</p>
    <Reset resetToken={props.query.resetToken} />
  </div>
);

export default ResetPassword;
