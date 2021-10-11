import { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FacebookLogin from 'react-facebook-login';
import { AnimatePresence } from 'framer-motion';
import { Button, TextField, Divider } from '@material-ui/core';
import { Facebook, VpnKey, Send } from '@material-ui/icons';

import { UserMsg } from './../cmps/UserMsg';

import { onLogin, onSignup } from '../store/actions/user.actions.js';
import { loadBoards } from '../store/actions/board.actions.js';
import { showErrorMsg } from '../services/event-bus.service.js';

class _LoginPage extends Component {
  state = {
    isSignup: false,
  };

  componentDidMount() {
    if (this.props.user) this.props.history.push("/");
    if (!this.props.boards.length) this.onLoadBoards();
  }

  onLoadBoards = async () => {
    this.props.loadBoards();
  };

  toggleSignup = () => {
    this.setState({ isSignup: !this.state.isSignup });
  };

  validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    if (this.state.isSignup && !values.fullname) {
      errors.fullname = "Fullname is required";
    }
    return errors;
  };

  onFormSubmit = async (credentials, { setSubmitting }) => {
    try {
      const user = this.state.isSignup ? await this.props.onSignup(credentials) : await this.props.onLogin(credentials);
      if (!user) {
        this.state.isSignup ? showErrorMsg("User already exists") : showErrorMsg("Wrong credentials");
      } else {
        this.props.history.push(`/board/${this.props.boards[0]?._id}`);
      }
    } catch (err) {
      console.log(err);
      showErrorMsg("Wrong credentials")
    } finally {
      setSubmitting(false);
    }
  };

  responseFacebook = async (res) => {
    const credentials = {
      fullname: res.name,
      username: res.email,
      imgUrl: res.picture.data.url,
      password: res.userID,
    };
    try {
      const user = await this.props.onSignup(credentials);
      if (user) this.props.history.push(`/board/${this.props.boards[0]?._id}`);
    } catch (err) {
      console.log(err);
      showErrorMsg("Wrong credentials")
    }
  };

  render() {
    const { isSignup } = this.state;
    const initialValues = { fullname: "", username: "", password: "" };
    const TextFieldOutlined = (props) => (
      <TextField {...props} variant={"outlined"} color={"primary"} />
    );

    return (
      <section className="login-page">
        <div className="login-page-container">
          <div className="login-section flex column center-center">
            <h1 className="login-section-title flex center-center">
              {!isSignup ? 'Login' : 'Sign up'}
            </h1>
            <Formik
              initialValues={initialValues}
              validate={this.validate}
              onSubmit={this.onFormSubmit}>
              {({ isSubmitting }) => (
                <Form>
                  {isSignup && (
                    <>
                      <div className="login-field relative">
                        <Field
                          type="text"
                          name="fullname"
                          label="Fullname"
                          as={TextFieldOutlined} />
                        <ErrorMessage name="fullname" component="span" className="login-field-error absolute" />
                      </div>
                    </>
                  )}
                  <div className="login-field relative">
                    <Field
                      type="text"
                      name="username"
                      label="Username or email"
                      as={TextFieldOutlined} />
                    <ErrorMessage name="username" component="span" className="login-field-error absolute" />
                  </div>
                  <div className="login-field relative">
                    <Field
                      type="password"
                      name="password"
                      label="Password"
                      as={TextFieldOutlined} />
                    <ErrorMessage name="password" component="span" className="login-field-error absolute" />
                  </div>

                  <Button
                    variant={"contained"}
                    type="submit"
                    disabled={isSubmitting}
                    endIcon={!isSignup ? <VpnKey /> : <Send />}
                    style={{
                      backgroundColor: '#0095f6',
                      color: '#ffffff',
                      textTransform: 'none'
                    }}>
                    {!isSignup ? "Login" : "Signup"}
                  </Button>

                </Form>
              )}
            </Formik>
          </div>
          <div className="flex column center-center">
            {!isSignup ? (
              <>
                <div className="login-divider-container">
                  <Divider className="login-divider" />
                  <span className="login-divider-text">OR</span>
                </div>
                <div className="facebook-login flex center-center">
                  <Facebook className="facebook-logo" />
                  <FacebookLogin
                    appId="372424837387473"
                    fields="name,email,picture"
                    cssClass="facebook-btn"
                    callback={this.responseFacebook}
                  />
                </div>

                <p className="btn-link">
                  Don't have an account yet?{" "}
                  <span onClick={this.toggleSignup}>Signup</span>
                </p>
              </>
            ) : (
              <p className="btn-link" onClick={this.toggleSignup}>
                <span>Back to login</span>
              </p>
            )}
          </div>
        </div>
        <AnimatePresence
          initial={false}
          exitBeforeEnter={true}
          onExitComplete={() => null}>
          <UserMsg />
        </AnimatePresence>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    boards: state.boardModule.boards,
    user: state.userModule.user,
  };
}
const mapDispatchToProps = {
  onLogin,
  onSignup,
  loadBoards
};

export const LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_LoginPage);
