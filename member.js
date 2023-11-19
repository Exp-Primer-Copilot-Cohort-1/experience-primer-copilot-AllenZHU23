function skillsMember() {
  var skills = document.getElementById("skills");
  var skillsMember = document.getElementById("skillsMember");
  var skillsMemberValue = skillsMember.value;
  if (skillsMemberValue == "member") {
    skills.style.display = "block";
  } else {
    skills.style.display = "none";
  }
}