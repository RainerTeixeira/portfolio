$(document).ready(function () {
  var searchExpanded = false;
  $(".search-icon").click(function () {
    if (!searchExpanded) {
      $(".search-input").removeClass("entrada-de-pesquisa-oculta");
      $(".navbar").addClass("expansao-da-pesquisa");
      $(".search-input").focus();
      searchExpanded = true;
    } else {
      $(".search-input").addClass("entrada-de-pesquisa-oculta");
      $(".navbar").removeClass("expansao-da-pesquisa");
      searchExpanded = false;
    }
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest(".search-input, .search-icon").length) {
      $(".search-input").addClass("entrada-de-pesquisa-oculta");
      $(".navbar").removeClass("expansao-da-pesquisa");
      searchExpanded = false;
    }
  });
});
