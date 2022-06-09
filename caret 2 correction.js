/**
 * CORRECTION CARNET CONTACT
 **/

// Récupération des éléments
let formulaire = document.querySelector("#form");
let divContact = document.querySelector(".renderContact");
let contactType = document.querySelector(".contactType");
let inputPro = document.querySelector(".inputPro");
let inputPerso = document.querySelector(".inputPerso");

/**
 * RECUPERATION DU LOCAL STORAGE
 */
// Déclaration de mon tableau arrayContact
let arrayContact = [];
// Remise en format objet Javascript de mon localStorage
let lsParsed = JSON.parse(localStorage.getItem("@contacts"));
// CONDITION : SI LE LOCAL STORAGE EST VIDE arrayContact = []
if (!lsParsed) {
  arrayContact = [];
} else {
  // SINON IL EST PAS VIDE arrayContact = LocalStorage.getItem
  // Définir arrayContact avec la valeur du localStorage
  arrayContact = lsParsed;
  // Lance la fonction de l'affichage des contacts
  showContact();
}

// Déclenchement de l'event sur notre formulaire au submit

contactType.addEventListener("change", function () {
  if (contactType.value == "perso") {
    inputPro.style.display = "none";
    inputPerso.style.display = "";
  } else {
    inputPro.style.display = "";
    inputPerso.style.display = "none";
  }
});

formulaire.addEventListener("submit", function (e) {
  // Annulation du rechargement de la page
  e.preventDefault();
  // Récupération des données du formulaire
  let formData = new FormData(formulaire);

  let emailGet = formData.get("email");
  let lastNameGet = formData.get("lastname");
  let firstnameGet = formData.get("firstname");
  let phoneGet = formData.get("phone");
  let select = formData.get("select");
  let adressPersoGet = formData.get("adressPerso");
  let companyGet = formData.get("company");

  // Création de l'objet contact
  let contact;
  if (select == "pro") {
    contact = new Travail(
      firstnameGet,
      lastNameGet,
      emailGet,
      phoneGet,
      companyGet
    );
  } else {
    contact = new Personnel(
      firstnameGet,
      lastNameGet,
      emailGet,
      phoneGet,
      adressPersoGet
    );
  }
  // Envoi de l'objet contact dans le tableau avec la méthode push
  arrayContact.push(contact);
  // Enregistrement de mon localStorage

  // Transformation de mon tableau en chaine de caractère
  let jsonArray = JSON.stringify(arrayContact);

  localStorage.setItem("@contacts", jsonArray);

  // APpel de la fonction showContact
  showContact();
});

function showContact() {
  // Création de la fonction show contact avec la méthode forEach
  // Création d'une variable content
  let content = "";
  arrayContact.forEach(function (element) {
    // Ajout à la variable content de mon élément
    content += `<p>${element.prenom} <button class="deleteButton">Supprimer</button></p>`;
  });

  divContact.innerHTML = content;

  let deleteButtonArray = document.querySelectorAll(".deleteButton");

  // SUITE FOR EACH SUPPRESSION CONTACT
  deleteButtonArray.forEach(function (button, index) {
    // Déclencher une action sur chaque button de mon tableau deleteButton
    button.addEventListener("click", function () {
      // Supression de mon contact dans mon arrayContact
      arrayContact.splice(index, 1);

      // ResetItem notre localStorage
      localStorage.setItem("@contacts", JSON.stringify(arrayContact));
      // On relance l'affichage de notre tableau
      showContact();
    });
  });
}

/**
 * CREATION FONCTION CONSTRU CONTACT
 **/
function Contact(prenom, nom, mail, tel) {
  this.prenom = prenom;
  this.nom = nom;
  this.mail = mail;
  this.tel = tel;
}
/**
 * CREATION CONSTRUCTRICE PERSONNEL
 */
function Personnel(prenom, nom, mail, tel, adresseperso) {
  Contact.call(this, prenom, nom, mail, tel);
  this.adresseperso = adresseperso;
  this.type = "personnel";
}

/**
 * CREATION CONSTRUCTRICE PROFESSIONNEL
 */
function Travail(prenom, nom, mail, tel, entreprise) {
  Contact.call(this, prenom, nom, mail, tel);
  this.entreprise = entreprise;
  this.type = "Pro";
}
