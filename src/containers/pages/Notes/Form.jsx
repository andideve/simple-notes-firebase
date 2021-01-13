import { useState, useEffect } from "react";
import { database } from "../../../config/firebase";
import { connect } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";

function Form({ profile, notes, match, history }) {
    const [form, setForm] = useState({
        title: "",
        body: "",
    });
    const [edited, setEdited] = useState(false);

    useEffect(() => {
        const { id } = match.params;

        if (id && !notes) {
            return history.replace("/notes");
        }

        if (id) {
            const note = notes[id];
            setForm(note);
        }
    }, [match, notes, history]);

    const handleChange = (e) => {
        const { id, value } = e.target;
    
        let data = {...form};
        data[id] = value;
    
        setForm(data);

        setEdited(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        function push() {
            database
                .ref(`notes/${profile.uid}/`)
                .push(
                    { ...form, time: new Date().getTime() },
                    (error) => {
                        if (error) {
                            return alert("error occured");
                        }

                        if (window.localStorage.getItem("introduced") === null) {
                            window.localStorage.setItem("introduced", true);
                        }
    
                        return history.replace("/notes");
                    }
                );
        }

        function update() {
            database
                .ref(`notes/${profile.uid}/`)
                .child(id)
                .set(
                    form,
                    (error) => {
                        if (error) {
                            return alert("error occured");
                        }

                        setEdited(false);
                    }
                )
        }

        const { id } = match.params;

        if (!id) {
            push();
        } else {
            update();
        }
    }

    return (
        <>
            <main>
                <section>
                    <Container>
                        <Row>
                            <Col lg={7}>
                                <form>
                                    <input
                                        id="title"
                                        className="input-title h2 mb-4"
                                        value={form.title}
                                        onChange={handleChange}
                                        autoFocus="on"
                                        placeholder="Judul masukan"
                                        autoComplete="off"
                                    />
                                    <textarea
                                        id="body"
                                        className="input-body"
                                        value={form.body}
                                        onChange={handleChange}
                                    />
                                </form>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <div className="navigation shadow-lg">
                    <Button
                        variant="secondary"
                        className="navi"
                        onClick={() => history.replace("/notes")}
                    >Kembali</Button>
                    <Button
                        variant={edited ? "primary" : "secondary"}
                        className="navi"
                        disabled={!form.body.length || !form.title.length}
                        onClick={handleSubmit}
                    >Simpan</Button>
                </div>
            </main>
        </>
    );
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    notes: state.notes,
});

export default connect(mapStateToProps)(Form);
