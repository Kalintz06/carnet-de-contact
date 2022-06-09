/**
 * CORRECTION CARNET CONTACT
 *
 *
 */

// Récupération des éléments
let formulaire = document.querySelector("#form");
let divContact = document.querySelector(".renderContact");

let inputPro = document.querySelector(".inputPro");
let inputPerso = document.querySelector(".inputPerso");
let contactType = document.querySelector(".contactType");
// Déclaration de mon tableau arrayContact

let arrayContact = [];

let lsParsed = JSON.parse(localStorage.getItem("contact"));
if (!lsParsed) {
  arrayContact = [];
} else {
  arrayContact = lsParsed;
  showContact();
}

contactType.addEventListener("change", function () {
  if (contactType.value == "perso") {
    inputPro.style.display = "none";
    inputPerso.style.display = "";
  } else {
    inputPro.style.display = "";
    inputPerso.style.display = "none";
  }
});
// Déclenchement de l'event sur notre formulaire au submit
formulaire.addEventListener("submit", function (e) {
  // Annulation du rechargement de la page
  e.preventDefault();
  // Récupération des données du formulaire
  let formData = new FormData(formulaire);

  //let emailGet = formData.get("email");
  //let lastNameGet = formData.get("lastname");
  //let firstNameGet = formData.get("firstname");
  // let phoneGet = formData.get("phone");
  let contact;

  if (contactType.value == "professionnel") {
    contact = new ProfilPro(
      formData.get("firstname"),
      formData.get("lastname"),
      formData.get("email"),
      formData.get("phone"),
      formData.get("profilPro")
    );
  } else if (contactType.value == "perso") {
    contact = new ProfilPerso(
      formData.get("firstname"),
      formData.get("lastname"),
      formData.get("email"),
      formData.get("phone"),
      formData.get("profilPerso")
    );
  }
  arrayContact.push(contact);

  let jsonArray = JSON.stringify(arrayContact);
  localStorage.setItem("contact", jsonArray);

  showContact();
});
function showContact() {
  // Création de la fonction show contact avec la méthode forEach
  // Création d'une variable content
  let content = "";
  arrayContact.forEach(function (element) {
    // Ajout à la variable content de mon élément
    content += `<p>${element.presentation}  <button class="deleteButton">Supprimer</button></p> `;
  });
  divContact.innerHTML = content;

  let deleteButtonArray = document.querySelectorAll(".deleteButton");

  deleteButtonArray.forEach(function (button, index) {
    button.addEventListener("click", function () {
      arrayContact.splice(index, 1);
      localStorage.setItem("@contacts", JSON.stringify(arrayContact));
      showContact();
    });
  });
}
// Création de l'objet contact
class Utilisateur {
  constructor(firstName, lastName, email, phone) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
  }
}

class ProfilPro extends Utilisateur {
  constructor(firstName, lastName, email, phone, entreprise) {
    super(firstName, lastName, email, phone);
    this.entreprise = entreprise;
    this.presentation = `je suis un professionnel, je m'appelle ${this.firstName} ${this.lastName} mes coordonnées sont ${this.email} ${this.phone} ${this.entreprise}`;
  }
}

class ProfilPerso extends Utilisateur {
  constructor(firstName, lastName, email, phone, adressePostale) {
    super(firstName, lastName, email, phone);
    this.adressePostale = adressePostale;
    this.presentation = `je suis un particulier, je m'appelle ${this.firstName} ${this.lastName} mes coordonnées sont ${this.email} ${this.phone} ${this.adressePostale}`;
  }
}
