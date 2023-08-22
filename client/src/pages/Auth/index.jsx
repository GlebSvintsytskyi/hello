import React from 'react';
import { LockOutlined, UserOutlined, ScheduleOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { useLocation, NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Block  from '../../components/Block';
import Button from '../../components/Button';
import fetchUserRegistration from '../../utills/api/user';
import { fetchUserLogin } from '../../utills/api/user';

import './Auth.scss'

const Auth = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const isLogin = location.pathname === '/registration';
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
          firstName: '',
          email: '',
          password: '',
          password_2: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
              .max(10, 'Must be 10 characters or less')
              .min(4, 'Must be 4 min')
              .required('Required'),
              password: Yup.string()
              .max(10, 'Must be 10 characters or less')
              .min(4, 'Must be 4 min')
              .required('Required'),
              email: Yup.string().email('Invalid email address').required('Required'),
              password_2: Yup.string()
              .max(10, 'Must be 10 characters or less')
              .min(4, 'Must be 4 min')
              .required('Required'),
          }),
          onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
          },
        });

        const pushRegistration =  () => {
            return async dispatch => {
                dispatch(fetchUserRegistration(formik.values.firstName, formik.values.email, formik.values.password, formik.values.password_2, navigate));
            }
        }
    
        const pushLogin =  () => {
            return async dispatch => {
                dispatch(fetchUserLogin(formik.values.email, formik.values.password, navigate));
            }
        }

    return (
        <section className='auth'>
            <Block>
            <div className="auth__content">
                <div className="auth__top">
                    <h2>{isLogin ? "Зарегистрируйтесь" : "Войти в аккаунт"}</h2>
                    <p>{isLogin ? "Пожалуйста зарегистрируйте свой аккаунт" : "Пожалуйста войдите в свой аккаунт"}</p>
                </div>
                <form onSubmit={formik.handleSubmit}
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    
                >
                        {isLogin ? 
                            <>
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your Username!' }]}
                                    hasFeedback
                                    validateStatus={ formik.touched.firstName && formik.errors.firstName ? 'error' : formik.values.firstName === '' ? '' : 'success'}
                                >
                                <Input 
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.firstName}
                                    prefix={<UserOutlined className="site-form-item-icon" />} 
                                    size="large" 
                                    placeholder="Username" 
                                />
                                {formik.touched.firstName && formik.errors.firstName ? (
                                    <div className='auth__formik'>{formik.errors.firstName}</div>
                                ) : null}
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                    hasFeedback
                                    validateStatus={formik.touched.email && formik.errors.email ? 'error' : formik.values.email === '' ? '' : 'success'}
                                >
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}  
                                    prefix={<ScheduleOutlined className="site-form-item-icon" />}
                                    size="large" 
                                    placeholder="Email" 
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className='auth__formik'>{formik.errors.email}</div>
                                ) : null}
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your Password!' }]}
                                    hasFeedback
                                    validateStatus={formik.touched.password && formik.errors.password ? 'error' : formik.values.password === '' ? '' : 'success'}
                                >
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        size="large"
                                        placeholder="Password"
                                    />
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className='auth__formik'>{formik.errors.password}</div>
                                    ) : null}
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please repeat your Password!' }]}
                                    hasFeedback
                                    validateStatus={formik.touched.password_2 && formik.errors.password_2 ? 'error' : formik.values.password_2 === '' ? '' : 'success'}
                                >
                                    <Input
                                        id="password_2"
                                        name="password_2"
                                        type="password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password_2}
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        size="large"
                                        placeholder="Repete password"
                                    />
                                    {formik.touched.password_2 && formik.errors.password_2 ? (
                                        <div className='auth__formik'>{formik.errors.password_2}</div>
                                    ) : null}
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" size='large' onClick={() => dispatch( pushRegistration() )}>
                                        Registration
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <NavLink className='auth__register-link' to='/login'>{isLogin ? "Log in" : "Registration"}</NavLink>
                                </Form.Item>
                            </>
                            :
                            <>
                                <Form.Item
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your Email!' }]}
                                    hasFeedback
                                    validateStatus={formik.touched.email && formik.errors.email ? 'error' : formik.values.email === '' ? '' : 'success'}
                                >
                                <Input 
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email} 
                                    prefix={<UserOutlined className="site-form-item-icon" />} 
                                    size="large" 
                                    placeholder="Email" 
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className='auth__formik'>{formik.errors.email}</div>
                                ) : null}
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your Password!' }]}
                                    hasFeedback
                                    validateStatus={formik.touched.password && formik.errors.password ? 'error' : formik.values.password === '' ? '' : 'success'}
                                >
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        size="large"
                                        placeholder="Password"
                                    />
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className='auth__formik'>{formik.errors.password}</div>
                                    ) : null}
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" size='large' 
                                    onClick={() => dispatch( pushLogin() )}>
                                        Log in
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <NavLink className='auth__register-link' to='/registration'>{isLogin ? "Log in" : "Registration"}</NavLink>
                                </Form.Item>
                            </>
                        }
                </form>
            </div>
            </Block>
        </section>
    )
}
export default Auth;