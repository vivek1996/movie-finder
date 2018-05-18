$(document).ready(function() {
  $("select").formSelect();
  $("#date").characterCounter();
});

$("form").submit(function(e) {
  e.preventDefault();

  let name = $("#name").val();
  name = name.replace(/\s+/g, "+");
  let val = $("#searchBy").val();
  let year = $("#date").val();
  //console.log(name, val, year);
  $.ajax({
    url: `http://www.omdbapi.com/?${val}=${name}&y=${year}&plot=full&apikey=b045eb33`,
    success: data => {
      //console.log(data);
      display(data);
    },
    error: data => {
      //console.log(data);
      alert("Try Again");
    },
    timeout: 2500
  });
});

display = data => {
  if (data.Error) {
    alert(data.Error);
  } else {
    $("#info").css("display", "block");
    $("#title").text(`${data.Title} (${data.Year})`);
    $("#plot").text(data.Plot);
    $("#poster").attr("alt", data.Title);
    $("#year").text(data.Year);
    $("#website").attr("href", data.Website);
    $("#rated").text(data.Rated);
    $("#genre").text(data.Genre);
    $("#released").text(`${data.Released} ( ${data.Country} ) `);
    $("#runtime").text(data.Runtime);
    $("#type").text(data.Type);
    $("#votes").text(`(${data.imdbVotes} Votes)`);
    $("#rating").text(`${data.imdbRating}/10`);
    $("#director").html(`<span class="pink-text darken-3" >Director</span> : ${data.Director} `);
    $("#writer").html(`<span class="pink-text darken-3" >Writers</span> : ${data.Writer} `);
    $("#casting").html(`<span class="pink-text darken-3" >Cast</span> : ${data.Actors} `);
    $("#metascore").text(data.Metascore);
    $("#boxoffice").text(data.BoxOffice);
    $("#production").text(data.Production);
    $("#language").text(data.Language);
    if(data.Poster == "N/A" || data.Poster == " "){
      $("#poster").attr("src",`https://fakeimg.pl/350x200/000000/?text=${data.Title}`);
    }else{
      $("#poster").attr("src", data.Poster);
    }
  }
};
