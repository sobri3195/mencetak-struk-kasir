import React from "react";
import { useRef } from "react";

function printReceipt() {
  const printer = useRef(null);
  const receiptData = "Data struk kasir yang akan dicetak";

  // Fungsi untuk mengirim perintah cetak ke printer thermal
  function sendToPrinter(data) {
    printer.current.write(data);
  }

  // Fungsi untuk mencetak struk kasir
  function print() {
    const ESC = "\x1B";
    const GS = "\x1D";

    // Inisialisasi printer
    sendToPrinter(`${ESC}@`);
    
    // Atur jenis font
    sendToPrinter(`${ESC}!0`);

    // Atur lebar karakter menjadi 48 karakter
    sendToPrinter(`${GS}!`);

    // Tulis header
    sendToPrinter("Toko ABC\nJl. Contoh No. 123\n");

    // Atur lebar karakter menjadi 24 karakter
    sendToPrinter(`${GS}2`);

    // Tulis tanggal dan nomor transaksi
    sendToPrinter("21 Februari 2023 12:34\n#1234\n");

    // Tulis daftar barang dan harga
    sendToPrinter("2 x Nasi Goreng            30.000\n1 x Es Teh Manis           10.000\n");

    // Atur lebar karakter menjadi 48 karakter
    sendToPrinter(`${GS}!`);

    // Tulis total harga
    sendToPrinter("Total:                    40.000\n");

    // Atur jenis font
    sendToPrinter(`${ESC}!1`);

    // Tulis footer
    sendToPrinter("Terima kasih telah berbelanja di Toko ABC.\n");

    // Pemotongan kertas
    sendToPrinter(`${ESC}m`);
  }

  return (
    <div>
      <button onClick={print}>Cetak Struk Kasir</button>
      <object ref={printer} type="application/octet-stream" width="0" height="0" />
    </div>
  );
}
