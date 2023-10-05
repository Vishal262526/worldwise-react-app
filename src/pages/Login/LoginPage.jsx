import { useState } from "react";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import styles from './LoginPage.module.css';
import InputField from "../../components/InputField/InputField";
import PrimaryButton from "../../components/Button/PrimaryButton";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");


  return (
    <>
      <Header />
      <Container>
          <div className={styles.loginForm} >
            <InputField type="email" label="Email" value={email} onValueChange={setEmail} />
            <InputField type="password" label="Password" value={password} onValueChange={setPassword} />
            <PrimaryButton  title="LOG IN" onClick={() => {}} />
          </div>
      </Container>
    </>
  );
};

export default LoginPage;
