// NOT WORKING :(

// function setCookie(name, value, days) {
//     const d = new Date();
//     d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
//     const expires = "expires=" + d.toUTCString();
//     document.cookie = name + "=" + value + ";" + expires + ";path=/";
// }

// function getCookie(name) {
//     const cname = name + "=";
//     const decodedCookie = decodeURIComponent(document.cookie);
//     const ca = decodedCookie.split(';');
//     for (let i = 0; i < ca.length; i++) {
//         let c = ca[i];
//         while (c.charAt(0) === ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(cname) === 0) {
//             return c.substring(cname.length, c.length);
//         }
//     }
//     return "";
// }

// function saveFormInputs() {
//     const formElements = document.querySelectorAll("#rarity-form input, #rarity-form select");
//     formElements.forEach(element => {
//         if (element.type === "checkbox") {
//             element.addEventListener('change', () => {
//                 setCookie(element.id, element.checked, 365);
//             });
//         } else {
//             element.addEventListener('input', () => {
//                 setCookie(element.id, element.value, 365);
//             });
//         }
//     });
// }

// function loadFormInputs() {
//     const formElements = document.querySelectorAll("#rarity-form input, #rarity-form select");
//     formElements.forEach(element => {
//         const value = getCookie(element.id);
//         if (value) {
//             if (element.type === "checkbox") {
//                 element.checked = value === "true";
//             } else {
//                 element.value = value;
//             }
//         }
//     });
// }

// document.addEventListener("DOMContentLoaded", () => {
//     loadFormInputs();
//     saveFormInputs();
// });