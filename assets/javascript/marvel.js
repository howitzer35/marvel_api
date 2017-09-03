(function() {

  $(function(){

    let searchButton = $("#searchButton");
    let searchTerm = $("#searchTerm");
    let characterList = $("#characterList");


    let characterURL = "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=548da005e998f336a1e25e35e76b8d94&hash=5715dce6f641aa0279eb8b5f2111ec85"

    function getCharacters(url) {

    $.get(url, function(data){

      let characters = data.data.results;

      characterList.html("");

        $.each(characters, function(index, character){
      //in the parens, those can be potato
          //the ` ` tick is an ES6 method of writing multi-line strings more easily, instead of putting it all on one hella-big line
          characterList.append(`
            <tr>
              <td>${character.name}</td>
              <td>
                <img src="${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}" alt="${character.name}" />
              </td>
            </tr>
            `)
          //standard_fantastic - this makes the size of the pictures waaay better, otherwise they're HUGE
        })
      })
    }


    getCharacters(characterURL);

    searchButton.click(function(event) {

          //wtf: @see http://api.jquery.com/click/ - look at the handler parameter
          event.preventDefault();

          // ? if(searchTerm.val() == "") {
          let searchURL = characterURL;
          if(searchTerm.val() !== "") {
            searchURL += "&nameStartsWith=" + searchTerm.val()
          }

          getCharacters(searchURL);
      })

  })
})();
