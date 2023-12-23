(() => {
  "use strict";
  var e = {
      861: (e, t, n) => {
        n.d(t, { Z: () => o });
        class o {
          constructor(e, t, n, o, r, a) {
            (this._id = e),
              (this._headline = t),
              (this._abstract = n),
              (this._date = o),
              (this._url = r),
              (this._mainArticle = a);
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
            return new Date(this._date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
          }
          get day() {
            const e = new Date(this.formattedDate);
            return (
              e.getDay(),
              [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ][e.getDay()]
            );
          }
          getInputDate() {
            const e = new Date(this._date);
            return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(
              2,
              "0"
            )}-${String(e.getDate()).padStart(2, "0")}`;
          }
          get url() {
            return this._url;
          }
          get mainArticle() {
            return this._mainArticle;
          }
          get htmlString() {
            return `\n    <li>\n    <h5> \n      ${this.headline}\n    </h5>\n    <p>${this._abstract}</p>\n    <p>${this._mainArticle}</p>\n    <button class="edit" data-id="${this._id}">Edit article</button>\n    <button onclick=" window.open('${this._url}','_blank')" >Full article</button>\n    <button><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m354-247 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-80l65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Zm247-350Z"/></svg></button>\n    <button class="delete" data-id=${this._id}><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg></button>\n  </li>\n    `;
          }
        }
      },
      94: (e, t, n) => {
        n.d(t, { Z: () => o });
        class o {
          constructor(e, t, n, o) {
            (this._headline = e),
              (this._abstract = n),
              (this._date = t),
              (this._mainArticle = o);
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
      },
    },
    t = {};
  function n(o) {
    var r = t[o];
    if (void 0 !== r) return r.exports;
    var a = (t[o] = { exports: {} });
    return e[o](a, a.exports, n), a.exports;
  }
  (n.d = (e, t) => {
    for (var o in t)
      n.o(t, o) &&
        !n.o(e, o) &&
        Object.defineProperty(e, o, { enumerable: !0, get: t[o] });
  }),
    (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
    (() => {
      var e = n(861),
        t = n(94);
      console.log("index.js loaded");
      let o,
        r = 0,
        a = [],
        l = !1,
        s = document.querySelector(".loader");
      const c = document.querySelector(".leftBar"),
        i = document.querySelector(".rightBar"),
        d = document.querySelector(".revealerRight"),
        u = document.querySelector("#search"),
        h = document.querySelector(".requestLoader"),
        g = document.querySelector("#requestType");
      let m, y, f, v, p, S;
      console.warn(m);
      let D = [];
      const w = {
        init: function () {
          console.log("app initialized"),
            this.fetchArticles(),
            this.adjustDateByCalendar(),
            this.form(),
            this.eventListeners();
        },
        fetchArticles: async function () {
          try {
            const t = await fetch("http://localhost:3000/api/articles");
            (await t.json()).forEach((t) => {
              a.push(
                new e.Z(
                  t._id,
                  t.headline,
                  t.abstract,
                  t.data,
                  t.url,
                  t.mainArticle || ""
                )
              );
            }),
              this.getToday();
          } catch (e) {
            console.error("Error:", e),
              console.log(s),
              (s.innerHTML = "<h1>An error has occured, please try again</h1>");
          }
        },
        adjustDate: function (e) {
          console.log(e);
          let t = new Date(e);
          t.setDate(t.getDate() + r);
          const n = t.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          console.log(n);
          let o = new Date(n);
          o.getDay();
          (document.querySelector(".date").innerHTML = `<pans>${
            [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ][o.getDay()]
          }<span> ${n}`),
            o.getDay(),
            (m = n);
          let a = `${m}`,
            l = this.formatBarDate(m, -1),
            s = this.formatBarDate(m, 1);
          (c.innerHTML = `\n<h4>\n  ${l}\n</h4>\n</div>\n`),
            (i.innerHTML = `\n<h4>\n  ${s}\n</h4>\n</div>\n`),
            console.log(a),
            this.filterArticlesByDate(a);
        },
        adjustDateByCalendar: function () {
          const e = document.querySelector(".calendar");
          this.getDateForCalendar(m),
            e.addEventListener("change", function () {
              console.log("testRevealer"),
                (d.style.transform = "scaleX(18)"),
                (i.style.transform = "translateX(-85vw)"),
                setTimeout(() => {
                  console.warn("timeout"),
                    (d.style.transform = "scaleX(1)"),
                    (i.style.transform = "translate(0)"),
                    console.log("changed"),
                    (l = !0),
                    console.log(e.value);
                  let t = e.value;
                  (t = w.formatBarDate(t, 0)),
                    (r = 0),
                    console.log(r),
                    console.log("test"),
                    w.filterArticlesByDate(t),
                    console.warn("looping"),
                    w.adjustDate(t);
                }, 1200);
            });
        },
        formatBarDate: function (e, t) {
          let n = new Date(e);
          return (
            n.setDate(n.getDate() + t),
            n.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          );
        },
        filterArticlesByDate: function (e) {
          console.log(e),
            (D = a.filter((t) => t.formattedDate == e)),
            this.renderArticles(D);
        },
        getDateForCalendar: function (e) {
          const t = new Date(e);
          return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(
            2,
            "0"
          )}-${String(t.getDate()).padStart(2, "0")}`;
        },
        getToday: function () {
          let e;
          (u.value = ""),
            setTimeout(() => {
              if (l)
                (o = document.querySelector(".calendar").value),
                  (e = o),
                  console.warn(o),
                  console.warn(e);
              else {
                (o = new Date()), console.log(o, typeof o);
                const t = { month: "long", day: "numeric" };
                (o = o.toLocaleDateString("en-US", t)), (e = `${o}, 1939`);
              }
              console.log(e), this.adjustDate(e);
            }, 1e3);
        },
        eventListeners: function () {
          const e = document.querySelector("#next"),
            n = document.querySelector(".revealerLeft"),
            o = document.querySelector("#previous");
          document.querySelector("#submit"),
            e.addEventListener("click", function () {
              (d.style.transform = "scaleX(18)"),
                (i.style.transform = "translateX(-85vw)"),
                setTimeout(() => {
                  (d.style.transform = "scaleX(1)"),
                    (i.style.transform = "translate(0)");
                }, 1200),
                r++,
                console.log(r),
                console.log("clicked"),
                w.getToday();
            }),
            o.addEventListener("click", function () {
              (n.style.transform = "scaleX(18)"),
                (c.style.transform = "translateX(85vw)"),
                setTimeout(() => {
                  (n.style.transform = "scaleX(1)"),
                    (c.style.transform = "translate(0)");
                }, 1200),
                r--,
                w.getToday();
            }),
            document
              .querySelector("form")
              .addEventListener("submit", function (e) {
                (g.innerHTML = "Adding article..."),
                  (h.style.top = "0"),
                  console.log("Form submitted"),
                  e.preventDefault();
                const n = document.querySelectorAll(".formInput");
                console.log(n),
                  console.log(n[0]),
                  console.log(n[1]),
                  console.log(n[2]),
                  console.log(n[3]);
                const o = new t.Z(
                  n[0].value,
                  n[1].value,
                  n[2].value,
                  n[3].value
                );
                w.postArticle(o);
              });
        },
        deleteListener: function () {
          const e = document.querySelectorAll(".delete");
          console.log("test"),
            e.forEach((e) => {
              e.addEventListener("click", function () {
                (h.style.top = "0"), (g.innerHTML = "Deleting article...");
                const t = e.dataset.id;
                w.deleteArticle(t);
              });
            });
        },
        editListener: function () {
          const e = document.querySelectorAll(".edit"),
            t = document.querySelector(".editInputFields"),
            n = document.querySelector(".editBlurBg");
          e.forEach((e) => {
            e.addEventListener("click", function () {
              t.classList.toggle("show"),
                n.classList.toggle("show"),
                (S = e.dataset.id);
              const o = a.find((e) => e.id == S);
              o._date = w.getDateForCalendar(o.getInputDate());
              const r = document.querySelectorAll(".editFormInput");
              (r[0].value = o.headline),
                (r[1].value = o._date),
                (r[2].value = o.abstract),
                (r[3].value = o.mainArticle),
                document.querySelector("#editSubmit"),
                document.querySelector("#editForm"),
                (y = r[0].value),
                (f = r[1].value),
                (v = r[2].value),
                (p = r[3].value),
                console.log(y, f, v, p);
            });
          });
        },
        form: function () {
          const e = document.querySelector(".editInputFields"),
            n = document.querySelector(".editBlurBg"),
            o = document.querySelectorAll(".editFormInput");
          editForm.addEventListener("submit", function (r) {
            (g.innerHTML = "Updating article..."),
              (h.style.top = "0"),
              (y = o[0].value),
              (f = o[1].value),
              (v = o[2].value),
              (p = o[3].value),
              e.classList.toggle("show"),
              n.classList.toggle("show"),
              r.preventDefault(),
              console.log(y, f, v, p);
            const a = new t.Z(y, f, v, p);
            console.log(S),
              console.log(a),
              w.editArticle(S, a),
              console.error("test");
          });
        },
        deleteArticle: function (e) {
          console.log("id:", typeof e),
            console.log(e),
            fetch(`http://localhost:3000/api/articles/${e}`, {
              method: "DELETE",
            })
              .then(async (e) => {
                if (!e.ok) throw new Error(`HTTP error! Status: ${e.status}`);
                try {
                  return await e.json();
                } catch {
                  return {};
                }
              })
              .then((e) => console.log(e))
              .catch((e) => console.error("Error:", e))
              .then(() => {
                (r = 0), (h.style.top = "-100vh"), w.fetchArticles();
              });
        },
        postArticle: function (e) {
          console.log(e),
            fetch("http://localhost:3000/api/articles", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                headline: e.headline,
                abstract: e.abstract,
                data: e.date,
                url: "",
                mainArticle: e.mainArticle,
              }),
            })
              .then((e) => e.json())
              .then((e) => console.log(e))
              .then(() => {
                (r = 0), (h.style.top = "-100vh"), w.fetchArticles();
              });
        },
        editArticle: function (e, t) {
          console.log(e),
            console.log(t.headline),
            console.log(t.abstract),
            console.log(t.date),
            console.log(t.url),
            console.log(t.mainArticle),
            fetch(`http://localhost:3000/api/articles/${e}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                headline: t.headline,
                abstract: t.abstract,
                data: t.date,
                url: "updatedArticle",
                mainArticle: t.mainArticle,
              }),
            })
              .then((e) => e.json())
              .then((e) => console.log(e))
              .then(() => {
                (r = 0), (h.style.top = "-100vh"), w.fetchArticles();
              }),
            console.log(body);
        },
        getSearchTerm: function () {
          u.addEventListener("keypress", function (e) {
            if ("Enter" === e.key) {
              console.log(u.value, "test");
              const e = u.value;
              w.searchArticles(e);
            }
          });
        },
        searchArticles: function (e) {
          const t = D.filter((t) => t.headline.toLowerCase().includes(e));
          this.renderArticles(t);
        },
        renderArticles: function (e) {
          const t = document.querySelector(".articleList");
          (t.innerHTML = ""),
            e.forEach((e) => {
              t.insertAdjacentHTML("beforeend", e.htmlString);
            }),
            console.log(t),
            (s.style.display = "none"),
            this.deleteListener(),
            this.editListener(),
            this.getSearchTerm();
        },
      };
      w.init();
    })();
})();
