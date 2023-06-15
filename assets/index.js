
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAFafN74WM2-gVjIQ3lGJhB6f6-gI8H-gA",
    authDomain: "controlandorancho.firebaseapp.com",
    projectId: "controlandorancho",
    storageBucket: "controlandorancho.appspot.com",
    messagingSenderId: "395395371394",
    appId: "1:395395371394:web:7b70a268d08e314a187f9b",
    measurementId: "G-S0Z61Q97JB"
});
const db = firebaseApp.firestore();

var option = "";
let o = document.getElementById("O");   //  ./assets/icons8-apagar-50.png
let p = document.getElementById("P");   // "./assets/icons8-play-50.png"    "./assets/icons8-pausa-50.png"
let l = document.getElementById("L");   // "./assets/icons8-rebobinar-50.png"
let r = document.getElementById("R");   // ./assets/icons8-avance-rapido-50.png
let n = document.getElementById("N");   // ./assets/icons8-entrar-50.png
let e = document.getElementById("E");
let a = document.getElementById("A");


var numero = document.getElementById("numero");

function spinnerButton(element, image, image2) {
    element.innerHTML = "<i class='fa fa-spinner fa-2x fa-spin'></i>";
    element.disabled = true;
    setTimeout(function () {
        element.innerHTML = image;
        if (image2) {
            element.innerHTML = image + image2;
        }
        element.disabled = false;
    }, 2000);
}

function getLocation(op) {

    // if (op == "E") {
    //     e.innerHTML = "<i class='fa fa-spinner fa-3x fa-spin'></i>";
    //     e.disabled = true;
    // } else if (op == "A") {
    //     a.innerHTML = "<i class='fa fa-spinner fa-3x fa-spin'></i>";
    //     a.disabled = true;
    // }


    switch (op) {
        case "O":
            spinnerButton(o, '<img src="./assets/icons8-apagar-50.png" alt="">');
            break;
        case "P":
            spinnerButton(p, '<div class="div_img"><img src="./assets/icons8-play-50.png" alt=""><img src="./assets/icons8-pausa-50.png" alt=""></div>');
            break;
        case "L":
            spinnerButton(l, '<img src="./assets/icons8-rebobinar-50.png" alt="">');
            break;
        case "R":
            spinnerButton(r, '<img src="./assets/icons8-avance-rapido-50.png" alt="">');
            break;
        case "N":
            spinnerButton(n, '<img src="./assets/icons8-entrar-50.png" alt="">');
            break;
        case "E":
            spinnerButton(e, '<img src="./assets/icons8-volumen-bajo-50.png" alt="-">');
            break;
        case "A":
            spinnerButton(a, '<img src="./assets/icons8-volumen-alto-50.png" alt="+">');
            break;

    }


    // if (op == "E") {
    //     // e.innerHTML = "<i class='fa fa-spinner fa-2x fa-spin'></i>";
    //     // e.disabled = true;
    //     // setTimeout(function () {
    //     //     e.innerHTML = '<img src="./assets/icons8-volumen-bajo-50.png" alt="-">';
    //     //     e.disabled = false;
    //     // }, 3000);

    //     spinnerButton(e, '<img src="./assets/icons8-volumen-bajo-50.png" alt="-">');

    // } else if (op == "A") {

    //     // a.innerHTML = "<i class='fa fa-spinner fa-2x fa-spin'></i>";
    //     // a.disabled = true;
    //     // setTimeout(function () {
    //     //     a.innerHTML = '<img src="./assets/icons8-volumen-alto-50.png" alt="+">';
    //     //     a.disabled = false;
    //     // }, 3000);
    //     spinnerButton(a, '<img src="./assets/icons8-volumen-bajo-50.png" alt="-">');


    // }

    if (op == "N" && Number(numero.value) == 0) {
        numero.value = "";
        return;
    }

    if (op == "N" && ((Number(numero.value) <= 0) || (Number(numero.value) >= 10000) || (numero.value.includes('.')))) {

        alert(`El numero ${numero.value} no es valido`);
        numero.value = "";
        return;
    }
    if (navigator.geolocation) {
        option = op;
        navigator.geolocation.getCurrentPosition(showPosition);

    }
}

function showPosition(position) {
    if (option != "N") {
        db.collection("uno").doc("rojo")
            .set({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                option: option
            })
            .then(docRef => {
                //                 <i class="fa-solid fa-spinner fa-spin-pulse">  fa-cog
                if (op == "E") {
                    e.innerHTML = "<i class='fa fa-spinner fa-2x fa-spin'></i>";
                    e.disabled = true;
                    setTimeout(function () {
                        e.innerHTML = '<img src="./assets/icons8-volumen-bajo-50.png" alt="-">';
                        e.disabled = false;
                    }, 3000);

                } else if (op == "A") {

                    a.innerHTML = "<i class='fa fa-spinner fa-2x fa-spin'></i>";
                    a.disabled = true;
                    setTimeout(function () {
                        a.innerHTML = '<img src="./assets/icons8-volumen-alto-50.png" alt="+">';
                        a.disabled = false;
                    }, 3000);

                }
            });
    } else {
        db.collection("uno").doc("rojo")
            .set({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                option: option,
                numero: Number(numero.value)
            });
        numero.value = "";
    }

}