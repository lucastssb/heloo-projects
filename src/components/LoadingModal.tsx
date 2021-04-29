import React from "react";
import Lottie from "react-lottie";
import * as LoadingIcon from "../../public/lottie/loading.json";
import styles from "../styles/components//LoadingModal.module.css";

export default function LoadingModal() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingIcon,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className={styles.loadingModalOverlay}>
      <div>
        <Lottie options={defaultOptions} height={200} width={200} />
      </div>
    </div>
  );
}
