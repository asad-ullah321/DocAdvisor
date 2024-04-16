<a name="readme-top"></a>
## DOCADVISOR | Introduction

Web appllication to automate the process of appointment booking, benefiting both patients and doctors.

## DOCADVISOR | Tools & Technology

* <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
* <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
* <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" />
* <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"/>
* <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
* <img src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white"/>
* <img src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white" />
* <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K" />

## DOCADVISOR | Prerequisites

These are the software you need to install before getting started.
- NodeJS
- NPM
- MySQL
- REACT.js

## DOCADVISOR | Installation

1. Clone This Repository

   ```sh
   https://github.com/asad-ullah321/DocAdvisor
2. Install NPM Packages
   ```sh
   npm install 
3. Enter Your DataBase Credentials in `config/sequelize.js`
   ```js
   const sequelize = new Sequelize(
    'DataBase_Name',
    'UserName',
    'Password',
    {
        host: 'HostName',
        dialect: 'mysql'
    });
    
4. Enter Your Email Credentials in `config/transporter.js`
   ```js
    let transporter = nodemailer.createTransport({
    host: "smtp.gmail.email",
    service: "gmail",
    auth: {
      user: "Your_Email",
      pass: "App_Password",
    }
    });
    
5. Get Started With The Command
   ```sh
   node index.js
   
## Contributors
- [Asad Ullah](https://github.com/asad-ullah321)
- [Furqan Ahmad](https://github.com/FurqanAhmad2)
## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
   
