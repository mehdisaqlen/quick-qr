"use client";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log(inputText);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [inputText]);

  // Function to generate QR code image URL
  const generateQRCodeUrl = (text: any) => {
    return `https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=${encodeURIComponent(
      text
    )}`;
  };

  // Function to trigger download
  const handleDownload = async () => {
    const qrCodeUrl = generateQRCodeUrl(inputText);
    const response = await fetch(qrCodeUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "qrQuick_code.png";
    link.click();
    window.URL.revokeObjectURL(url); // Release the object URL
  };

  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        <div>
          <header className={styles.header}>
            <h1>QRQuick</h1>
            <p className={styles.description}>Instant QR Codes.</p>
          </header>

          <input
            type="text"
            className={styles.input}
            placeholder={"Just type text or URL"}
            onChange={(e) => setInputText(e.target.value)}
          />

          <a className={styles.download} onClick={handleDownload}>
            Download
          </a>
        </div>

        <div className={styles.box}>
          <Image
            src={generateQRCodeUrl(inputText)}
            alt="QR Code"
            width={500}
            height={500}
            layout="responsive"
            className={styles.qrCode}
          />
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <footer className={styles.footer}>
        <p>
          QRQuick is created by{" "}
          <Link href="https://github.com/mehdisaqlen">Saqlen Mehdi</Link>
        </p>
      </footer>
    </main>
  );
}
