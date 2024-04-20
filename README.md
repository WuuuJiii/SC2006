# 2006-SCSB-SCSB-T2 / Sweet Home Finder

> Filter home locations by desired amenities and frequently visited locations </br>
> Never be too far from the places you love

- [Demo](https://youtu.be/bwiQCzmZxI8)
- [Documentation](#documentation-link)

![Project Banner](https://github.com/softwarelab3/2006-SCSB-SCSB-T2/blob/dev/Landing%20page.png)

## 🛠 Installation and Setup
**Starting the server and client on Windows:**

```bash
.\start.bat
```
**Starting the server and client on Mac/Linux:**

```bash
./start.sh
```

**Starting the server:**

```bash
cd backend
npm install
npm run start:dev
```

**Starting the client:**

```bash
cd frontend/client
npm install
npm start
```

## 📂 Project Structure

<details>
<summary>View project structure</summary>
<br>

```
📦2006-SCSB-SCSB-T2
 ┣ 📂backend
 ┃ ┣ 📂node_modules
 ┃ ┣ 📂dist
 ┃ ┣ 📂src
 ┃ ┣ 📂test
 ┃ ┗ 📂services
 ┣ 📂frontend
 ┃ ┣ 📂client
 ┃ ┃ ┣ 📂build
 ┃ ┃ ┣ 📂node_modules
 ┃ ┃ ┣ 📂public
 ┃ ┃ ┣ 📂src
 ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┗ 📂pages
 ┗ 📜README.md
```

[`/backend/node_modules`](./backend/node_modules) - contains modules used in the backend code<br/>
[`/backend/src`](./backend/src) - contains the source code of the application, segmented into different subfolders<br/>
[`/backend/dist`](./backend/dist) - stores the backend compiled TypeScript<br/>
[`/backend/tests`](./backend/tests) - contains end-to-end test scripts and result logging<br/>

[`/frontend/public`](./frontend/public) - stores static assets such as images, fonts, etc<br/>
[`/frontend/build`](./frontend/build) - stores the frontend compiled build<br/>
[`/frontend/node_modules`](./frontend/node_modules) - contains modules used in the frontend code<br/>
[`/frontend/src/components`](./frontend/src/components) - contains reusable UI components that are used across the application, such as buttons, forms, and navigation bars<br/>
[`/frontend/src/pages`](./frontend/src/pages) - each file in this directory represents a route in the application and is responsible for rendering the content of that route<br/>

</details>

## 🧰 Languages & Tools

- Languages & Frameworks<br/>
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node-dot-js&logoColor=white)
  ![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  
- Tools & Platforms<br/>
  ![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
  
- Database<br/>
  ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

- User Interface<br/>
  ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Ant-Design](https://img.shields.io/badge/-AntDesign-%230170FE?style=for-the-badge&logo=ant-design&logoColor=white)

- APIs and Data <br/>
  - Google Maps API
  - <a href="https://beta.data.gov.sg/collections/189/datasets/d_ebc5ab87086db484f88045b47411ebc5/view"> Data.gov.sg </a>

## Contributors ✨

<table>
  <tr>
    <td align="center"><a href="https://github.com/WuuuJiii"><img src="https://avatars.githubusercontent.com/WuuuJiii" width="100px;" alt=""/><br /><sub><b>Wu Ji</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/seelism"><img src="https://avatars.githubusercontent.com/seelism" width="100px;" alt=""/><br /><sub><b>Sean</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/harryo20"><img src="https://avatars.githubusercontent.com/harryo20" width="100px;" alt=""/><br /><sub><b>Harry</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/boonyii"><img src="https://avatars.githubusercontent.com/boonyii" width="100px;" alt=""/><br /><sub><b>Boon Yi</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/Rabbitson2001"><img src="https://avatars.githubusercontent.com/Rabbitson2001" width="100px;" alt=""/><br /><sub><b>Alyssa</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/JeremyCEY"><img src="https://avatars.githubusercontent.com/JeremyCEY" width="100px;" alt=""/><br /><sub><b>Jeremy</b></sub></a><br /></td>
  </tr>
</table>

---

_This repository is part of a project for NTU SC2006._ 
