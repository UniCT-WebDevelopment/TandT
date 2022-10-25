# TandT
 
 <p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="./log.png" alt="Project logo"></a>
</p>

<h3 align="center">social media app </h3>

## 📝 Indice

- [Obiettivo](#scopo)
- [Installazione e avvio](#inizio)
- [Dipendenza](#dipendenze)
- [Autore](#autore)



## 🧐 Obiettivo <a name = "scopo"></a>
L'obbiettivo è quello di sviluppare un social media che permette di creare un nuovo account , postare foto,avviare delle chat e seguire nuovi utenti.
## Descrizione
Il framework utilizzato per la realizzazione dell'applicazione (client) è React che permette una semplice gestione e riutilizzo di componenti, oltre alle funzioni native offerte dal framework. 
Il server utilizza una'architettura REST realizzata utilizzando Express per gestire la comunicazione tra client e server
## ⛏️ Dipendenze <a name = "dipendenze"></a>

- NodeJs  v16.15.1
- yarn  1

SET 1
- bcrypt 5.0.1
- cors 2.8.5
- express 4.18.1
- fs 0.0.1-security
- helmet ^4.4.1
- mongoose ^5.12.2
- morgan ^1.10.0
- multer ^1.4.5-lts.1
- nodemon ^2.0.19
- path ^0.12.7

SET 2

- socket.io ^4.5.3

SET 3
- @ant-design/1icons ^4.7.0
- @material-ui/core ^4.12.4
- @material-ui/icons ^4.11.3
- @testing-library/jest-dom ^5.16.4
- @testing-library/react  ^13.3.0
- @testing-library/user-eventç ^13.5.0",
- axios ^0.27.2
- react ^18.2.0 
- react-dom ^18.2.0
- react-icons ^4.4.0 
- react-router-dom ^6.3.0
- react-scripts 5.0.1
- socket.io-client ^4.5.3
- timeago.js ^4.0.2
- web-vitals ^2.1.4
 
## 🏁 Installazione e Avvio <a name = "inizio"></a>

Clonare la repo : 
```
git clone https://github.com/RaffaeleCali/tandt
```

Nella cartella ProgwebRc installare tutte le dipendenze (SET 1).
Nella cartella socket installare tutte le dipendenze (SET 2).
Nella cartella react-travel-and-tourism installare tutte le dipendenze (SET 3).
```
yarn add
```
Nella cartella ProgwebRc configurare il .env  con il Mogodb (MONGO_URL = "IL VOSTRO DB")

Avviare prima il server (ProgwebRc).
In seguito avviare le socket per la chat(socket).
In fine avviare il client (react-travel-and-tourism)
```
yarn start
```
## ✍️ Autore <a name = "autore"></a>

- Cali raffaele
