import { useEffect } from "react";
import {
  BrowserRouter as Router,
  HashRouter,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import Notes from "../containers/pages/Notes";
import Form from "../containers/pages/Notes/Form";
import Root from "../containers/pages/Root";
import Register from "../containers/pages/Root/Register";

const routes = [
  {
    path: "/",
    component: Root,
    exact: true,
  },
  {
    path: "/register",
    component: Register,
    exact: false,
  },
  {
    path: "/notes",
    component: Notes,
    exact: true,
  },
  {
    path: "/notes/new",
    component: Form,
    exact: false,
  },
  {
    path: "/notes/:id",
    component: Form,
    exact: false,
  },
];

function OnPathChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    const htmlElement = document.querySelector("html");

    htmlElement.classList.add("nprogress-bussy");

    setTimeout(() => {
      htmlElement.classList.remove("nprogress-bussy");
    }, 600);
  }, [pathname]);

  return null;
}

function Routes() {
  return (
    <Router>
      <HashRouter>
        <Route path="/" component={OnPathChange} exact={false} />
        <Switch>
          {routes.map((r, i) => (
            <Route
              exact={r.exact}
              path={r.path}
              component={r.component}
              key={i}
            />
          ))}
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </HashRouter>
    </Router>
  );

  function NoMatch() {
    let location = useLocation();

    return (
      <div>
        <h3>
          No match for <code>{location.pathname}</code>
        </h3>
      </div>
    );
  }
}

export default Routes;
