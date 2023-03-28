import { Link } from "react-router-dom";
import "../styles/styleMenu.css";
export function Menu() {
  return (
    <>
      <nav className="navbar navbar-expand-lg shadow">
        <div className="container-fluid">
          <button
            className="btn d-lg-none botton-menu"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasResponsive"
            aria-controls="offcanvasResponsive"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas-lg offcanvas-start"
            tabIndex={-1}
            id="offcanvasResponsive"
            aria-labelledby="offcanvasResponsiveLabel"
          >
            <div className="offcanvas-header">
              <Link className="navbar-brand" to={"/"}>
                <img src="./resources/img/logo.png" alt="..." />
              </Link>
              <button
                type="button"
                className="btn-close float-end"
                data-bs-dismiss="offcanvas"
                data-bs-target="#offcanvasResponsive"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body align-items-center">
              <Link className="navbar-brand d-none d-lg-block" to={"/"}>
                <img src="./resources/img/logo.png" alt="..." />
              </Link>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" to={"/"}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/locations"}>
                    Locations
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/favorites"}>
                    Favorites
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
