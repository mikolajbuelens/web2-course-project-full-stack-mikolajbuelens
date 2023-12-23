export default class UserArticle {
  constructor(headline,date, abstract,  mainArticle) {
    this._headline = headline;
    this._abstract = abstract;
    this._date = date;
    this._mainArticle = mainArticle;
  }
  get headline() {
    return this._headline;
  }
  get abstract() {
    return this._abstract;
  }
  get date() {
    return this._date;
  }
  get mainArticle() {
    return this._mainArticle;
  }
}
