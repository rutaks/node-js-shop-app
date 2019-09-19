exports.get404 = (req, res, next) => {
  res.status(404).render("404NotFound", { pageTitle: "Page Not Found" });
};
