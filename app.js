//*=========================================================
//*                     FLAG-APP
//*=========================================================

fetch("https://restcountries.com/v3.1/all")
  .then((res) => {
    if (!res.ok) {
      renderError(`Something went wrong: ${res.status}`);
      throw new Error();
    }
    return res.json();
  })
  .then((data) => renderCountries(data))
  .catch((err) => console.log(err));

const renderError = () => {
  const countryDiv = document.querySelector(".countries");
  countryDiv.innerHTML += `
    <h2>Countries can not fetched</h2>
    <img src="./img/404.png" alt="" />
  `;
};

const renderCountries = (data) => {
  // console.log(data);
  data.forEach((item) => {
    const {
      name: { common },
    } = item;
    // console.log(common);
    // console.log(item);
    const selectMenu = document.querySelector("#list");
    selectMenu.innerHTML += `
    <option style="width: 300px">${common}</option>`;
  });

  document.querySelector(".form-select").addEventListener("change", (e) => {
    // console.log(e.target.value);
    data.filter((data) => {
      // console.log(data);
      const {
        capital,
        currencies,
        flags: { svg },
        languages,
        name: { common },
        region,
        population,
        maps: { googleMaps },
        timezones,
      } = data;
      // console.log(postalCode);
      if (common == e.target.value) {
        // console.log(common);
        const countryDiv = document.querySelector(".countries");
        countryDiv.innerHTML = `
      <div class="card mx-auto m-5 shadow-lg" style="width: 18rem;">
        <img src="${svg}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${common}</h5>
          <p class="card-text">${region}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <i class="fas fa-lg fa-landmark"></i> ${capital}
          </li>
          <li class="list-group-item">
            <i class="fa-solid fa-comments"></i> ${Object.values(languages)}
          </li>
          <li class="list-group-item">
            <i class="fas fa-lg fa-money-bill-wave"></i> ${
              Object.values(currencies)[0].name
            },
            ${Object.values(currencies)[0].symbol}
          </li>
          <li class="list-group-item">
          <i class="fa-solid fa-clock"></i> ${timezones}
          </li>
          <li class="list-group-item">
          <i class="fa-solid fa-sign-hanging"></i> ${population}
          </li>
          <li class="list-group-item text-center">
          <a href="${googleMaps}" target="_blank" alt=""><button class="btn btn-success">Maps</button> </a>
          </li>
        </ul>
      </div>`;
      }
    });
  });
};
