import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => {
  console.log(props);
  return (
    <div>
      <h1>Info</h1>
      <p>This info is: {props.info}</p>
    </div>
  );
};

const withAdminWarning = (WrapperComponent) => {
  return (props) => {
    return (
      <div>
        {props.isAdmin && <p>This is a private info. Please don't share</p>}
        <WrapperComponent {...props} />
      </div>
    );
  };
};

const requireAuthentication = (WrapperComponent) => {
  return (props) => {
    return (
      <div>
        {props.isAuthenticated ? (
          <WrapperComponent {...props} />
        ) : (
          <p>Please login to see info</p>
        )}

        {/* <WrapperComponent {...props} /> */}
      </div>
    );
  };
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

ReactDOM.render(
  <AuthInfo isAuthenticated={true} info="there are the details" />,
  document.getElementById('app')
);
// ReactDOM.render(
//   <AdminInfo isAdmin={true} info="there are the details" />,
//   document.getElementById('app')
// );
