export function valdidateToken() {
  let nameEQ = "token=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return true;
  }
  window.location.href = "/welcome.html";
}
