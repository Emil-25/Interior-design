let cbtns = $(".c-btn");
$(".c-image").hide(); //hide all images
$("#1").show(); //except for first one
let w = $(".c-image").css("width"); //carousel image width
let h = $(".c-image").css("height"); //carousel image height
let wih = window.innerHeight;

//counter
let c = 1;

//kounter, promise
let k, p;

//selector
let sel1 = "";
let sel2 = "";

//If not clicked the carousel will switch between images automatically
let done = false;
let intervalCarousel = setInterval(() => {
  $("#next").trigger("click");
}, 8000);

//When white dots on the bottom side of the carousel clicked
//the image will switch to different one
//(1st dot---1st picture; 2nd dot---2nd picture)
$(".c-list").click(function () {
  k = c;
  c = $(this).index() + 1;
  cbtns.each(function () {
    this.style.backgroundColor = "rgb(233, 233, 233)";
  });
  cbtns[c - 1].style.backgroundColor = "rgb(125, 125, 125)";
  $("#" + k).hide();
  $("#" + c).show();
});

$("#next").click(function (e) {
  e.preventDefault();
  $(this).css("pointer-events", "none"); //Prevent user-interaction till animation is done
  if (c == 5) {
    c = 0;
  }
  c++;

  //Every dot becomes white
  cbtns.each(function () {
    this.style.backgroundColor = "rgb(233, 233, 233)";
  });
  //Except for the current one
  cbtns[c - 1].style.backgroundColor = "rgb(125, 125, 125)";
  clearInterval(intervalCarousel); //disable auto image switching

  //There are total 5 images in carousel, as there is no image after
  //the 5th one, 1st picture will show up again
  if (c == 1) {
    k = 5;
    sel1 = "#" + k;
    sel2 = "#" + c;

    //As images were in flex container, 1st one was located on the left of 5th one
    //So I changed orders of 1st and 5th in flex container, but then 2nd becomes
    //on the left of 1st one, therefore I changed the order of every other
    $(sel1).css("order", c);
    $(sel2).css("order", k);
  } else {
    sel1 = "#" + (c - 1); //current
    sel2 = "#" + c; //next
    $(sel1).css("order", c - 1);
    $(sel2).css("order", c);
  }

  //Used promise as animation ends the other will start
  //(Made a huuuge mistake by using JQuery css "transform" as there is also -webkit-tranform)
  p = new Promise(function (res) {
    $(sel1).css({ "-webkit-transform": "translateX(0%)", transition: "none" });
    res();
  }).then(() => {
    $(sel1).css({ "-webkit-transform": "translateX(-150%)", transition: "2s" });
  });

  //After the carousel image went left or right it will be hidden
  setTimeout(() => {
    $(sel1).hide();
    $(sel1).css({ "-webkit-transform": "none" });
  }, 1000);

  $(sel2).css({ "-webkit-transform": "translateX(25%)", transition: "none" });
  $(sel2).show();
  $(sel2).css({
    "-webkit-transform": "translateX(-100%)",
    transition: "1s ease-out",
  });

  //After some time the buttons will be interactable
  setTimeout(() => {
    $(sel2).css({ "-webkit-transform": "none", transition: "none" });
    $(this).css("pointer-events", "auto");
  }, 1000);
});

//Same as next button
$("#prev").click(function (e) {
  e.preventDefault();
  $(this).css("pointer-events", "none");
  if (c == 1) {
    c = 6;
  }
  c--;
  cbtns.each(function () {
    this.style.backgroundColor = "white";
  });
  cbtns[c - 1].style.backgroundColor = "rgb(125, 125, 125)";
  clearInterval(intervalCarousel);
  if (c == 5) {
    k = 1;
    sel1 = "#" + k;
    sel2 = "#" + c;
    $(sel1).css("order", c);
    $(sel2).css("order", k);
  } else {
    sel1 = "#" + (c + 1); //current
    sel2 = "#" + c; //previous
    $(sel1).css("order", c + 1);
    $(sel2).css("order", c);
  }
  p = new Promise(function (res) {
    $(sel1).css({
      "-webkit-transform": "translateX(-100%)",
      transition: "none",
    });
    res();
  }).then(() => {
    $(sel1).css({ "-webkit-transform": "translateX(50%)", transition: "2.1s" });
  });

  setTimeout(() => {
    $(sel1).hide();
    $(sel1).css({ "-webkit-transform": "none" });
  }, 1000);
  $(sel2).css({ "-webkit-transform": "translateX(-150%)", transition: "none" });
  $(sel2).show();
  $(sel2).css({
    "-webkit-transform": "translateX(0%)",
    transition: "0.9s ease-out",
  });
  setTimeout(() => {
    $(sel2).css({ "-webkit-transform": "none", transition: "none" });
    $(this).css("pointer-events", "auto");
  }, 1000);
});

//As the user scrolls down the card will come from left
function card1() {
  let rec = $("div.card")[0].getBoundingClientRect().top;
  if (rec - wih < -100) {
    let p = new Promise(function (res) {
      $("div.card:nth-of-type(1)").css({
        visibility: "visible",
        "-webkit-transform": "translateX(0%)",
      });
      res();
    }).then(() => {
      $(window).off("scroll", card1);
    });
  } else if (!done) {
    $("div.card:nth-of-type(1)").css({
      visibility: "hidden",
      "-webkit-transform": "translateX(-100%)",
    });
    done = true;
  }
}

//As the user scrolls down the card will come from right
function card2() {
  let rec = $("div.card")[1].getBoundingClientRect().top;
  if (rec - wih < -100) {
    let p = new Promise(function (res) {
      $("div.card:nth-of-type(2)").css({
        visibility: "visible",
        "-webkit-transform": "translateX(0%)",
      });
      res();
    }).then(() => {
      $(window).off("scroll", card2);
    });
  } else if (done) {
    $("div.card:nth-of-type(2)").css({
      visibility: "hidden",
      "-webkit-transform": "translateX(100%)",
    });
    done = false;
  }
}

//As the user scrolls down the card will come from right
function card3() {
  let rec = $("div.card")[2].getBoundingClientRect().top;
  if (rec - wih < -100) {
    let p = new Promise(function (res) {
      $("div.card:nth-of-type(3)").css({
        visibility: "visible",
        "-webkit-transform": "translateX(0%)",
      });
      res();
    }).then(() => {
      $(window).off("scroll", card3);
    });
  } else if (!done) {
    $("div.card:nth-of-type(3)").css({
      visibility: "hidden",
      "-webkit-transform": "translateX(-100%)",
    });
    done = true;
  }
}

$(window).on("scroll", card1);
$(window).on("scroll", card2);
$(window).on("scroll", card3);

//When contact button was clicked modal will show up
$("#contact").click(() => {
  $(".modal").css("visibility", "visible");
  $(".modal-bg").css("visibility", "visible");
  $(".modal").animate({ opacity: "1" });
});

//Modal will be closed when close button clicked
$("#modal-close-btn").click(() => {
  function anim() {
    $(".modal").css("visibility", "hidden");
    $(".modal-bg").css("visibility", "hidden");
  }
  $(".modal").animate({ opacity: "0" }, anim);
});
