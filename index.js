var numOfTasks;
var tWork;
var tBreak;
var tHours;
var totMins;
var tRemMins;
var taskArray = [];
var tBreakSec;
var tWorkSec;

//______________________________________________________________________________________________ Work Time, Break Time, Number of Tasks
//OK BUTTON
$(".ok-task-input").click(function(){
  numOfTasks = parseFloat(document.querySelector(".how-many").value);
  tWork = parseFloat(document.querySelector(".work-time").value);
  tBreak = parseFloat(document.querySelector(".break-time").value);

  //check for no input
  if((tWork === NaN) || (tBreak === NaN) || (numOfTasks === NaN)) {
    $("#task-input").html("<p  class = 'error'> Seems like you're missing something. </p>");
  }
  else {
    taskItems();
  }
});

//ENTER KEY
$(".how-many").keydown(function(event) {
  numOfTasks = parseFloat(document.querySelector(".how-many").value);
  tWork = parseFloat(document.querySelector(".work-time").value);
  tBreak = parseFloat(document.querySelector(".break-time").value);

  //check for no input
  if (event.keyCode === 13) {
    if(($(".work-time") === "") || ($(".break-time") === "") || ($(".how-many") === "")) {
      $("#task-input").html("<p  class = 'error'> Seems like you're missing something. </p>");
    }

    else {
      taskItems();
    }
  }
});

//________________________________________________________________________________________________ task item input and display
function taskItems() {
  $("#task-input").addClass("thing-hidden");
  $("#task-item-input").removeClass("thing-hidden");
  for (var i = 0; i < numOfTasks; i++) {
    $("#task-item-input").append("<input class='task-in in-box' type='text'>"); //INPUT list item
  }
}


//This is where we input the names of the tasks
$(".ok-task-item-input").click(function() {
  calcTime(); //OK button
});


// document.querySelectorAll(".task-in")[numOfTasks - 1].keypress(function(event) {
//   if (event.keyCode === 13) {
//     calcTime(); //Enter key
//   }
// });

//_____________________________________________________________________________________________ telling the user what their time will look like;
function calcTime() {
  $("#task-item-input").addClass("thing-hidden");
  $("#schedule").removeClass("thing-hidden");

  totMins = (tWork + tBreak) * numOfTasks;
  tHours = Math.floor(totMins / 60);
  tRemMins = totMins % 60;

  for (var i = 0; i < numOfTasks; i++) {
    taskArray[i] = document.querySelectorAll(".task-in")[i].value;
    $(".tasks-list-container").append("<p class='list-item'>" + taskArray[i] + "</p>"); //just the printed list item
  }
  $("#schedule").append("<p>your total time is going to be " + tHours + " hours and " + tRemMins + " minutes. </p>");
}


//_____________________________________________________________________________________________delays
var k = 0;

function workDelay(workTime) {
  setTimeout(function() {
    $("#tasking").addClass("thing-hidden");
    $("#breaking").removeClass("thing-hidden");
  }, workTime);
}

function breakDelay(breakTime) {
  setTimeout(function() {
    $("#breaking").addClass("thing-hidden");
  }, breakTime);
}

var tasksDone = 0;
$(".start-button").click(function() {
  tWorkSec = tWork * 60 * 1000;
  tBreakSec = tBreak * 60 * 1000;
  startWork();

});

//HIDE TASKING document.querySelector("#tasking").classList.add("hidden-thing");
//REVEAL BREAKING document.querySelector("#breaking").classList.remove("hidden-thing");
//HIDE TASKING document.querySelector("#tasking").classList.add("hidden-thing");
//REVEAL BREAKING document.querySelector("#breaking").classList.remove("hidden-thing");

function startWork() {
    document.querySelector("#breaking").classList.add("thing-hidden");
    document.querySelector("#tasking").classList.remove("thing-hidden");
    setTimeout(startBreak, tWorkSec);
    fillTomatoTimer();
    tasksDone++;

}

function startBreak() {
  if(tasksDone < numOfTasks){
  document.querySelector("#tasking").classList.add("thing-hidden");
  document.querySelector("#breaking").classList.remove("thing-hidden");
  setTimeout(startWork, tBreakSec);
  }
  else {
    document.querySelector("#tasking").classList.add("thing-hidden"); //hide
    document.querySelector("#schedule").classList.add("thing-hidden"); //hide
    document.querySelector("#you-done").classList.remove("thing-hidden"); //reveal
  }
}


//___________________________________________WORKING TIMER
var i = 0;
function fillTomatoTimer() {
  console.log(document.getElementById("filling-tomato"));
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("filling-tomato");
    var width = 0.01;
    var id = setInterval(frame, tWorkSec / 100);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}



//generate enough text fields for the number of tasks;
