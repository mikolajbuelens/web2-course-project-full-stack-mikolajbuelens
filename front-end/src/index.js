console.log("index.js loaded");
// let today = "";
let userDate = 0;
let articles = [];
let today;
let calendarUsed = false;
let loader = document.querySelector(".loader");
const leftBar = document.querySelector(".leftBar");
const rightBar = document.querySelector(".rightBar");
const revealerRight = document.querySelector(".revealerRight");
const searchInput = document.querySelector("#search");
const requestLoader = document.querySelector(".requestLoader");
const requestType = document.querySelector("#requestType");
let currentDate;
// global variables for the edit form (=> PUT request),
// prevents the addEventListener from being called multiple
// times when rendering a new set of articles
let input1;
let input2;
let input3;
let input4;
let editId;
//--------------------------
console.warn(currentDate);
// let today = new Date();
import Article from "./Article.js";
import UserArticle from "./UserArticle.js";
// Fetching data from local JSON file (placeholder data)
// fetch("../placeholder.json")
//   .then((response) => response.json())
//   .then((data) => console.log(data));

// TODO: add filters/search (keywords, date, etc.)
// TODO: full crud functionality(post, put, delete)
// TODO: improve edit button to each article (put/delete request)
// TODO: add local storage to save articles
// TODO: improve design/animation
// TODO: add wheather API(?) to display weather for selected date
// TODO: replace image with other feature if possible(?)

let filteredArticles = [];

const app = {
  init: function () {
    console.log("app initialized");
    this.fetchArticles();
    this.adjustDateByCalendar(); // call in init to prevent loop
    this.form();
    this.eventListeners();
  },
  fetchArticles: async function () {
    try {
      const response = await fetch(`http://localhost:3000/api/articles`);
      const parsedData = await response.json();
      parsedData.forEach((object) => {
        articles.push(
          new Article(
            object._id,
            object.headline,
            object.abstract,
            object.data,
            object.url,
            object.mainArticle || ""
          )
        );
      });

      // console.log(articles);
      this.getToday();
    } catch (error) {
      console.error("Error:", error);
      console.log(loader);
      loader.innerHTML = `<h1>An error has occured, please try again</h1>`;
    }
  },

  adjustDate: function (dateString) {
    // let selectedDate = new Date(articles[0].formattedDate);
    console.log(dateString);
    let selectedDate = new Date(dateString);
    const format = { year: "numeric", month: "long", day: "numeric" };
    selectedDate.setDate(selectedDate.getDate() + userDate);
    const adjustedDate = selectedDate.toLocaleDateString("en-US", format);
    console.log(adjustedDate);
    let adjustedday = new Date(adjustedDate);
    adjustedday.getDay();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dateContainer = document.querySelector(".date");
    dateContainer.innerHTML = `<pans>${
      days[adjustedday.getDay()]
    }<span> ${adjustedDate}`;
    let currentDay = days[adjustedday.getDay()];
    currentDate = adjustedDate;
    let filterDate = `${currentDate}`;
    let leftBarDate = this.formatBarDate(currentDate, -1);
    let rightBarDate = this.formatBarDate(currentDate, 1);
    leftBar.innerHTML = `
<h4>
  ${leftBarDate}
</h4>
</div>
`;

    rightBar.innerHTML = `
<h4>
  ${rightBarDate}
</h4>
</div>
`;

    console.log(filterDate);
    // this.adjustDateByCalendar(currentDate);
    this.filterArticlesByDate(filterDate);
  },

  adjustDateByCalendar: function () {
    const calendar = document.querySelector(".calendar");
    const calendarDate = this.getDateForCalendar(currentDate);

    calendar.addEventListener("change", function () {
      console.log("testRevealer");
      revealerRight.style.transform = "scaleX(18)";
      rightBar.style.transform = "translateX(-85vw)";
      setTimeout(() => {
        console.warn("timeout");
        revealerRight.style.transform = "scaleX(1)";
        rightBar.style.transform = "translate(0)";

        console.log("changed");
        calendarUsed = true;
        console.log(calendar.value);
        let filterDate = calendar.value;
        filterDate = app.formatBarDate(filterDate, 0);
        userDate = 0;
        console.log(userDate);
        console.log("test");
        app.filterArticlesByDate(filterDate);
        console.warn("looping");
        app.adjustDate(filterDate);
      }, 1200);
    });
  },

  // get date for left/right bar
  formatBarDate: function (date, x) {
    let selectedDate = new Date(date);
    const format = { year: "numeric", month: "long", day: "numeric" };
    selectedDate.setDate(selectedDate.getDate() + x);
    return selectedDate.toLocaleDateString("en-US", format);
  },

  filterArticlesByDate: function (filterDate) {
    console.log(filterDate);
     filteredArticles = articles.filter((article) => {
      return article.formattedDate == filterDate;
    });
    this.renderArticles(filteredArticles);
  },

  getDateForCalendar: function (dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  },

  //? removeLoader: function () {},

  getToday: function () {
    searchInput.value = "";
    let dateString;
    setTimeout(() => {
      if (calendarUsed) {
        today = document.querySelector(".calendar").value;
        dateString = today;
        console.warn(today);
        console.warn(dateString);
      } else {
        today = new Date();
        console.log(today, typeof today);
        const format = { month: "long", day: "numeric" };
        today = today.toLocaleDateString("en-US", format);
        dateString = `${today}, 1939`;
      }

      console.log(dateString);
      this.adjustDate(dateString);
    }, 1000);
  },

  // --------------------------EVENT LISTENERS--------------------------
  // rightBarAnimation: function () {
  //
  // },

  eventListeners: function () {
    const nextButton = document.querySelector("#next");
    const revealerLeft = document.querySelector(".revealerLeft");
    const previousButton = document.querySelector("#previous");
    const submitButton = document.querySelector("#submit");

    nextButton.addEventListener("click", function () {
      revealerRight.style.transform = "scaleX(18)";
      rightBar.style.transform = "translateX(-85vw)";
      setTimeout(() => {
        revealerRight.style.transform = "scaleX(1)";
        rightBar.style.transform = "translate(0)";
      }, 1200);
      userDate++;
      console.log(userDate);
console.log('clicked');
      app.getToday();
    });

    previousButton.addEventListener("click", function () {
      revealerLeft.style.transform = "scaleX(18)";
      leftBar.style.transform = "translateX(85vw)";
      setTimeout(() => {
        revealerLeft.style.transform = "scaleX(1)";
        leftBar.style.transform = "translate(0)";
      }, 1200);
      userDate--;
      app.getToday();
    });

    document.querySelector("form").addEventListener("submit", function (event) {
      requestType.innerHTML = "Adding article...";
      requestLoader.style.top = "0";
      console.log("Form submitted");
      event.preventDefault();
      const inputs = document.querySelectorAll(".formInput");
      console.log(inputs);
      console.log(inputs[0]);
      console.log(inputs[1]);
      console.log(inputs[2]);
      console.log(inputs[3]);

      // console.log(
      //   inputs[1].value, //headline
      //   inputs[2].value, //date
      //   inputs[3].value, //abstract
      //   inputs[4].value //mainArticle
      // );
      const newArticle = new UserArticle(
        inputs[0].value, //headline
        inputs[1].value, //date
        inputs[2].value, //abstract
        inputs[3].value //mainArticle
      );
      app.postArticle(newArticle);

      // console.log(inputDate[0].value);

      // app.adjustDate(inputDate);
    });

    // });
  },

  deleteListener: function () {
    const deleteButtons = document.querySelectorAll(".delete");
    console.log("test");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", function () {
        requestLoader.style.top = "0";
        requestType.innerHTML = "Deleting article...";
        const id = button.dataset.id;
        app.deleteArticle(id);
      });
    });
  },

  editListener: function () {
    const editButtons = document.querySelectorAll(".edit");
    const editInputFields = document.querySelector(".editInputFields");
    const editBlurBg = document.querySelector(".editBlurBg");

    editButtons.forEach((button) => {
      button.addEventListener("click", function () {
        editInputFields.classList.toggle("show");
        editBlurBg.classList.toggle("show");
        editId = button.dataset.id;
        const selectedArticle = articles.find(
          (article) => article.id == editId
        );
        // console.log(id);
        selectedArticle._date = app.getDateForCalendar(
          selectedArticle.getInputDate()
        );
        const inputs = document.querySelectorAll(".editFormInput");
        inputs[0].value = selectedArticle.headline;
        inputs[1].value = selectedArticle._date;
        inputs[2].value = selectedArticle.abstract;
        inputs[3].value = selectedArticle.mainArticle;
        const submitButton = document.querySelector("#editSubmit");
        const editForm = document.querySelector("#editForm");
        input1 = inputs[0].value;
        input2 = inputs[1].value;
        input3 = inputs[2].value;
        input4 = inputs[3].value;
        console.log(input1, input2, input3, input4);
      });
    });
  },

  form: function () {
    const editInputFields = document.querySelector(".editInputFields");
    const editBlurBg = document.querySelector(".editBlurBg");
    const inputs = document.querySelectorAll(".editFormInput");
    editForm.addEventListener("submit", function (event) {
      requestType.innerHTML = "Updating article...";
      requestLoader.style.top = "0";
      input1 = inputs[0].value;
      input2 = inputs[1].value;
      input3 = inputs[2].value;
      input4 = inputs[3].value;

      editInputFields.classList.toggle("show");
      editBlurBg.classList.toggle("show");
      event.preventDefault();
      console.log(input1, input2, input3, input4);
      const uppdatedArticle = new UserArticle(
        input1, //headline
        input2, //date
        input3, //abstract
        input4 //mainArticle
      );
      console.log(editId);
      console.log(uppdatedArticle);
      app.editArticle(editId, uppdatedArticle);
      // console.log(uppdatedArticle);
      console.error("test");
      // editForm.reset();
    });
  },

  // -----------------CRUD FUNCTIONALITY (POST/DELETE/PUT)-----------------

  deleteArticle: function (id) {
    console.log("id:", typeof id);
    console.log(id);
    fetch(`http://localhost:3000/api/articles/${id}`, {
      method: "DELETE",
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        try {
          return await response.json();
        } catch {
          return {};
        }
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error))
      .then(() => {
        userDate = 0;
        requestLoader.style.top = "-100vh";
        app.fetchArticles();

      });
  },

  postArticle: function (newArticle) {
    console.log(newArticle);
    fetch("http://localhost:3000/api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        headline: newArticle.headline,
        abstract: newArticle.abstract,
        data: newArticle.date,
        url: "",
        mainArticle: newArticle.mainArticle,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => {
        userDate = 0;
        requestLoader.style.top = "-100vh";
        app.fetchArticles();
      });
  },

  editArticle: function (id, updatedArticle) {
    console.log(id);
    console.log(updatedArticle.headline);
    console.log(updatedArticle.abstract);
    console.log(updatedArticle.date);
    console.log(updatedArticle.url);
    console.log(updatedArticle.mainArticle);
    fetch(`http://localhost:3000/api/articles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        headline: updatedArticle.headline,
        abstract: updatedArticle.abstract,
        data: updatedArticle.date,
        url: "updatedArticle",
        mainArticle: updatedArticle.mainArticle,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(() => {
        userDate = 0;
        requestLoader.style.top = "-100vh";
        app.fetchArticles();
      });
    console.log(body);
  },

  // --------------------------RENDERING/FILTERING--------------------------

  getSearchTerm: function () {
    // const searchInput = document.querySelector("#search");
    searchInput.addEventListener("keypress", function (event) {
      if(event.key === 'Enter'){
        console.log(searchInput.value, 'test');
        const searchTerm = searchInput.value;
        app.searchArticles(searchTerm);
  
      }
    });
  },

  searchArticles: function (searchTerm) {
    const searchedArticle = filteredArticles.filter((article) => {
      return article.headline.toLowerCase().includes(searchTerm);
    });
    this.renderArticles(searchedArticle);
  },

  // ------------------------------------------------------------------------
  renderArticles: function (filteredArticles) {
    const articleContainer = document.querySelector(".articleList");
    articleContainer.innerHTML = "";
    filteredArticles.forEach((article) => {
      articleContainer.insertAdjacentHTML("beforeend", article.htmlString);
    });
    // articleContainer.insertAdjacentHTML("beforeend", articles.htmlString);
    console.log(articleContainer);
    loader.style.display = "none";
    this.deleteListener();
    this.editListener();
    this.getSearchTerm();

  },
};

app.init();
