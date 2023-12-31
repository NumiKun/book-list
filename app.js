const out = (...params) => console.log(...params)

class Buku {
  #Judul
  #Penulis
  #Halaman
  #Baca
  #genre

  constructor(Judul, Penulis, Halaman, Baca, genre) {
    this.#Judul = Judul;
    this.#Penulis = Penulis;
    this.#Halaman = Halaman;
    this.#Baca = Baca;
    this.#genre = genre;
  }

  get Judul() {
    return this.#Judul;
  }

  set Judul(newJudul) {
    this.#Judul = newJudul;
  }

  get Penulis() {
    return this.#Penulis;
  }

  set Penulis(newPenulis) {
    this.#Penulis = newPenulis;
  }

  get Halaman() {
    return this.#Halaman;
  }

  set Halaman(newHalaman) {
    this.#Halaman = newHalaman;
  }

  get Baca() {
    return this.#Baca;
  }

  set Baca(newBaca) {
    this.#Baca = newBaca;
  }

  get genre() {
    return this.#genre;
  }

  getInfo() {
    return `
      Judul: ${this.#Judul}
      Penulis: ${this.#Penulis}
      Halaman: ${this.#Halaman}
      Status: ${this.#Baca ? "Sudah Dibaca" : "Belum Dibaca"}
    `;
  }

  static getData(data){
    return {
      judul: data.judul,
      penulis: data.penulis,
      halaman: data.halaman,
      status: data.status,
      genre: data.genre
    }
  }
}

// Kelas BukuFiksi
class BukuFiksi extends Buku {
  #genre

  constructor(Judul, Penulis, Halaman, Baca, genre) {
    super(Judul, Penulis, Halaman, Baca);
    this.#genre = genre;
  }

  get genre() {
    return this.#genre;
  }

  set genre(newGenre) {
    this.#genre = newGenre;
  }

  getInfo() {
    return `
      ${super.getInfo()} 
      Genre: ${this.#genre}
    `;
  }

  static getData(data){
    return {
      judul: data.judul,
      penulis: data.penulis,
      halaman: data.halaman,
      status: data.status,
      genre: "fiksi"
    }
  }
}

class DaftarBuku {
  #buku; 

  constructor() {
    this.#buku = this.ambilDariLocalStorage();
    this.tampilkanBuku();
  }

  simpanKeLocalStorage() {
    localStorage.setItem('daftarBuku', JSON.stringify(this.#buku));
  }

  ambilDariLocalStorage() {
    return JSON.parse(localStorage.getItem("daftarBuku"));
  }

  tambahBuku() {
    const Judul = prompt("Masukkan judul buku:");
    const Penulis = prompt("Masukkan nama penulis:");
    const Halaman = prompt("Masukkan jumlah halaman:");
    const Baca = confirm("Apakah Anda sudah membaca buku ini?");
    const genre = prompt("Masukkan genre buku (jika fiksi):");

    let buku;

    if (genre && genre.toLowerCase() == "fiksi"){
      const newBuku = new BukuFiksi(Judul, Penulis, Halaman, Baca)
      buku = BukuFiksi.getData({
        judul: newBuku.Judul,
        penulis: newBuku.Penulis,
        halaman: newBuku.Halaman,
        status: newBuku.Baca ? "Sudah Dibaca" : "Belum Dibaca",
      })
    }
    else {
      const newBuku = new Buku(Judul, Penulis, Halaman, Baca, genre)
      
      buku = Buku.getData({
        judul: newBuku.Judul,
        penulis: newBuku.Penulis,
        halaman: newBuku.Halaman,
        status: newBuku.Baca ? "Sudah Dibaca" : "Belum Dibaca",
        genre: newBuku.genre,
      })
    }

    this.#buku.push(buku);
    localStorage.setItem("daftarBuku", JSON.stringify(this.#buku));
    this.tampilkanBuku();
  }

  tampilkanBuku() {
    const kontainerDaftarBuku = document.getElementById("daftarBuku");
    kontainerDaftarBuku.innerHTML = "";

    this.#buku.forEach((buku, index) => {
      kontainerDaftarBuku.innerHTML += `
      <div class="buku">
        <span>Judul: ${buku.judul}, </span>
        <span>Penulis: ${buku.penulis}, </span>
        <span>Halaman: ${buku.halaman}, </span>
        <span>Baca: ${buku.status}, </span>
        <span>Genre: ${buku.genre}</span>
        
        <button class="hapus-btn">Hapus</button>
      </div>
      `
    });

    const hapusBuku = document.querySelectorAll(".hapus-btn")
    hapusBuku.forEach((hapusBtn, index) => {
      hapusBtn.addEventListener("click", () => {
        this.hapusBuku(index)
      })
    })
  }
  
  hapusBuku(index) {
    this.#buku.splice(index, 1);
    this.tampilkanBuku();
    this.simpanKeLocalStorage();
  }
}

if (!localStorage.getItem("daftarBuku")){
  localStorage.setItem('daftarBuku', JSON.stringify([]))
}

// Inisialisasi DaftarBuku
const daftarBuku = new DaftarBuku();