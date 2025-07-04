
function saveSessionLinks(technical, standup, softskill) {
  const links = {
    technical: technical,
    standup: standup,
    softskill: softskill
  };
  localStorage.setItem('sessionLinks', JSON.stringify(links));
}

function getSessionLinks() {
  return JSON.parse(localStorage.getItem('sessionLinks')) || {};
}
