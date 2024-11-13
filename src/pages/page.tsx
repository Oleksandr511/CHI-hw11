// import Image from "next/image";
import styles from "../styles/header.module.css";
import Link from "next/link";

export default function SideBar() {
  return (
    <header className={styles.header}>
      <nav>
        <ul>
          <li>
            <Link className={styles.static} href="/home">
              Home
            </Link>
          </li>
          <li>
            <Link className={styles.static} href="/">
              Exhibits
            </Link>
          </li>
          <li>
            <Link className={styles.static} href="/new-post">
              New post
            </Link>
          </li>
          <li>
            <Link className={styles.static} href="/login">
              Login
            </Link>
          </li>
          {/* <li>
              <Link
                className={
                  location.pathname === "/register"
                    ? styles.active
                    : styles.static
                }
                to="/register"
              >
                Register
              </Link>
            </li> */}
        </ul>
      </nav>
    </header>
  );
}
