const loadPhone = async(searchText) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  const phones = data.data
  displayPhones(phones)
}

const displayPhones = phones => {
  // console.log(phones.length)
  
  // 1. get the container
  const phoneContainer = document.getElementById('phone-container');
  // clear phone container cards before adding new card
  phoneContainer.textContent = '';

  // display show all button if there are more than 12 phones
  const showAllContainer = document.getElementById('show-all-container');
  if(phones.length > 12){
    showAllContainer.classList.remove('hidden')
  }
  else{
    showAllContainer.classList.add('hidden')
  }

  // display first 12 phones only
  phones = phones.slice(0,12);

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
}

// handle search button
const handleSearch = () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  // console.log(searchText)
  loadPhone(searchText)
}