console.log(document.getElementsByClassName("star-icon"));

function starElement(i) {
  return "star" + (i);
}
const ratingStars = document.getElementsByClassName("star-icon");
for (var i = 0; i < 5; i++) {
  ratingStars[i].addEventListener("click", function() {
    var attributeName = this.getAttribute("name");
    const number = attributeName.slice(-1);
    changeIcon(number);
    console.log(number);
  })
}

function changeIcon(number) {
  const inactiveIcon = "far fa-star star-icon";
  const activeIcon = "fas fa-star star-icon";
  if (ratingStars[number - 1].className === inactiveIcon) {
    for (var i = 0; i < number; i++) {
      ratingStars[i].className = activeIcon;
    }
  } else {
    for (var i = number; i < 5; i++) {
      ratingStars[i].className = inactiveIcon;
    }
  }
}
