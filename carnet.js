const formulaire = document.querySelector(".formulaire");
const addButton = document.querySelector(".button");
const contactList = document.querySelector(".contactList");
let saveContact = document.querySelector(".saveContact");
let deleteContact = document.querySelector(".supprimer");
let tab = [];

addButton.addEventListener("click", function () {
  let formData = document.querySelector(".formulaire");
  formData.addEventListener("submit", function (ev) {
    ev.preventDefault();
    let formData = new FormData(formData);

    let famillyName = formData.get("name");
    let firstName = formData.get("firstName");
    let mailAdress = formData.get("mailAdress");
    let phoneNumber = formData.get("phoneNumber");

    let li = document.createElement("li");
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Supprimer";
    li.appendChild(deleteButton);
    contactList.appendChild(li);
    contactList.innerText = " Je suis " + prenom.value + nom.value  "mon email est:" + mail.value + "et mon numéro de téléphone est le:" + telephone.value;

    //creation objet
    let contactObject = {
      nom: famillyName,
      prenom: firstName,
      adresseMail: mailAdress,
      numeroDeTel: phoneNumber,
      donnerInfos: function () {
        console.log(
          " je suis " +
            this.nom +
            this.prenom +
            " et mes coordonnées sont " +
            this.adresseMail +
            this.numeroDeTel
        );
      },
    };

    contactObject.donnerInfos();
    tab.push(contactObject);
  });
});
