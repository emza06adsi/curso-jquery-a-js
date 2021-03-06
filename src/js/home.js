// ............0

(async function load() {
  async function getData(url) {
    let response = await fetch(url)
    let data = await response.json()
    return data;
  }
  let $home = document.getElementById('home');
  let $form = document.getElementById('form');
  let $featuringContainer = document.getElementById('featuring');
  // let $featuringContainer=document.getElementById('animation');
  function setAttributes($element, attributes) {
    for (const attribute in attributes) {
      $element.setAttribute(attribute, attributes[attribute]);
    }
  }

const BASE_API='https://yts.lt/api/v2/';

function featuringTemplate(peli) {
      return (
        `
        <div class="featuring">
          <div class="featuring-image">
            <img src=" ${peli.medium_cover_image}" width="70" height="100" alt="">
          </div>
          <div class="featuring-content">
            <p class="featuring-title">Pelicula encontrada</p>
            <p class="featuring-album">${peli.title}</p>
          </div>
        </div>
        `
      )
    }

  $form.addEventListener('submit', async(event) => {
    event.preventDefault();
    home.classList.add('search-active')
    let $loader = document.createElement('img');
    setAttributes($loader, {
      src: 'src/images/loader.gif',
      height: 50,
      whith: 50
    })  
    $featuringContainer.append($loader);
    // let  data =new FormData($form); 
    // let peli=await getData(`https://yts.lt/api/v2/list_movies.json?limit=1&query_term=${data.get('name')}`)
    // let htmlString= featuringTemplate(peli.data.movies[0])
    // $featuringContainer.innerHTML=htmlString 
 //  debugger 
 const data = new FormData($form);
    try {
      const {
        data: {
          movies: pelis
        }
      } = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`)

      const HTMLString = featuringTemplate(pelis[0]);
      $featuringContainer.innerHTML = HTMLString;
    } catch(error) {
      alert(error.message);
      $loader.remove();
      $home.classList.remove('search-active');
    } 
  })


  let actionList = await getData(`${BASE_API}list_movies.json?genre=action`);
  let dramaList = await getData(`${BASE_API}list_movies.json?genre=drama`);
  let animationList = await getData(`${BASE_API}list_movies.json?genre=animation`);
  let $action = document.querySelector('#action');
  let $drama = document.getElementById('drama');
  let $animation = document.getElementById('animation');

  let HTMLString = ``;
  let movieElement;
  function videoItemTemplate(movie) {
    HTMLString = ``;
    for (i = 0; i < movie.data.movies.length; i++) {
      // =videoItemTemplate(actionList.data.movies[0]);
      HTMLString += `
    <div class="">
      <div class="featuring-image">
        <img src="${movie.data.movies[i].medium_cover_image}" width="130" height="160" alt="">
      </div>
      <div class="featuring-content">
        <p class="featuring-title">${movie.data.movies[i].title}</p>
        <p class="featuring-album"></p>
      </div>
    </div>
    `}
    return (HTMLString)

  }
  function addEventClick($element) {
    $element.addEventListener('click', function () {
      showModal()
      // alert('click');
    });
    // $element.addEventListener('click',function(){
    // alert('click');
    // })
  }
  function createTemplate(HTMLString, container) {
    container.children[0].remove();
    // img=document.getElementById('img_').value;
    // img.children[0].remuve(); 
    let html = document.implementation.createHTMLDocument();
    html.body.innerHTML = HTMLString;
    // debugger

    for (i = 0; i < html.body.children.length; i++) {
      movieElement = html.body.children[0];
      container.append(movieElement);
      addEventClick(movieElement);
      // $action.append(html.body.children[1]);
      // $action.append(html.body.children[2]);
      // $action.append(html.body.children[3]);

    }
  }


  function renderizar(lista, tipo) {

    videoItemTemplate(lista)
    createTemplate(HTMLString, tipo);

  }
  renderizar(actionList, $action)
  renderizar(dramaList, $drama)
  renderizar(animationList, $animation)
  // debugger;
  //   console.log(data)  // await
  let $modal = document.getElementById('modal');
  let $overlay = document.getElementById('overlay');
  let $hideModal = document.getElementById('hide-modal');
  // let $animationContainer=document.getElementById('animation');
 
  // let $modalTite=$modal.querySelector('h1');
  // let $modalImage=$modal.querySelector('img');
  // let $modalDescription=$modal.querySelector('p');



  function showModal() {
    $overlay.classList.add('active');
    $modal.style.animation = 'modalIn .8s forwards';
    // style.animation='modalIn .8s forwars'
  }

  $hideModal.addEventListener('click', removemodal);
  function removemodal() {
    $overlay.classList.remove('active');
    $modal.style.animation = 'modalOut .8s forwards';
    // alert(ds);  
  }





  // function videoItemTemplate(src,image) {
  //   return (
  //     `
  //       <div class="featuring">
  //         <div class="featuring-image">
  //           <img src="${src}" width="70" height="100" alt="">
  //         </div>
  //         <div class="featuring-content">
  //           <p class="featuring-title">${image}</p>
  //           <p class="featuring-album"></p>
  //         </div>
  //       </div>
  //       `
  //  )
  // }
  // // console.log(videoItemTemplate('src/images/platzi-video.png','platzi'))


})()




































































































































// (async function load() {
//   // await
//   // action
//   // terror
//   // animation
//   async function getData(url) {
//     const response = await fetch(url);
//     const data = await response.json();
//     if (data.data.movie_count > 0) {
//       // aquí se acaba
//       return data;
//     }
//     // si no hay pelis aquí continua
//     throw new Error('No se encontró ningun resultado');
//   }
//   const $form = document.getElementById('form');
//   const $home = document.getElementById('home');
//   const $featuringContainer = document.getElementById('featuring');


//   function setAttributes($element, attributes) {
//     for (const attribute in attributes) {
//       $element.setAttribute(attribute, attributes[attribute]);
//     }
//   }
//   const BASE_API = 'https://yts.am/api/v2/';

//   function featuringTemplate(peli) {
//     return (
//       `
//       <div class="featuring">
//         <div class="featuring-image">
//           <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
//         </div>
//         <div class="featuring-content">
//           <p class="featuring-title">Pelicula encontrada</p>
//           <p class="featuring-album">${peli.title}</p>
//         </div>
//       </div>
//       `
//     )
//   }

//   $form.addEventListener('submit', async (event) => {
//     event.preventDefault();
//     $home.classList.add('search-active')
//     const $loader = document.createElement('img');
//     setAttributes($loader, {
//       src: 'src/images/loader.gif',
//       height: 50,
//       width: 50,
//     })
//     $featuringContainer.append($loader);

//     const data = new FormData($form);
//     try {
//       const {
//         data: {
//           movies: pelis
//         }
//       } = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`)

//       const HTMLString = featuringTemplate(pelis[0]);
//       $featuringContainer.innerHTML = HTMLString;
//     } catch(error) {
//       alert(error.message);
//       $loader.remove();
//       $home.classList.remove('search-active');
//     }
//   })

//   function videoItemTemplate(movie, category) {
//     return (
//       `<div class="primaryPlaylistItem" data-id="${movie.id}" data-category=${category}>
//         <div class="primaryPlaylistItem-image">
//           <img src="${movie.medium_cover_image}">
//         </div>
//         <h4 class="primaryPlaylistItem-title">
//           ${movie.title}
//         </h4>
//       </div>`
//     )
//   }
//   function createTemplate(HTMLString) {
//     const html = document.implementation.createHTMLDocument();
//     html.body.innerHTML = HTMLString;
//     return html.body.children[0];
//   }
//   function addEventClick($element) {
//     $element.addEventListener('click', () => {
//       // alert('click')
//       showModal($element)
//     })
//   }
//   function renderMovieList(list, $container, category) {
//     // actionList.data.movies
//     $container.children[0].remove();
//     list.forEach((movie) => {
//       const HTMLString = videoItemTemplate(movie, category);
//       const movieElement = createTemplate(HTMLString);
//       $container.append(movieElement);
//       const image = movieElement.querySelector('img');
//       image.addEventListener('load', (event) => {
//         event.srcElement.classList.add('fadeIn');
//       })
//       addEventClick(movieElement);
//     })
//   }

//   async function cacheExist(category) {
//     const listName = `${category}List`;
//     const cacheList = window.localStorage.getItem(listName);

//     if (cacheList) {
//       return JSON.parse(cacheList);
//     }
//     const { data: { movies: data } } = await getData(`${BASE_API}list_movies.json?genre=${category}`)
//     window.localStorage.setItem(listName, JSON.stringify(data))

//     return data;
//   }

//   // const { data: { movies: actionList} } = await getData(`${BASE_API}list_movies.json?genre=action`)
//   const actionList = await cacheExist('action');
//   // window.localStorage.setItem('actionList', JSON.stringify(actionList))
//   const $actionContainer = document.querySelector('#action');
//   renderMovieList(actionList, $actionContainer, 'action');

//   const dramaList = await await cacheExist('drama');
//   const $dramaContainer = document.getElementById('drama');
//   renderMovieList(dramaList, $dramaContainer, 'drama');

//   const animationList = await await cacheExist('animation');
//   const $animationContainer = document.getElementById('animation');
//   renderMovieList(animationList, $animationContainer, 'animation');








//   // const $home = $('.home .list #item');
//   const $modal = document.getElementById('modal');
//   const $overlay = document.getElementById('overlay');
//   const $hideModal = document.getElementById('hide-modal');

//   const $modalTitle = $modal.querySelector('h1');
//   const $modalImage = $modal.querySelector('img');
//   const $modalDescription = $modal.querySelector('p');

//   function findById(list, id) {
//     return list.find(movie => movie.id === parseInt(id, 10))
//   }

//   function findMovie(id, category) {
//     switch (category) {
//       case 'action' : {
//         return findById(actionList, id)
//       }
//       case 'drama' : {
//         return findById(dramaList, id)
//       }
//       default: {
//         return findById(animationList, id)
//       }
//     }
//   }

//   function showModal($element) {
//     $overlay.classList.add('active');
//     $modal.style.animation = 'modalIn .8s forwards';
//     const id = $element.dataset.id;
//     const category = $element.dataset.category;
//     const data = findMovie(id, category);

//     $modalTitle.textContent = data.title;
//     $modalImage.setAttribute('src', data.medium_cover_image);
//     $modalDescription.textContent = data.description_full
//   }

//   $hideModal.addEventListener('click', hideModal);
//   function hideModal() {
//     $overlay.classList.remove('active');
//     $modal.style.animation = 'modalOut .8s forwards';

//   }




// })()
