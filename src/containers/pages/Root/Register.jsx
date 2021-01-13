import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Input from "../../../components/Input";
import { register } from "../../../services";

function Register({ history }) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;

    let data = {...form};
    data[id] = value;

    setForm(data);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsSubmit(true);

    register(form.email, form.password, (err, result) => {
      if (err) {
        setIsSubmit(false);
        return alert(err);
      }
      
      alert("Pendaftaran akun berhasil");
      return history.replace("/");
    });
  }

  return (
    <>
      <main>
        <Container>
          <Row>
            <Col lg={4}>
              <h1 className="h3 mb-4 text-center">Daftar Akun</h1>
              <form onSubmit={handleSubmit}>
                <Input id="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" autoFocus="on" required />
                <Input id="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required />
                <div className="d-flex justify-content-between">
                  <Button variant="link" className="px-0" onClick={() => history.push("/")}>Masuk</Button>
                  <Button variant="primary" disabled={isSubmit} type="submit">Buat akun</Button>
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}

export default Register;
