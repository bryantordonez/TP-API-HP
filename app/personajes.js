const apiUrl = "https://hp-api.onrender.com/api/characters";
const gridSelector = ".grid";

function fetchAndRenderCharacters(url, gridSelector) {
    const $grid = document.querySelector(gridSelector);

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const characters = data;

            const rendercharacters = (characters) => {
                $grid.innerHTML = "";
                characters.forEach((character) => {
                    const emptyImage = "../assets/images/logo.png";
                    const imagen = character.image ? character.image : emptyImage;
                    const house = character.house ? character.house : "unknown";

                    if (character.image || character.hogwartsStudent || character.hogwartsStaff) {
                        $grid.innerHTML += `
                            <div class="card">
                                <div class="card_img">
                                    <img src="${imagen}" alt="${character.name}">
                                </div>
                                <div>
                                    <h3>${character.name}</h3>
                                    <p>Nacimiento: ${character.dateOfBirth ? character.dateOfBirth : "Desconocido"}</p>
                                    <p>Especie: ${character.species}</p>
                                    <p>Casa: ${house}</p>
                                </div>
                            </div>
                        `;
                    }
                });
            };

            rendercharacters(characters);

            const $inputSearch = document.getElementById("search");

            $inputSearch.addEventListener("input", () => {
                const searchValue = $inputSearch.value.toLowerCase();

                const filtercharacters = characters.filter((character) =>
                    character.name.toLowerCase().includes(searchValue)
                );

                rendercharacters(filtercharacters);
            });
        })
        .catch((error) => {
            console.error("Error al obtener los datos:", error);
        });
}

fetchAndRenderCharacters(apiUrl, gridSelector);