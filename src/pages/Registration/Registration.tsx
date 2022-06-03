import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import { ReactElement } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../../api';
import { SignUpDto } from '../../common/dto';

import './style.css';

export function Registration(): ReactElement {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const [registerUser, { isLoading: isRegistering }] = useSignUpMutation();

  const handleOnFinish = async (userCredential: SignUpDto): Promise<void> => {
    if (!isRegistering) {
      registerUser(userCredential)
        .unwrap()
        .then((payload: boolean) => {
          if (payload) {
            navigate('/login');
          }
        })
        .catch((err: any) => {
          if (err.status === 409) {
            form.setFields([{ name: 'email', errors: [err.data.message] }]);
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
      <Col className="register-form-wrapper">
        <Title className="register-form__title">Регистрация</Title>
        <Form
          form={form}
          name="register"
          className="register-form"
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
                loading={isRegistering}
                type="primary"
                htmlType="submit"
                className="register-form-button">
                Зарегистрироваться
              </Button>
            </Form.Item>
            <Space
              direction="horizontal"
              style={{ width: '100%', justifyContent: 'center' }}>
              Уже есть аккаунт?
            </Space>
            <Space
              direction="horizontal"
              style={{ width: '100%', justifyContent: 'center' }}>
              <Link to="/login">Войти</Link>
            </Space>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
