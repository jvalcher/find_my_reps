// styles

export const Styles = () => {
  return `

<style>

/*-------
   Fonts
  -------*/

@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Alatsi&display=swap");


/*-------------
   Base Config
  --------------*/
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

a,
a:link,
a:visited,
a:hover,
a:active {
  text-decoration: none;
}

html {
  width: 100vw;
  height: 100vh;
}

body {
  background-color: #2C2C2C;
  color: #ffffff;
  margin: 0 10px;
  height: 99%;
  height: 100%;
}



/*--------
   Header
  --------*/

header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  width: fit-content;
  margin: auto;
}

header a {
  text-decoration: none;
  color: #ffffff;
}

header h1 {
  text-align: center;
  font-family: "Poppins", sans-serif;
  font-size: 2.5rem;
  line-height: 51px;
}

header img {
  margin-left: 30px;
  width: 70px;
}

@media screen and (min-width: 660px) {
  header h1 {
    font-size: 3rem;
  }
}
@media screen and (min-width: 775px) {
  #home-img {
    display: none;
  }
}
@media screen and (min-width: 775px) {
  header h1 {
    font-size: 3.5rem;
    margin: 30px auto 30px;
  }
}
@media screen and (min-width: 1100px) {
  header h1 {
    font-size: 4rem;
  }
}



/*--------
   Search 
  --------*/

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#search {
  display: flex;
  width: 90%;
  max-width: 800px;
}

form {
  width: 315px;
  background-color: #19223F;
  border: 10px solid #3C66CE;
  border-radius: 32px;
  margin: 40px auto;
  filter: drop-shadow(2px 2px 5px black);
}

label {
  display: block;
  margin: 20px 0 10px 10px;
  font-family: "Alatsi";
  font-size: 1.25rem;
  color: #F4C149;
}

input {
  display: block;
  width: 90%;
  height: 3rem;
  margin: 5px 0 5px 10px;
  padding: 0 10px;
  border-radius: 10px;
  font-size: 1.5rem;
  justify-content: center;
}

#submit {
  margin: 30px auto 30px;
  text-align: center;
  justify-content: center;
  height: 50px;
  width: 150px;
  border-radius: 30px;
  font-family: "Alatsi";
  font-size: 1.25rem;
  background-color: #F4C149;
  color: black;
}

picture {
  display: none;
}

@media screen and (min-width: 775px) {
  #search {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
  picture {
    display: block;
    margin: auto;
  }
}
@media screen and (min-width: 1100px) {
  #search {
    max-width: 900px;
  }
}



/*------
   Reps
  ------*/

#note {
  margin-top: 20px;
  font-family: "Alatsi";
  color: #F4C149;
  font-size: 1.25rem;
  width: 90%;
  text-align: center;
  line-height: 2rem;
  letter-spacing: 2px;
}

@media screen and (min-width: 775px) {
  #note {
    width: 580px;
  }
}
#address-info {
  margin: 20px 0;
  width: 350px;
  border: 2px solid #F4C149;
  filter: drop-shadow(2px 2px 5px black);
  border-radius: 10px;
  overflow: hidden;
}

#address-info p {
  padding: 5px 0;
  text-align: center;
}

#address-info p:nth-of-type(odd) {
  background-color: #12172f;
}

#address-info p:nth-of-type(even) {
  background-color: #2a3872;
}

#representatives {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: 20px auto;
  padding: 20px;
  filter: drop-shadow(2px 2px 5px black);
  font-family: "Alatsi";
  color: #F4C149;
}

#representatives h2 {
  margin: 20px 0;
  text-align: center;
  text-decoration: underline;
  font-size: 2.5rem;
}

#representatives article {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  width: 90%;
}

#representatives figure {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 350px;
  width: 275px;
}

.rep-img-div {
  width: 200px;
  height: 250px;
  margin-bottom: 20px;
  border: 2px solid;
  border-radius: 5px;
  overflow: hidden;
}

.rep-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


#representatives figcaption {
  text-align: center;
  margin-bottom: 20px;
}

#representatives figcaption:first-of-type {
  margin-bottom: 5px;
}

#representatives article p {
  text-align: center;
  font-style: italic;
}

#rep-load-bg {
  display: none;
  position: fixed;
  z-index: 2;
  height: 100%;
  width: 100%;
  background-color: #2C2C2C;
  opacity: 98%;
}

#rep-load-msg {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  font-family: "Poppins", sans-serif;
  font-size: 1.5rem;
}

#rep-load-msg p {
  text-align: center;
  margin-bottom: 20px;
}

#rep-load-text {
  text-align: center;
  margin: auto;
  margin-bottom: 20px;
}

#rep-load-spinner {
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  margin: auto;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

#tohome {
  color: white;
  font-family: "Poppins", sans-serif;
}
#tohome:hover {
  text-decoration: underline;
}

</style>

`};
