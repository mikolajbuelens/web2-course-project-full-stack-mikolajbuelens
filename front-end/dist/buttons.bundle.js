(() => {
  const e = document.querySelector("#addArticle"),
    t = document.querySelector("#cancel"),
    s = document.querySelector("#editCancel"),
    c = document.querySelector(".editInputFields"),
    o = document.querySelector(".inputFields"),
    l = document.querySelector(".blurBg"),
    n = document.querySelector(".editBlurBg");
  document.getElementById("form"),
    e.addEventListener("click", function () {
      o.classList.toggle("show"), l.classList.toggle("show");
    }),
    t.addEventListener("click", function () {
      o.classList.toggle("show"), l.classList.toggle("show");
    }),
    l.addEventListener("click", function () {
      o.classList.toggle("show"), l.classList.toggle("show");
    }),
    n.addEventListener("click", function () {
      c.classList.toggle("show"), n.classList.toggle("show");
    }),
    s.addEventListener("click", function () {
      document.querySelector(".editInputFields").classList.toggle("show"),
        n.classList.toggle("show");
    });
})();
