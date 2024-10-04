let items = {
    anime: [],
    kpop: [],
    yaoi: []
};

if (localStorage.getItem('items')) {
    items = JSON.parse(localStorage.getItem('items'));
    displaySavedItems();
    displayCategoryItems('anime');
    displayCategoryItems('kpop');
    displayCategoryItems('yaoi');
}

function addItem(category) {
    let nameInput = document.getElementById(`${category}-name`);
    let priceInput = document.getElementById(`${category}-price`);
    let quantityInput = document.getElementById(`${category}-quantity`);

    let name = nameInput.value;
    let price = parseFloat(priceInput.value);
    let quantity = quantityInput.value;

    if (name && !isNaN(price) && quantity) {
        let newItem = {
            name: name,
            price: price,
            quantity: calculateQuantity(quantity)
        };

        items[category].push(newItem);
        displayCategoryItems(category);
        displaySavedItems();

        // Сохранение в LocalStorage
        localStorage.setItem('items', JSON.stringify(items));

        // Очищаем поля ввода
        nameInput.value = '';
        priceInput.value = '';
        quantityInput.value = '';
    } else {
        alert("Пожалуйста, заполните все поля.");
    }
}

function calculateQuantity(quantityStr) {
    return quantityStr.split('+').reduce((sum, val) => sum + parseInt(val), 0);
}

function displayCategoryItems(category) {
    let ul = document.getElementById(`${category}-items`);
    ul.innerHTML = '';  // Очищаем список для обновления

    items[category].forEach((item, index) => {
        let li = document.createElement('li');
        li.innerHTML = `${index + 1}. ${item.name} — Цена: ${item.price}, Количество: ${item.quantity}`;

        let buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        let editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.textContent = 'Редактировать';
        editButton.onclick = () => editItem(category, index);

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'Удалить';
        deleteButton.onclick = () => deleteItem(category, index);

        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        li.appendChild(buttonContainer);
        ul.appendChild(li);
    });
}

function editItem(category, index) {
    let editedName = prompt("Введите новое название товара:", items[category][index].name);
    let editedPrice = prompt("Введите новую цену товара:", items[category][index].price);
    let editedQuantity = prompt("Введите новое количество товара (например, 10+5):", items[category][index].quantity);

    if (editedName !== null && editedPrice !== null && editedQuantity !== null) {
        items[category][index].name = editedName;
        items[category][index].price = parseFloat(editedPrice);
        items[category][index].quantity = calculateQuantity(editedQuantity);

        displayCategoryItems(category);
        displaySavedItems();

        localStorage.setItem('items', JSON.stringify(items));
    }
}

function deleteItem(category, index) {
    items[category].splice(index, 1);
    displayCategoryItems(category);
    displaySavedItems();

    localStorage.setItem('items', JSON.stringify(items));
}

function deleteAllItems() {
    if (confirm("Вы уверены, что хотите удалить все товары?")) {
        items = { anime: [], kpop: [], yaoi: [] };
        displaySavedItems();
        displayCategoryItems('anime');
        displayCategoryItems('kpop');
        displayCategoryItems('yaoi');

        localStorage.setItem('items', JSON.stringify(items));
    }
}

function displaySavedItems() {
    let savedItemsList = document.getElementById('saved-items');
    savedItemsList.innerHTML = '';

    for (let category in items) {
        items[category].forEach((item) => {
            let li = document.createElement('li');
            li.innerHTML = `Категория: ${category} — ${item.name}, Цена: ${item.price}, Количество: ${item.quantity}`;
            savedItemsList.appendChild(li);
        });
    }
}
