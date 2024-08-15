const loadPhone = async(searchText, isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data
  displayPhones(phones, isShowAll)
}

const displayPhones = (phones, isShowAll) => {
  // console.log(phones.length)
  
  // 1. get the container
  const phoneContainer = document.getElementById('phone-container');
  // clear phone container cards before adding new card
  phoneContainer.textContent = '';

  // display 'Show All' button if there are more than 12 phones
  const showAllContainer = document.getElementById('show-all-container');
  if(phones.length > 12 && !isShowAll){
    showAllContainer.classList.remove('hidden')
  }
  else{
    showAllContainer.classList.add('hidden')
  }

  // display first 12 phones only, if not showAll
  if (!isShowAll) {
    phones = phones.slice(0,12);
    // console.log('is show all', isShowAll)
  }

  phones.forEach( phone => {
    // 2. create a div
    const phoneCard = document.createElement('div');
    phoneCard.classList = 'card bg-base-100 w-96 shadow-xl';
    // 3. set inner html
    phoneCard.innerHTML = `
      <figure>
        <img
          src="${phone.image}" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Buy Now</button>
        </div>
      </div>
    `;
    // 4. append child
    phoneContainer.appendChild(phoneCard)
  });
  // hide loading spinner
  toggleSpinner(false);
}

// handle search button
const handleSearch = (isShowAll) => {
  toggleSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  // console.log(searchText)
  loadPhone(searchText, isShowAll)
}

const toggleSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if (isLoading) {
    loadingSpinner.classList.remove('hidden');
  }
  else {
    loadingSpinner.classList.add('hidden');
  }
}

// handle showAll
const handleShowAll = () => {
  handleSearch(true)
}