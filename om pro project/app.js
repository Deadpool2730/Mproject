const btn = document.querySelector('.shareBtn')
const x = document.getElementById("demo");
let road;
let long;
let lat;
// const nameInput = document.querySelector('.name');
const getAllA = document.querySelectorAll('a:not(a[data-reset])');
const reset = document.querySelector('a[data-reset]');

reset.addEventListener('click',(e)=>{
  e.preventDefault();
  console.log("reset");
  fetch(`https://api.thingspeak.com/update?api_key=GQ4GELTTZT4OONHA&field1=0`).then((data)=>{
        return data.json();
    }).then((data)=>console.log(data)).catch((err)=>console.log(err));
})
getAllA.forEach((el,i)=>{
  el.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log("click");
    road = el.innerText;
    road = road.split(" ")[1]
    fetch(`https://api.thingspeak.com/update?api_key=GQ4GELTTZT4OONHA&field1=${road}`).then((data)=>{
        return data.json();
    }).then((data)=>console.log(data)).catch((err)=>console.log(err));
    getLocation();
  })
  
})


function sendData(){
  const name = 'noName';
  // const name = nameInput.value || 'noName';
  db.collection('shares').doc().set({
    // name,
    long,
    lat,
    road
  });
  // nameInput.value = null;
  road =  null;
}

// this will get the location and send the data to database
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.style.display = 'block';
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

// helper function for sending geoLocation
function showPosition(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  sendData();
}

// sent live location
btn.addEventListener("click",(e)=>{
    getLocation();
})

// live data create and delete update
// db.collection('shares').onSnapshot((snapShot) => {
//     let changes = snapShot.docChanges();
//     changes.forEach(change => {
//         if (change.type == 'added') {
//            console.log(change.doc.data());
//         } else if (change.type == 'removed') {
//             console.log(change.doc.data());
//         }
//     });
// });

// to get all live share data
async function getAllShares(){
    const sharesData = await db.collection('shares').get();
    const a = sharesData.docs.map(doc => doc.data());
}
// getAllShares();

// to delete a location with ID
function deleteDoc(id){
  db.collection("shares").doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });
}

