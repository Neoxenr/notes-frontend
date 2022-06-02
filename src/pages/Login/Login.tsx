import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Space } from 'antd';
import { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../../api';
import { SignInDto, SignInResponseDto } from '../../common/dto';
import { authorize } from '../../store';
import { AppDispatch } from '../../store/store';

import './style.css';

export function Login(): ReactElement {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [form] = Form.useForm();

  const [authorizeUser, { isLoading: isLogging }] = useSignInMutation();

  const handleOnFinish = async (userCredential: SignInDto): Promise<void> => {
    if (!isLogging) {
      authorizeUser(userCredential)
        .unwrap()
        .then((payload: SignInResponseDto) => {
          localStorage.setItem('token', payload.token);

          dispatch(authorize(true));

          navigate('/');
        })
        .catch((err: any) => {
          if (err.status === 404) {
            form.setFields([{ name: 'email', errors: [err.data.message] }]);
          } else if (err.status === 400) {
            form.setFields([{ name: 'password', errors: [err.data.message] }]);
          }
        });
    }
  };

  return (
    <Row
      itemType="flex"
      justify="center"
      align="middle"
      style={{ minHeight: '100vh' }}>
      <Col>
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={handleOnFinish}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Введите e-mail адрес' },
              { type: 'email', message: 'Неверный формат e-mail адреса' },
            ]}>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="E-mail"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Введите пароль' }]}>
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Пароль"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item>
              <Button
                loading={isLogging}
                type="primary"
                htmlType="submit"
                className="login-form-button">
                Войти
              </Button>
            </Form.Item>
            <Space
              direction="horizontal"
              style={{ width: '100%', justifyContent: 'center' }}>
              У вас нет аккаунта?
            </Space>
            <Space
              direction="horizontal"
              style={{ width: '100%', justifyContent: 'center' }}>
              <Link to="/registration">Зарегистрироваться</Link>
            </Space>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
