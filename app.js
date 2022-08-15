const BMIData = [
    { name: "Maigreur", color: "midnightblue", range: [0, 18.5] },
    { name: "Bonne santé", color: "green", range: [18.5, 25] },
    { name: "Surpoids", color: "lightcoral", range: [25, 30] },
    { name: "Obésité modérée", color: "orange", range: [30, 35] },
    { name: "Obésité sévère", color: "crimson", range: [35, 40] },
    { name: "Obésité morbide", color: "purple", range: 40 },
];

//On va récupérer le formulaire dans le DOM
const form = document.querySelector("form");
//On vient lire l'event lorsque l'on appuie sur le bouton
form.addEventListener("submit", handleForm);
//On vient lire cette fonction quand on clique sur le bouton
function handleForm(e) {
    e.preventDefault();

    calculateBMI();
}
//On vient récupérer les valeurs des inputs taile et poids
const inputs = document.querySelectorAll("input");
//On va venir calculer la BMI IMC = poids en kg / taille² en m
function calculateBMI() {
    const height = inputs[0].value;
    const weight = inputs[1].value;

    if (!height || !weight || height <= 0 || weight <= 0) {
        handleError();
        return;
    }
    /* On calcule l'IMC, Math.pow permet de calculer avec des puissances et to Fixed permet 
    de garder un chiffre après la virgule */
    const BMI = (weight / Math.pow(height / 100, 2)).toFixed(1);

    showResult(BMI);
}

//On récupère le parahraphe dans le DOM
const displayBMI = document.querySelector(".bmi_value");
//On récupère le parahraphe dans le DOM
const result = document.querySelector(".result");
//Fonction qui affichera le message d'erreur
function handleError() {
    //On affiche les messages d'erreurs en réinitialisant la couleur
    displayBMI.textContent = "Oopsie";
    displayBMI.style.color = "inherit";
    result.textContent = "Remplissez correctement votre taille et votre poids";
}

//On va créer la fonction qui permet de montrer le résultat de notre tableau BMIData
function showResult(BMI) {
    const rank = BMIData.find((data) => {
        /* On boucle le tableau BMIData, si notre BMI ne respecte pas les conditions de la ligne 1
        alors elle passe à la ligne 2 et ainsi de suite jusqu'à ce que notre BMI respecte bien
        une condition présente dans le tableau */
        if (BMI >= data.range[0] && BMI < data.range[1]) {
            return data;
            /* Comme notre dernière ligne de BMIData n'est pas une fourchette de nombre dans un tableau
            (car pour obésité morbide c'est 40 et plus l'infinie)alors on va venir lui dire else if 
            le nombre saisie est un nombre alors on retourne cette valeur */
        } else if (typeof data.range === "number" && BMI >= data.range) {
            return data;
        }
    });

    //On va venir insérer le nombre calculé
    displayBMI.textContent = BMI;
    //On va venir choisir la couleur du tableau BMIData
    displayBMI.style.color = `${rank.color}`;
    //On va venir chercher le nom de la ligne du tableau dans BMIData
    result.textContent = `Résultat : ${rank.name}`;
}
