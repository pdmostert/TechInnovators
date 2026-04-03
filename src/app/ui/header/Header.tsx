import Link from "next/link";
import { Suspense } from "react";
import SearchBar from "./SearchBar";
import styles from "./Header.module.css";
import CartIcon from "./CartIcon";
import HeaderAuth from "./HeaderAuth";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          Handcrafted Haven
        </Link>

        <Suspense fallback={<div className={styles.searchPlaceholder} />} >
          <SearchBar />
        </Suspense>

        <nav className={styles.actions}>
          <HeaderAuth />
          <CartIcon />
        </nav>
      </div>
    </header>
  );
}