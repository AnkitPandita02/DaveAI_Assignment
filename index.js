const BASE_URL = 'https://staging.iamdave.ai';
const PAGE_SIZE = 6; // Number of cards to display per page
let currentPage = 1; // Track the current page
let isLastPage = false;

const headers = {
    'Content-Type': 'application/json',
    'X-I2CE-ENTERPRISE-ID': 'dave_vs_covid',
    'X-I2CE-USER-ID': 'ananth+covid@i2ce.in',
    'X-I2CE-API-KEY': '0349234-38472-1209-2837-3432434',
};

const app = document.getElementById('list');
const loadMoreButton = document.getElementById('load-next');
const loadPreviousButton = document.getElementById('load-previous');

loadMoreButton.addEventListener('click', loadMoreSuppliers);
loadPreviousButton.addEventListener('click', loadPreviousSuppliers);

function clearSuppliers() {
    while (app.firstChild) {
        app.removeChild(app.firstChild);
    }
}

function loadSuppliers(page) {
    const url = `${BASE_URL}/list/supply?_page_number=${page}&_page_size=${PAGE_SIZE}`;
    fetch(url, { headers })
        .then(response => response.json())
        .then(data => {
            isLastPage = data.is_last;
            clearSuppliers(); // Clear previously loaded suppliers
            renderSuppliers(data.data);
        })
        .catch(error => {
            console.error('Error fetching suppliers:', error);
        });
}

function renderSuppliers(suppliers) {
    suppliers.forEach(supplier => {
        const card = document.createElement('div');
        card.classList.add('supplier-card');
        
        const category = document.createElement('p');
        category.textContent = `Category: ${supplier.category}`;

        const channel = document.createElement('p');
        channel.textContent = `Channel: ${supplier.channel}`;

        const requestDescription = document.createElement('p');
        requestDescription.textContent = `Request Description: ${supplier.request_description}`;

        const contactNumbers = document.createElement('p');
        contactNumbers.textContent = `Contact Numbers: ${supplier.contact_numbers}`;

        const state = document.createElement('p');
        state.textContent = `State: ${supplier.state}`;

        const district = document.createElement('p');
        district.textContent = `District: ${supplier.district}`;

        const sourceTime = document.createElement('p');
        sourceTime.textContent = `Source Time: ${supplier.source_time}`;

        card.appendChild(category);
        card.appendChild(channel);
        card.appendChild(requestDescription);
        card.appendChild(contactNumbers);
        card.appendChild(state);
        card.appendChild(district);
        card.appendChild(sourceTime);

        app.appendChild(card);
    });
}

function loadMoreSuppliers() {
    if (!isLastPage) {
        currentPage++;
        loadSuppliers(currentPage);
        loadPreviousButton.style.display = 'inline-flex';
    } else {
        loadMoreButton.disabled = true;
        loadMoreButton.textContent = 'No More Suppliers';
    }
}

function loadPreviousSuppliers() {
    if (currentPage > 1) {
        currentPage--;
        loadSuppliers(currentPage);
        loadMoreButton.disabled = false;
    }
    if (currentPage === 1) {
        loadPreviousButton.style.display = 'none';
    }
}

// Initial load of suppliers on the first page
loadSuppliers(currentPage);