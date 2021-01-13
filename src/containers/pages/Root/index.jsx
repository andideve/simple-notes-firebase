import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import Input from "../../../components/Input";
import { login, getLogin } from "../../../services";

function Root({ setProfile, history }) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [initialized, setInitialized] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  
  useEffect(() => {
    if (!initialized) {
      getLogin((user) => {
        if (user) {
          const { email, uid } = user;
          setProfile({ email, uid });

          return history.push("/notes");
        }
        
        setInitialized(true);
      });
    }
  }, [initialized, setProfile, history]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    let data = {...form};
    data[id] = value;

    setForm(data);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsSubmit(true);

    login(form.email, form.password, (err, result) => {
      if (err) {
        setIsSubmit(false);
        return alert(err);
      }
      
      const { email, uid } = result.user;
      setProfile({ email, uid });

      return history.replace("/notes");
    });
  }

  if (!initialized) return null;

  return (
    <>
      <main>
        <Container>
          <Row>
            <Col lg={6}>
              <Card>
                <Card.Header>
                  <h1 className="h3 mb-0 text-center">Halaman Masuk</h1>
                </Card.Header>
                <Card.Body>
                  <form onSubmit={handleSubmit}>
                    <Input id="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" autoFocus="on" required />
                    <Input id="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required />
                    <div className="d-flex justify-content-between">
                      <Button variant="link" className="px-0" onClick={() => history.push("/register")}>Daftar akun</Button>
                      <Button variant="primary" type="submit" disabled={isSubmit}>Masuk</Button>
                    </div>
                  </form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const reduxDispatch = (dispatch) => ({
  setProfile: data => dispatch({ type: "SET_PROFILE", data }),
});

export default connect(mapStateToProps, reduxDispatch)(Root);
