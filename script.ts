//Структура

const contactsData: Record<string, Contact[]> = {
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

const inputName =
  (document.getElementById("inputName") as HTMLInputElement) || null;
const inputVacancy =
  (document.getElementById("inputVacancy") as HTMLInputElement) || null;
const inputPhone =
  (document.getElementById("inputPhone") as HTMLInputElement) || null;

function checkInputName(name: string) {
  if (
    !name.match(/^[a-zA-Z]+$/) ||
    name.length === 0 ||
    name.slice(0, 1) !== name.slice(0, 1).toUpperCase()
  ) {
    return false;
  }
  return true;
}

function checkInputVacancy(vacancy: string) {
  if (vacancy.length < 3) {
    return false;
  }
  return true;
}

function checkInputPhone(phone: string) {
  if (!phone.match(/^[0-9+]*$/)) {
    return false;
  }
  return true;
}

//Класс по созданию контакта

class Contact {
  constructor(
    public name: string,
    public vacancy: string,
    public phone: string,
    public id: number
  ) {
    this.name = name;
    this.vacancy = vacancy;
    this.phone = phone;
    this.id = id;
  }
}

//Функция для генерации id

const arrId: number[] = [];

function generateId() {
  const id: number = Math.floor(Math.random() * 100);
  if (arrId.indexOf(id) !== -1) {
    generateId();
  }
  return id;
}

//Создание контакта

const buttonAdd =
  (document.getElementById("buttonAdd") as HTMLButtonElement) || null;

function creatContact(
  e: any,
  nameValue: string,
  vacancyValue: string,
  phoneValue: string
) {
  e.preventDefault();
  if (
    checkInputName(nameValue) &&
    checkInputVacancy(vacancyValue) &&
    checkInputPhone(phoneValue)
  ) {
    return new Contact(nameValue, vacancyValue, phoneValue, generateId());
  } else if (inputName && !checkInputName(nameValue)) {
    inputName.classList.add("redBorder");
    inputName.value = "";
    inputName.placeholder = "Invalied Value";
    setTimeout(() => {
      inputName.placeholder = "Name";
      inputName.classList.remove("redBorder");
    }, 2000);
  } else if (inputVacancy && !checkInputVacancy(vacancyValue)) {
    inputVacancy.classList.add("redBorder");
    inputVacancy.value = "";
    inputVacancy.placeholder = "Invalied Value";
    setTimeout(() => {
      inputVacancy.placeholder = "Vacancy";
      inputVacancy.classList.remove("redBorder");
    }, 2000);
  } else if (inputPhone && !checkInputPhone(phoneValue)) {
    inputPhone.classList.add("redBorder");
    inputPhone.value = "";
    inputPhone.placeholder = "Invalied Value";
    setTimeout(() => {
      inputPhone.placeholder = "Phone +X XXX XXX XX XX";
      inputPhone.classList.remove("redBorder");
    }, 2000);
  }
}

//Проверка на дубликат контакта

function isDuplicate(contact: Contact) {
  const resStr = `${contact.name}${contact.vacancy}${contact.phone}`;
  for (let contactData in contactsData) {
    const letterArray = contactsData[contactData];
    for (let letterArrayItem of letterArray) {
      let currStr = `${letterArrayItem.name}${letterArrayItem.vacancy}${letterArrayItem.phone}`;
      if (resStr === currStr) {
        return true;
      }
    }
  }
  return false;
}

//Добавление контатка

function addContact(contact: Contact) {
  const currLetter = contact.name.slice(0, 1);
  const currArray = contactsData[currLetter];
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
  const contact = creatContact(
    e,
    inputName.value,
    inputVacancy.value,
    inputPhone.value
  );
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

const renderList =
  (document.querySelector(".main__contacts--certain") as HTMLDivElement) ||
  null;

function renderContacts(letter: string | null) {
  while (renderList.firstChild) {
    renderList.removeChild(renderList.firstChild);
  }

  if (letter === null) {
    renderList.innerHTML = "";
  } else {
    const letterArray = contactsData[letter];
    for (let letterArrayItem of letterArray) {
      const renderItem = `
      <div data-contact-id="${letterArrayItem.id}" class="main__contact--certain">
        <div class="main__contact--certain-name">
          <span>Name: </span>
          <strong data-contact-name=${letterArrayItem.name}>${letterArrayItem.name}</strong>
        </div>
        <div class="main__contact--certain-vacancy">
          <span>Vacancy: </span>
          <strong>${letterArrayItem.vacancy}</strong>
        </div>
        <div class="main__contact--certain-phone">
          <span>Phone: </span>
          <strong>${letterArrayItem.phone}</strong>
        </div>
          <button data-button-id="${letterArrayItem.id}"  class='main__contact--certain-button--delete'><img src='./images/deleteIcon.svg'></button>
          <button data-button-id-edit='${letterArrayItem.id}' class='main__contact--certain-button--edit'><img src='./images/editIcon.svg'></button>
    </div>`;
      const newElement = document.createElement("div");
      newElement.innerHTML = renderItem;
      renderList.appendChild(newElement);
    }
  }
}

//Нажатие на одну из кнопок с буквами

let letterButtons: NodeListOf<HTMLElement> =
  document.querySelectorAll(".contacts__element");

letterButtons.forEach((letterButton) => {
  letterButton.addEventListener("click", function () {
    if (letterButton.dataset.letter) {
      renderContacts(letterButton.dataset.letter);
    }
  });
});

//Обноление счетчика контакто у каждой буквы

const counterLetters: NodeListOf<HTMLElement> = document.querySelectorAll(
  ".contacts__element--counter"
);

function updateContactCounter(letter: string) {
  counterLetters.forEach((counterLetter) => {
    const dataCounterLetter = counterLetter.dataset.letterCounter;
    if (letter === dataCounterLetter) {
      const currLengthLetterArray = contactsData[letter].length;
      counterLetter.textContent = `${
        currLengthLetterArray === 0 ? "" : currLengthLetterArray
      }`;
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

const buttonShowAll = document.querySelector(
  ".main__contacts--search-button"
) as HTMLButtonElement;
const listAllContacts = document.querySelector(
  ".main__contacts--search-list"
) as HTMLDivElement;

buttonShowAll.addEventListener("click", function () {
  showAllContacts();
});

function showAllContacts() {
  while (listAllContacts.firstChild) {
    listAllContacts.removeChild(listAllContacts.firstChild);
  }
  for (let contactData in contactsData) {
    const letterArray = contactsData[contactData];
    for (let letterArrayItem of letterArray) {
      let renderItem = `
      <div data-contact-id="${letterArrayItem.id}" class="main__contact--certain">
          <div class="main__contact--certain-name">
            <span>Name: </span>
            <strong data-contact-name=${letterArrayItem.name}>${letterArrayItem.name}</strong>
          </div>
          <div class="main__contact--certain-vacancy">
            <span>Vacancy: </span>
            <strong>${letterArrayItem.vacancy}</strong>
          </div>
          <div class="main__contact--certain-phone">
            <span>Phone: </span>
            <strong>${letterArrayItem.phone}</strong>
          </div>
           <button data-button-id="${letterArrayItem.id}" class='main__contact--certain-button--delete'><img src='./images/deleteIcon.svg'></button>
           <button data-button-id-edit='${letterArrayItem.id}' class='main__contact--certain-button--edit'><img src='./images/editIcon.svg'></button>

      </div>
      `;
      const newElement = document.createElement("div");
      newElement.innerHTML = renderItem;
      listAllContacts.appendChild(newElement);
    }
  }
}

// Поиск контактов

const searchInput = document.getElementById("searchInput") as HTMLInputElement;

searchInput?.addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  listAllContacts.innerHTML = "";

  const filteredData = contactsData[
    searchTerm.slice(0, 1).toUpperCase()
  ].filter((item) => item.name.toLowerCase().indexOf(searchTerm) !== -1);

  filteredData.forEach((item) => {
    let renderItem = `
  <div data-contact-id="${item.id}" class="main__contact--certain">
      <div class="main__contact--certain-name">
        <span>Name: </span>
        <strong data-contact-name=${item.name}>${item.name}</strong>
      </div>
      <div class="main__contact--certain-vacancy">
        <span>Vacancy: </span>
        <strong>${item.vacancy}</strong>
      </div>
      <div class="main__contact--certain-phone">
        <span>Phone: </span>
        <strong>${item.phone}</strong>
      </div>
        <button data-button-id="${item.id}" class='main__contact--certain-button--delete'><img src='./images/deleteIcon.svg'></button>
        <button data-button-id-edit='${item.id}' class='main__contact--certain-button--edit'><img src='./images/editIcon.svg'></button>
  </div>
  `;
    const newElement = document.createElement("div");
    newElement.innerHTML = renderItem;
    listAllContacts.appendChild(newElement);
  });
});

//Удаление всех контактов

const buttonDeleteAllContacts = document.getElementById(
  "deleteAllContacts"
) as HTMLButtonElement;

buttonDeleteAllContacts.addEventListener("click", function () {
  deleteAllContacts();
});

function deleteAllContacts() {
  for (let contactData in contactsData) {
    contactsData[contactData].length = 0;
    updateContactCounter(contactData);
    renderContacts(null);
  }
}
