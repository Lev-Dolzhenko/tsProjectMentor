//Структура
var contactsData = {
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    F: [],
    G: [],
    H: [],
    I: [],
    J: [],
    K: [],
    L: [],
    M: [],
    N: [],
    O: [],
    P: [],
    Q: [],
    R: [],
    S: [],
    T: [],
    U: [],
    V: [],
    W: [],
    X: [],
    Y: [],
    Z: [],
};
//Валидация данных в input
var inputName = document.getElementById("inputName") || null;
var inputVacancy = document.getElementById("inputVacancy") || null;
var inputPhone = document.getElementById("inputPhone") || null;
function checkInputName(name) {
    if (!name.match(/^[a-zA-Z]+$/) ||
        name.length === 0 ||
        name.slice(0, 1) !== name.slice(0, 1).toUpperCase()) {
        return false;
    }
    return true;
}
function checkInputVacancy(vacancy) {
    if (vacancy.length < 3) {
        return false;
    }
    return true;
}
function checkInputPhone(phone) {
    if (!phone.match(/^[0-9+]*$/)) {
        return false;
    }
    return true;
}
//Класс по созданию контакта
var Contact = /** @class */ (function () {
    function Contact(name, vacancy, phone, id) {
        this.name = name;
        this.vacancy = vacancy;
        this.phone = phone;
        this.id = id;
        this.name = name;
        this.vacancy = vacancy;
        this.phone = phone;
        this.id = id;
    }
    return Contact;
}());
//Функция для генерации id
var arrId = [];
function generateId() {
    var id = Math.floor(Math.random() * 100);
    if (arrId.indexOf(id) !== -1) {
        generateId();
    }
    return id;
}
//Создание контакта
var buttonAdd = document.getElementById("buttonAdd") || null;
function creatContact(e, nameValue, vacancyValue, phoneValue) {
    e.preventDefault();
    if (checkInputName(nameValue) &&
        checkInputVacancy(vacancyValue) &&
        checkInputPhone(phoneValue)) {
        return new Contact(nameValue, vacancyValue, phoneValue, generateId());
    }
    else if (inputName && !checkInputName(nameValue)) {
        inputName.classList.add("redBorder");
        inputName.value = "";
        inputName.placeholder = "Invalied Value";
        setTimeout(function () {
            inputName.placeholder = "Name";
            inputName.classList.remove("redBorder");
        }, 2000);
    }
    else if (inputVacancy && !checkInputVacancy(vacancyValue)) {
        inputVacancy.classList.add("redBorder");
        inputVacancy.value = "";
        inputVacancy.placeholder = "Invalied Value";
        setTimeout(function () {
            inputVacancy.placeholder = "Vacancy";
            inputVacancy.classList.remove("redBorder");
        }, 2000);
    }
    else if (inputPhone && !checkInputPhone(phoneValue)) {
        inputPhone.classList.add("redBorder");
        inputPhone.value = "";
        inputPhone.placeholder = "Invalied Value";
        setTimeout(function () {
            inputPhone.placeholder = "Phone +X XXX XXX XX XX";
            inputPhone.classList.remove("redBorder");
        }, 2000);
    }
}
//Проверка на дубликат контакта
function isDuplicate(contact) {
    var resStr = "".concat(contact.name).concat(contact.vacancy).concat(contact.phone);
    for (var contactData in contactsData) {
        var letterArray = contactsData[contactData];
        for (var _i = 0, letterArray_1 = letterArray; _i < letterArray_1.length; _i++) {
            var letterArrayItem = letterArray_1[_i];
            var currStr = "".concat(letterArrayItem.name).concat(letterArrayItem.vacancy).concat(letterArrayItem.phone);
            if (resStr === currStr) {
                return true;
            }
        }
    }
    return false;
}
//Добавление контатка
function addContact(contact) {
    var currLetter = contact.name.slice(0, 1);
    var currArray = contactsData[currLetter];
    if (isDuplicate(contact)) {
        alert("Такой пользователь уже существует!");
        clearContactsHTML();
        return;
    }
    currArray.push(contact);
    updateContactCounter(contact.name.slice(0, 1));
    clearContactsHTML();
}
buttonAdd.addEventListener("click", function (e) {
    var contact = creatContact(e, inputName.value, inputVacancy.value, inputPhone.value);
    if (contact) {
        addContact(contact);
    }
    //   updateContactCounter(inputName.value.slice(0, 1));
    //   updateLS.call(contactsData);
    //   loadLS();
    inputName.value = "";
    inputPhone.value = "";
    inputVacancy.value = "";
});
//Рендер контактов
var renderList = document.querySelector(".main__contacts--certain") ||
    null;
function renderContacts(letter) {
    while (renderList.firstChild) {
        renderList.removeChild(renderList.firstChild);
    }
    if (letter === null) {
        renderList.innerHTML = "";
    }
    else {
        var letterArray = contactsData[letter];
        for (var _i = 0, letterArray_2 = letterArray; _i < letterArray_2.length; _i++) {
            var letterArrayItem = letterArray_2[_i];
            var renderItem = "\n      <div data-contact-id=\"".concat(letterArrayItem.id, "\" class=\"main__contact--certain\">\n        <div class=\"main__contact--certain-name\">\n          <span>Name: </span>\n          <strong data-contact-name=").concat(letterArrayItem.name, ">").concat(letterArrayItem.name, "</strong>\n        </div>\n        <div class=\"main__contact--certain-vacancy\">\n          <span>Vacancy: </span>\n          <strong>").concat(letterArrayItem.vacancy, "</strong>\n        </div>\n        <div class=\"main__contact--certain-phone\">\n          <span>Phone: </span>\n          <strong>").concat(letterArrayItem.phone, "</strong>\n        </div>\n          <button data-button-id=\"").concat(letterArrayItem.id, "\"  class='main__contact--certain-button--delete'><img src='./images/deleteIcon.svg'></button>\n          <button data-button-id-edit='").concat(letterArrayItem.id, "' class='main__contact--certain-button--edit'><img src='./images/editIcon.svg'></button>\n    </div>");
            var newElement = document.createElement("div");
            newElement.innerHTML = renderItem;
            renderList.appendChild(newElement);
        }
    }
}
//Нажатие на одну из кнопок с буквами
var letterButtons = document.querySelectorAll(".contacts__element");
letterButtons.forEach(function (letterButton) {
    letterButton.addEventListener("click", function () {
        if (letterButton.dataset.letter) {
            renderContacts(letterButton.dataset.letter);
        }
    });
});
//Обноление счетчика контакто у каждой буквы
var counterLetters = document.querySelectorAll(".contacts__element--counter");
function updateContactCounter(letter) {
    counterLetters.forEach(function (counterLetter) {
        var dataCounterLetter = counterLetter.dataset.letterCounter;
        if (letter === dataCounterLetter) {
            var currLengthLetterArray = contactsData[letter].length;
            counterLetter.textContent = "".concat(currLengthLetterArray === 0 ? "" : currLengthLetterArray);
        }
    });
}
//Убираем все выведенные контакты из renderList
function clearContactsHTML() {
    while (renderList.firstChild) {
        renderList.removeChild(renderList.firstChild);
    }
}
//Вывод всех контактов
var buttonShowAll = document.querySelector(".main__contacts--search-button");
var listAllContacts = document.querySelector(".main__contacts--search-list");
buttonShowAll.addEventListener("click", function () {
    showAllContacts();
});
function showAllContacts() {
    while (listAllContacts.firstChild) {
        listAllContacts.removeChild(listAllContacts.firstChild);
    }
    for (var contactData in contactsData) {
        var letterArray = contactsData[contactData];
        for (var _i = 0, letterArray_3 = letterArray; _i < letterArray_3.length; _i++) {
            var letterArrayItem = letterArray_3[_i];
            var renderItem = "\n      <div data-contact-id=\"".concat(letterArrayItem.id, "\" class=\"main__contact--certain\">\n          <div class=\"main__contact--certain-name\">\n            <span>Name: </span>\n            <strong data-contact-name=").concat(letterArrayItem.name, ">").concat(letterArrayItem.name, "</strong>\n          </div>\n          <div class=\"main__contact--certain-vacancy\">\n            <span>Vacancy: </span>\n            <strong>").concat(letterArrayItem.vacancy, "</strong>\n          </div>\n          <div class=\"main__contact--certain-phone\">\n            <span>Phone: </span>\n            <strong>").concat(letterArrayItem.phone, "</strong>\n          </div>\n           <button data-button-id=\"").concat(letterArrayItem.id, "\" class='main__contact--certain-button--delete'><img src='./images/deleteIcon.svg'></button>\n           <button data-button-id-edit='").concat(letterArrayItem.id, "' class='main__contact--certain-button--edit'><img src='./images/editIcon.svg'></button>\n\n      </div>\n      ");
            var newElement = document.createElement("div");
            newElement.innerHTML = renderItem;
            listAllContacts.appendChild(newElement);
        }
    }
}
// Поиск контактов
var searchInput = document.getElementById("searchInput");
searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener("input", function () {
    var searchTerm = this.value.toLowerCase();
    listAllContacts.innerHTML = "";
    var filteredData = contactsData[searchTerm.slice(0, 1).toUpperCase()].filter(function (item) { return item.name.toLowerCase().indexOf(searchTerm) !== -1; });
    filteredData.forEach(function (item) {
        var renderItem = "\n  <div data-contact-id=\"".concat(item.id, "\" class=\"main__contact--certain\">\n      <div class=\"main__contact--certain-name\">\n        <span>Name: </span>\n        <strong data-contact-name=").concat(item.name, ">").concat(item.name, "</strong>\n      </div>\n      <div class=\"main__contact--certain-vacancy\">\n        <span>Vacancy: </span>\n        <strong>").concat(item.vacancy, "</strong>\n      </div>\n      <div class=\"main__contact--certain-phone\">\n        <span>Phone: </span>\n        <strong>").concat(item.phone, "</strong>\n      </div>\n        <button data-button-id=\"").concat(item.id, "\" class='main__contact--certain-button--delete'><img src='./images/deleteIcon.svg'></button>\n        <button data-button-id-edit='").concat(item.id, "' class='main__contact--certain-button--edit'><img src='./images/editIcon.svg'></button>\n  </div>\n  ");
        var newElement = document.createElement("div");
        newElement.innerHTML = renderItem;
        listAllContacts.appendChild(newElement);
    });
});
//Удаление всех контактов
var buttonDeleteAllContacts = document.getElementById("deleteAllContacts");
buttonDeleteAllContacts.addEventListener("click", function () {
    deleteAllContacts();
});
function deleteAllContacts() {
    for (var contactData in contactsData) {
        contactsData[contactData].length = 0;
        updateContactCounter(contactData);
        renderContacts(null);
        // showAllContacts();
    }
}
