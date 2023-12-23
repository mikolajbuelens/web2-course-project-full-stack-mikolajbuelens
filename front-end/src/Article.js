export default class Article {
  constructor(id, headline, abstract, date, url, mainArticle) {
    this._id = id;
    this._headline = headline;
    this._abstract = abstract;
    this._date = date;
    this._url = url;
    this._mainArticle = mainArticle;
  }

  get id() {
    return this._id;
  }
  get headline() {
    return this._headline;
  }

  get abstract() {
    return this._abstract;
  }

  get formattedDate() {
    const parsedDate = new Date(this._date);
    const format = { year: "numeric", month: "long", day: "numeric" };
    return parsedDate.toLocaleDateString("en-US", format);
  }

  get day() {
    const formattedDate = new Date(this.formattedDate);
    formattedDate.getDay();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[formattedDate.getDay()];
  }

  getInputDate() {
    const date = new Date(this._date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  get url() {
    return this._url;
  }

  get mainArticle() {
    return this._mainArticle;
  }

  get htmlString() {
    return `
    <li>
    <h5> 
      ${this.headline}
    </h5>
    <p>${this._abstract}</p>
    <p>${this._mainArticle}</p>
    <button class="edit" data-id="${this._id}">Edit article</button>
    <button onclick=" window.open('${this._url}','_blank')" >Full article</button>
    <button><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m354-247 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-80l65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Zm247-350Z"/></svg></button>
    <button class="delete" data-id=${this._id}><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>
  </li>
    `;
  }
}
// class="delete" data-id="${this._id}
