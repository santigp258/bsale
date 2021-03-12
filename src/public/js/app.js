const getElements = async () => {
  const res = await fetch("api/");
  const data = await res.json();
  return data;
};

//paginator
let pageNumber = 1; //initial page
let pageSize = 8; //elements por page
let dataApi = getElements(); //API data

const paginate = (array, page_size, page_number) => {
  return array.slice((page_number - 1) * page_size, page_number * page_size); //data interval
};

const nextPage = () => {
  pageNumber++;
  showElements(dataApi);
};
const previousPage = () => {
  pageNumber--;
  showElements(dataApi);
};

const showCategories = async () => {
  //categories
  const res = await fetch("api/category");
  const categories = await res.json();

  //create option for select
  categories.map((res) => {
    let content = document.createElement("option"); //option element
    content.value = res.id;
    textContent = document.createTextNode(res.name);
    content.appendChild(textContent);
    document.querySelector("select").appendChild(content);
  });
};

const showElements = async (data) => {
  const dataApi = await data;
  let pagination = paginate(dataApi, pageSize, pageNumber);
  const coursesDiv = document.querySelector("#courses"); //courses Div
  let pageCont = Math.ceil(dataApi.length / pageSize); //round out

  //show categories
  let indexPagination = dataApi.indexOf(pagination[0]); //data index
  const childCategories = document.querySelector(".length-data");
  //create child
  const divCategories = document.querySelector(".select_content");
  let paragraph = document.createElement("p"); // paragraph element
  paragraph.classList.add("length-data"); //add class
  let contentParagraph = document.createTextNode(`
    Mostrando ${indexPagination + 1}–${
    indexPagination + pagination.length
  } de ${dataApi.length} resultados
  `); //content
  paragraph.appendChild(contentParagraph); //append to parent

  childCategories && divCategories.removeChild(childCategories); //delete if true

  divCategories.appendChild(paragraph); //add  paragraph element
  /* prevent url_image undefined */
  const urlDefault =
    "https://www.sinrumbofijo.com/wp-content/uploads/2016/05/default-placeholder.png";

  //clean courses
  let content = "";
  pagination.map(({ url_image, name, price }) => {
    content += `
      <div class="curso">
      <img class="imagen-curso" src="${url_image || urlDefault}" />
      <div class="info-curso">
        <h4>${name}</h4>
        <div class="precio">
          <p class="oferta">$${price}</p>
        </div>
        <a href="#" class="boton" data-id="1">Agregar Al Carrito</a>
      </div>
      </div>
          `;
  });
  //delete next o previous
  content += '<div class="paginate">';
  content +=
    pageNumber > 1 ? " <button onclick='previousPage()'>Anterior</button>" : "";
  content +=
    pageNumber < pageCont
      ? " <button onclick='nextPage()'>Siguiente</button>"
      : "";
  content += "</div>";
  coursesDiv.innerHTML = content;
};


const change = async (e) => {
    const optionSelected = e.target.value;
    if (optionSelected.trim() !== "") {
        const res = await fetch(`/api/category/${optionSelected}`);
        const data = await res.json();
        showElements(data);
    }else{
        showElements(dataApi); //call function if select default option
    }
};

//call functions
showElements(dataApi);
showCategories();
