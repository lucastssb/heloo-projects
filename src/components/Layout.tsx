import { ReactNode } from "react";
import Link from "next/link";
import Header from "./Header";
import { FiPlus } from "react-icons/fi";
import styles from "../styles/components/Layout.module.css";

interface HeaderProps {
  children: ReactNode;
}

export default function Layout({ children }: HeaderProps) {
  return (
    <div className={styles.layoutContainer}>
      <Header />
      <Link href="/" passHref>
        <a>
          <FiPlus size={40} />
        </a>
      </Link>
      {children}
    </div>
  );
}
