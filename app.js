class Buku {
  #Judul
  #Penulis
  #Halaman
  #Baca

  constructor(Judul, Penulis, Halaman, Baca) {
    this.#Judul = Judul;
    this.#Penulis = Penulis;
    this.#Halaman = Halaman;
    this.#Baca = Baca;
  }

  // Getter dan Setter untuk properti Judul
  get Judul() {
    return this.#Judul;
  }

  set Judul(newJudul) {
    this.#Judul = newJudul;
  }

  // Getter dan Setter untuk properti Penulis
  get Penulis() {
    return this.#Penulis;
  }

  set Penulis(newPenulis) {
    this.#Penulis = newPenulis;
  }

  // Getter dan Setter untuk properti Halaman
  get Halaman() {
    return this.#Halaman;
  }

  set Halaman(newHalaman) {
    this.#Halaman = newHalaman;
  }

  // Getter dan Setter untuk properti Baca
  get Baca() {
    return this.#Baca;
  }

  set Baca(newBaca) {
    this.#Baca = newBaca;
  }

  // Method
  getInfo() {
    return `
      Judul: ${this.#Judul}
      Penulis: ${this.#Penulis}
      Halaman: ${this.#Halaman}
      Status: ${this.#Baca ? "Sudah Dibaca" : "Belum Dibaca"}
    `;
  }
}

// Kelas BukuFiksi
class BukuFiksi extends Buku {
  #genre

  constructor(Judul, Penulis, Halaman, Baca, genre) {
    super(Judul, Penulis, Halaman, Baca);
    this.#genre = genre;
  }

  // Getter dan Setter untuk properti genre
  get genre() {
    return this.#genre;
  }

  set genre(newGenre) {
    this.#genre = newGenre;
  }

  // Override metode getInfo dari kelas induk
  getInfo() {
    return `
      ${super.getInfo()} 
      Genre: ${this.#genre}
    `;
  }
}

// Kelas DaftarBuku
class DaftarBuku {
  #buku; // Mendeklarasikan properti buku sebagai private 

  constructor() {
    this.#buku = [];
  }

  tambahBuku() {
    const Judul = prompt("Masukkan judul buku:");
    const Penulis = prompt("Masukkan nama penulis:");
    const Halaman = prompt("Masukkan jumlah halaman:");
    const Baca = confirm("Apakah Anda sudah membaca buku ini?");
    const genre = prompt("Masukkan genre buku (jika fiksi):");

    if (genre && genre.toLowerCase() === "fiksi") {
      const bukuFiksi = new BukuFiksi(Judul, Penulis, Halaman, Baca, genre);
      this.#buku.push(bukuFiksi);
    } else {
      const buku = new Buku(Judul, Penulis, Halaman, Baca);
      this.#buku.push(buku);
    }

    this.tampilkanBuku();
  }

  tampilkanBuku() {
    const kontainerDaftarBuku = document.getElementById("daftarBuku");
    kontainerDaftarBuku.innerHTML = "";

    this.#buku.forEach((buku) => {
      const divBuku = document.createElement("div");
      divBuku.classList.add("buku");
      divBuku.innerHTML = buku.getInfo();
      kontainerDaftarBuku.appendChild(divBuku);
    });
  }
}

// Inisialisasi DaftarBuku
const daftarBuku = new DaftarBuku();
