// Función para cargar la imagen seleccionada
function loadImage(event) {
  var file = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function(event) {
    var img = new Image();
    img.onload = function() {
      var canvas = document.getElementById("canvas");
      var wrapper = document.getElementById("wrapper");
      canvas.style.display = "block";
      wrapper.style.display = "none";
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      displayPixelInfo(ctx, canvas.width, canvas.height);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

// Función para mostrar la información de los píxeles
function displayPixelInfo(ctx, width, height) {
  var pixelInfo = document.getElementById("pixelInfo");
  pixelInfo.style.display = "block";
  pixelInfo.innerHTML = "";

  var pixel00 = ctx.getImageData(0, 0, 1, 1).data;
  var pixel10 = ctx.getImageData(1, 0, 1, 1).data;
  var pixel20 = ctx.getImageData(2, 0, 1, 1).data;
  var pixel30 = ctx.getImageData(3, 0, 1, 1).data;
  var pixel40 = ctx.getImageData(4, 0, 1, 1).data;
  var pixel50 = ctx.getImageData(5, 0, 1, 1).data;


     if (
      pixel00[0] === 0 && pixel00[1] === 0 && pixel00[2] === 0 &&
      pixel10[0] === 255 && pixel10[1] === 255 && pixel10[2] === 255 &&
      pixel20[0] === 0 && pixel20[1] === 0 && pixel20[2] === 0 &&
      pixel30[0] === 0 && pixel30[1] === 0 && pixel30[2] === 0 &&
      pixel40[0] === 255 && pixel40[1] === 255 && pixel40[2] === 255 &&
      pixel50[0] === 0 && pixel50[1] === 0 && pixel50[2] === 0
    ) {
        var pixelInfoItem = document.createElement("div");
        pixelInfoItem.innerText = "Hola, mi amor linda, mi tini \n Como te dije, aqui esta el dibujo Y la pagina para poder descifrar este mensaje. Si estas leyendo esto es porque funciono y soy el mejor ingeniero del mundo, pero tambien quiero aprovechar para decir un par de cosas mas. \n Primero, es que no pude dejar de pensar en que cuando te explique de que trataba todo esto me preguntaste que por que a ti y yo nomas atine a decir que porque si y, cuando preguntaste por mi respuesta, yo dije que hable asi porque eres boba. Despues me pediste disculpas por si tu pregunta fue rara o incomoda, supongo que te hice sentir culpable o algo, pero en realidad yo respondi asi porque me dio pena simplemente admitir que lo hacia para ti especificamente nomas porque te amo un monton y soy un intenso de mier, que no era chiste lo de que me tienes desquiciado, ni tampoco lo era el decir que me encantas y que estoy loco por ti. Tambien porque lo mereces, tipo, ¿como vas a ser tan linda? Te juro que me parece hasta shockeante saber que existes, me puedes mucho. Y, finalmente, solo porque puedo BASVJAKDJBA. \n Como sea, te queria pedir disculpas por si a ti, de hecho, te parecio algo incomoda mi reaccion, porque tu no dijiste ni hiciste nada malo, el bobo soy yo. \n Supongo que otra razon oculta para hacer todo esto es que generalmente soy malo con las palabras, pero bueno con los regalos, y me sentia en la necesidad de, una vez mas, pedirte disculpas por haberme desaparecido sin ninguna clase de explicacion en su tiempo, fui un idiota entonces tambien, nadie merece eso, y especialmente no lo mereces tu. Ya se que el tema quedo atras y ahora estamos bien, y no tienes idea de lo feliz que me hace, hablar contigo me pone de muy buen humor todos los dias, eres la persona mas divertida, dulce, hermosa y un monton de otras cosas positivas del mundo. (Aun asi la razon principal sigue siendo que me tienes como quieres, que haria lo que fuera por ti maldita hija de puta)."+
        "\n Y nada, te amo mucho mucho mucho, ojala que te guste el dibujo porque, en efecto, somos, y la verdad es que me costo un buen de trabajo hacerlo JAJAJA no solo porque el dibujo esta hecho literalmente pixel por pixel (era necesario para poder escribir todo esto), sino tambien porque encima tenia que asegurarme de que se viera lindo de todos modos. Tambien porque en un principio este mensaje no se suponia que fuera tan largo, pero mientras menos texto hiciera, menos pixeles necesitaba y hacer un dibujo de 10x10 no era opcion, iba a estar super chiquito y no iba a entendersele nada a la imagen, asi que me vi obligado a escribirte casi que una carta. Obligado entre comillas porque tambien es verdad que me diverti mucho haciendolo, y que lo haria todo de nuevo si fuera necesario. \n Puro pinche pio. \n Modi";
        pixelInfo.appendChild(pixelInfoItem);
     }else{
      for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
          var pixelData = ctx.getImageData(x, y, 1, 1).data;
          var pixelInfoItem = document.createElement("div");
          pixelInfoItem.innerText =
            "Pixel [" + x + ", " + y + "]: " +
            "R: " + pixelData[0] + ", " +
            "G: " + pixelData[1] + ", " +
            "B: " + pixelData[2];
          pixelInfo.appendChild(pixelInfoItem);
        }
      }}}

// Evento de cambio de archivo
var imageInput = document.getElementById("imageInput");
imageInput.addEventListener("change", loadImage);

const form = document.querySelector("form"),
fileInput = document.querySelector(".file-input"),
progressArea = document.querySelector(".progress-area"),
uploadedArea = document.querySelector(".uploaded-area");
form.addEventListener("click", () =>{
  fileInput.click();
});
fileInput.onchange = ({target})=>{
  let file = target.files[0];
  if(file){
    let fileName = file.name;
    if(fileName.length >= 12){
      let splitName = fileName.split('.');
      fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
    }
    uploadFile(fileName);
  }
}

function uploadFile(name){
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "php/upload.php");
  xhr.upload.addEventListener("progress", ({loaded, total}) =>{
    let fileLoaded = Math.floor((loaded / total) * 100);
    let fileTotal = Math.floor(total / 1000);
    let fileSize;
    (fileTotal < 1024) ? fileSize = fileTotal + " KB" : fileSize = (loaded / (1024*1024)).toFixed(2) + " MB";
    let progressHTML = `<li class="row">
                          <i class="fas fa-file-alt"></i>
                          <div class="content">
                            <div class="details">
                              <span class="name">${name} • Uploading</span>
                              <span class="percent">${fileLoaded}%</span>
                            </div>
                            <div class="progress-bar">
                              <div class="progress" style="width: ${fileLoaded}%"></div>
                            </div>
                          </div>
                        </li>`;
    uploadedArea.classList.add("onprogress");
    progressArea.innerHTML = progressHTML;
    if(loaded == total){
      progressArea.innerHTML = "";
      let uploadedHTML = `<li class="row">
                            <div class="content upload">
                              <i class="fas fa-file-alt"></i>
                              <div class="details">
                                <span class="name">${name} • Uploaded</span>
                                <span class="size">${fileSize}</span>
                              </div>
                            </div>
                            <i class="fas fa-check"></i>
                          </li>`;
      uploadedArea.classList.remove("onprogress");
      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
    }
  });
  let data = new FormData(form);
  xhr.send(data);
}