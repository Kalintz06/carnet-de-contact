/**
 * CORRECTION CARNET CONTACT
 *
 *
 */

// Récupération des éléments
let formulaire = document.querySelector("#form");
let divContact = document.querySelector(".renderContact");

// Déclaration de mon tableau arrayContact
let arrayContact = [];
// Déclenchement de l'event sur notre formulaire au submit

formulaire.addEventListener("submit", function (e) {
  // Annulation du rechargement de la page
  e.preventDefault();
  // Récupération des données du formulaire
  let formData = new FormData(formulaire);

  let emailGet = formData.get("email");
  let lastNameGet = formData.get("lastname");
  let firstnameGet = formData.get("firstname");
  let phoneGet = formData.get("phone");

  // Création de l'objet contact
  let contact = {
    email: emailGet,
    lastName: lastNameGet,
    firstname: firstnameGet,
    phone: phoneGet,
    presentation: function () {
      return `Je m'appel ${this.lastName} ${this.firstname} mon email: ${this.email} mon numéro de téléphone ${this.phone}`;
    },
  };
  // Envoi de l'objet contact dans le tableau avec la méthode push
  arrayContact.push(contact);
  // APpel de la fonction showContact
  showContact();
});

function showContact() {
  // Création de la fonction show contact avec la méthode forEach
  // Création d'une variable content
  let content = "";
  arrayContact.forEach(function (element) {
    // Ajout à la variable content de mon élément
    content += `<p>${element.presentation()} <button class="deleteButton">Supprimer</button></p> `;
  });

  divContact.innerHTML = content;
}
