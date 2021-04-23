import { ReactNode } from "react";
import Header from "./Header";
import styles from "../styles/components/Layout.module.css";

interface HeaderProps {
  children: ReactNode;
}

export default function Layout({ children }: HeaderProps) {
  return (
    <div className={styles.layoutContainer}>
      <Header />
      {children}
    </div>
  );
}
