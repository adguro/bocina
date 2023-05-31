
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

var numero = document.getElementById("numero");

function getLocation(op){
    if (op=="N" && Number(numero.value) == 0){
        numero.value = "";
        return;
    }

    if (op=="N" && ((Number(numero.value) <= 0) || (Number(numero.value) >= 10000) || (numero.value.includes('.')))){

        alert(`El numero ${numero.value} no es valido`);
        numero.value = "";
        return;
    }
    if (navigator.geolocation){
        option = op;
        navigator.geolocation.getCurrentPosition(showPosition);

    }
}

function showPosition(position){
    if (option != "N") {
        db.collection("uno").doc("rojo")
        .set({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            option: option
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