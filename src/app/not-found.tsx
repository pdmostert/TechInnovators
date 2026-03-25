import Image from "next/image";
import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src="/404-flamingos.png"
          alt="404 - Flamingos"
          width={800}
          height={450}
          className={styles.image}
          priority
        />
      </div>
      <h2 className={styles.title}>Oops! You've drifted off course.</h2>
      <p className={styles.message}>
        The page you are looking for has flown away or is being handcrafted somewhere else.
      </p>
      <Link href="/" className={styles.homeButton}>
        Return to Home
      </Link>
    </main>
  );
}
