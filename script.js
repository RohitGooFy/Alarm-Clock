let arrayAlarmList = []; // All the alarm set will be stored in this array.

const digitalTimeHr = document.getElementById("dhr-time"); // Getting into the div with id="dhr-time" using DOM.
const digitalTimeMin = document.getElementById("dmin-time"); // Getting into the div with id="dmin-time" using DOM.
const digitalTimeSec = document.getElementById("dsec-time"); //Getting into the div with id="dsec-time" using DOM.
const digitalZone = document.getElementById("dam-pm"); // Getting into the div with id="dam-pm" using DOM.
const alarmBtn = document.getElementById("set-btn"); // Getting into the div with id="set-btn" using DOM.

function start() { // This funtion starts the actual timer for the user to see, it initiates when the webpage is loaded.
  
  let rightNow = new Date(); // Making an object.
  let hours = rightNow.getHours(); // Using the object accessing the getHours() method to get current hour.
  let minute = rightNow.getMinutes(); // Using the object accessing the getMinutes() method to get current minute.
  let second = rightNow.getSeconds(); // Using the object accessing the getSeconds() method to get current Seconds.

  if (hours > 12) {
    hours -= 12;
    digitalZone.textContent = "PM";
  } else if (hours === 0) {
    hours = 12;
    digitalZone.textContent = "AM";
  } else if (hours === 12) {
    digitalZone.textContent = "PM";
  } else {
    digitalZone.textContent = "AM";
  }

  digitalTimeHr.textContent = `${hours}`;
  digitalTimeMin.textContent = `${minute}`;
  digitalTimeSec.textContent = `${second}`;

}

function init() {
  // This function is called in the html body when it is loaded.
  start(); // Start is called as when the page is loaded timer should start instantly.
  window.setInterval("start()", 1000);
  window.setInterval("valueMatchAndRing()", 1000);
}


//  Setting the alarm by clicking the set alarm button.

alarmBtn.addEventListener("click", () => {   // Listening to the click event using addeventlistener.

  // Taking the value of the input field after user as provided the necessary values required.
  
  let hrinput = document.getElementById("hr-input").value; 
  let mininput = document.getElementById("min-input").value;
  let secinput = document.getElementById("sec-input").value;
  let ampminput = document.getElementById("zone-ampm").value;

  // Checking if the user has entered all the values required or not, if not then user will be alerted to enter the values.
  if (!(hrinput && mininput && secinput && ampminput)) {
    alert(`Enter valid values`);
    return;
  }
  let temp = `${hrinput}:${mininput}:${secinput} ${ampminput}`; // After user entered the values, it is stored in the variable temp in a format of actual time.
  arrayAlarmList.push(temp); // Storing the values in the array.
  document.getElementById("hr-input").value = "";
  document.getElementById("min-input").value = "";
  document.getElementById("sec-input").value = "";

  // After the values are stored in the array then renderAlarm() funtion is called which render the display of the alarm list. 
  renderAlarmAndDel();
});

function renderAlarmAndDel() { // Creating the list of alarms and displaying it to the user.
  const listAlarm = document.getElementById("alarms-list");
  listAlarm.innerHTML = "";
  for (let i = 0; i < arrayAlarmList.length; i++) {
    if (arrayAlarmList[i] == null) {
      continue;
    }
    let alarm = document.createElement("div");   // Creating div inside the listalarm which contains two childs: alarmTime and deleteAlarm.
    let alarmTime = document.createElement("span");
    let deleteAlarm = document.createElement("button");
    deleteAlarm.className = "deleteBtn";
    alarmTime.innerText = arrayAlarmList[i];  // Displaying the time which was pushed inside the arrayAlarmList.
    deleteAlarm.innerText = "Delete";
    deleteAlarm.id = `${i}`;
    deleteAlarm.addEventListener("click", (event) => {  // Deleting the alarm when the delete alarm button is clicked.
      arrayAlarmList[parseInt(event.target.id)] = null;  // Accessing the arrayAlarmList by targetting the event with current id and making it null.
      renderAlarmAndDel();  // Calling again to reflect the changes.
    });
    alarm.appendChild(alarmTime);   // Appending the alarmTime to alarm making it its child.
    alarm.appendChild(deleteAlarm);  // Appending the button as well to alarm.
    listAlarm.appendChild(alarm);  // Appending the whole alarm div to the main listAlarm div.
  }
}

// Alerting the user when user's alarm and the time got match.

function valueMatchAndRing() {

  // Getting the current time.

  let hrvalue = digitalTimeHr.textContent;
  let minvalue = digitalTimeMin.textContent;
  let secValue = digitalTimeSec.textContent;
  let zoneValue = digitalZone.textContent;

  // Storing the current time in the varaible.

  let temp2 = `${hrvalue}:${minvalue}:${secValue} ${zoneValue}`;

  for (let i = 0; i < arrayAlarmList.length; i++) {

    // If the current element is null then skip to the next one.

    if (arrayAlarmList[i] == null) {  
      continue;
    }

    // If the current time and the user's alarm is matched then aler the user that the alarm is ringing.

    if (arrayAlarmList[i] === temp2) {
      alert("Your Alarm is Ringing!!");
      arrayAlarmList[i] = null;  // When the specific alarm is rang then the current element is made null and renderAlarmAndDel is called to show that the list is modified.
      renderAlarmAndDel();
    }
  }
}
