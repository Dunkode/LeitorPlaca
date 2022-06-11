//Sensor é a classe do potenciometro
const { Board, Sensor } = require("johnny-five");

//IMPORTANTE!!!!!!!!!!!!!!!!
//Colocar a porta com do Arduino
const board = new Board({ port: "COM3" });

const { initializeApp } = require('firebase/app')
const { getDatabase, ref, set, } = require("firebase/database")


const firebaseConfig = {
  apiKey: "AIzaSyB8vXJUgbiPI8v93rerx31jkHU8Q_4R5mU",
  authDomain: "temperaturaambiente-97f8b.firebaseapp.com",
  databaseURL: "https://temperaturaambiente-97f8b-default-rtdb.firebaseio.com",
  projectId: "temperaturaambiente-97f8b",
  storageBucket: "temperaturaambiente-97f8b.appspot.com",
  messagingSenderId: "6813849236",
  appId: "1:6813849236:web:30947b8d5aff452e414681"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


board.on("ready", () => {
  //pin recebe o pino do potenciometro
  //freq é a frequência de tempo que o potenciometro será lido
  const potentiometer = new Sensor({ pin: "A0", freq: 1500, });

  potentiometer.on("change", () => {
    const { value, raw } = potentiometer;
    var temperatura =  value / 10

    // console.log("Sensor: ");
    // console.log("  value  : ", value );
    // console.log("  raw    : ", raw);
    // console.log("-----------------");

    //Aqui, é enviada a temperatura para a Database
    set(ref(database, 'temp/'), temperatura);
  });
});

