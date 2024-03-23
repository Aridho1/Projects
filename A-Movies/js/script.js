function searchMovie() {
  let str = ``;
  $.ajax({
    url: 'http:/'+ '/omdbapi.com',
    type: 'get',
    dataType: 'json',
    data: {
      "apikey" : "4ce85f70",
      "s" : $('#search-input').val()
    },
    success: function (result) {
      if (result.Response == "True") {
        let movies = result.Search;
        
        $.each(movies, function (i, data) {
          str += `
            <div class="col-md-4 mt-3">      
              <div class="card">
                <img src="${data.Poster}" class="card-img-top">
                <div class="card-body">
                  <h5 class="card-title">${data.Title}</h5>
                  <h6 class="card-subtitle mb-2 text-body-secondary">${data.Year}</h6>
                  <a href="#" class="card-link show-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${data.imdbID}">Show Detail</a>
                </div>
              </div>        
            </div>
          `;
        });
      } else {
        str = `
          <div class="col-md-4">
            <h2 class="text-center">${result.Error}</h2>
          </div>
        `;
      }
      $('#movie-list').html(str);
      $('#search-input').val('');
    }
  });
}

$('#search-button').on('click', function () {
  searchMovie();
});

$('#search-input').on('keyup', function (e) {
  if (e.keyCode === 13) {
    searchMovie();
  }
});

$('#movie-list').on('click', '.show-detail', function () {
  
  let str = ``;
  
  $.ajax({
    url: 'http:/'+ '/omdbapi.com',
    type: 'get',
    dataType: 'json',
    data: {
      "apikey" : "4ce85f70",
      "i" : $(this).data("id")
    },
    success: function (movie) {
      
      if (movie.Response == "True") {
      str += `
        <div class="container-fluid>
          <div class="row">
            <div class="col-md-4 mt-2">
              <img src="${movie.Poster}" class="img-fluid">
            </div>
            
            <div class="col-md-8 mt-3">
              
              <ul class="list-group">
                <li class="list-group-item"><h3>${movie.Title}</h3></li>
                <li class="list-group-item">Released : ${movie.Released}</li>
                <li class="list-group-item">Genre : ${movie.Genre}</li>
                <li class="list-group-item">Director : ${movie.Director}</li>
                <li class="list-group-item">Actors : ${movie.Actors}</li>
              </ul>
              
            </div>
          </div>
        </div>
      `;
      
      $('.modal-body').html(str);
      }
    }
  });
  
});
