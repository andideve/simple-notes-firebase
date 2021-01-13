import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getNotes } from "../../../config/redux/action";
import { getLogin, signOut } from "../../../services";
import { Container, Row, Col, Button } from "react-bootstrap";
import Note from "../../organism/Note";
import { database } from "../../../config/firebase";

function Notes({ setProfile, profile, notes, history }) {
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (!initialized) {
            getLogin((user) => {
                if (!user) {
                    return history.replace("/");
                }

                const { email, uid } = user;
                setProfile({ email, uid });

                getNotes(uid);

                setInitialized(true);
            });
        }
    }, [history, initialized, setProfile]);

    const goSinglePage = (i) => {
        const keys = Object.keys(notes);
        const id = keys[i];
        
        history.push(`/notes/${id}`);
    }

    const handleDelete = (i) => {
        if (!window.confirm("Apakah yakin ingin menghapus catatan ini?")) return;

        const keys = Object.keys(notes);
        const id = keys[i];

        database
            .ref(`notes/${profile.uid}/`)
            .child(id)
            .remove((error) => {
                if (error) return alert("error occured");
            });
    }

    if (profile.email.length < 1) return null;

    return (
        <>
            <header>
                <Container>
                    <Row>
                        <Col lg={7}>
                            <h1 className="mb-0">{profile.email.split("@")[0]}</h1>
                            <p>at {profile.email.split("@")[1]}</p>
                        </Col>
                    </Row>
                </Container>
            </header>
            <main>
                <section>
                    <Container>
                        <Row>
                            <Col lg={7}>
                                {notes && Object.values(notes).map((n, i) => (
                                <Note
                                        key={i}
                                        title={n.title}
                                        time={n.time}
                                        onClick={() => goSinglePage(i)}
                                        onEdit={() => goSinglePage(i)}
                                        onDelete={() => handleDelete(i)}
                                    /> 
                                ))}

                                {!notes && window.localStorage.getItem("introduced") === null && (
                                    <>
                                        <h2 className="h4">Hai, {profile.email.split("@")[0]}</h2>
                                        <p>Catatanmu saat ini sedang kosong, mulailah dengan menulis baru.</p>
                                    </>
                                )}
                                {!notes && window.localStorage.getItem("introduced") && (
                                    <p className="text-muted">Catatan kosong</p>
                                )}
                            </Col>
                        </Row>
                    </Container>
                </section>
                <div className="navigation shadow-lg">
                    <Button
                        variant="warning"
                        className="navi"
                        onClick={() => {
                            if (!window.confirm("Apakah yakin ingin keluar?")) return;
                            signOut();
                        }}
                    >Keluar</Button>
                    <Button
                        variant="primary"
                        className="navi"
                        onClick={() => history.push("/notes/new")}
                    >Tulis baru</Button>
                </div>
            </main>
        </>
    );
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    notes: state.notes,
});

const reduxDispatch = (dispatch) => ({
    setProfile: data => dispatch({ type: "SET_PROFILE", data }),
});

export default connect(mapStateToProps, reduxDispatch)(Notes);
