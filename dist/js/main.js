var directionSlider, productSlider, maxOpened = 0;

$(document).ready(function() {
  $('#fullpage').fullpage({
    //options here
    autoScrolling:true,
    scrollHorizontally: true,
    menu: '#menu',
    fixedElements: '#menu, #header, #footer, .mail, .share',
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    anchors:['main', 'about', 'news', 'product', 'directions', 'team', 'contacts'],

    onLeave: function(origin, destination, direction) {

      // Hide SAFMAR logo
      if (!destination.isFirst) {
        $('#footer').find('a').animate({opacity: 0}, 500, function() { $('#footer').find('a').css({display: 'none'}); });
      } else {
        $('#footer').find('a').css({display: 'block'}).animate({opacity: 1}, 500);
      }


      if (destination.index == 1) {
        if (maxOpened < 1) {
          maxOpened = 1;
        }
      }

      // Directions section
      if (destination.index == 4) {

        if (maxOpened < 4) {
          directionSlider.autoplay.start();
          maxOpened = 4;
        }
      }

      // Team section
      
      if (destination.index == 5) {
        if (maxOpened < 5) {
          startTeamAnimation();
          maxOpened = 5;
        }
      }


      // Disable scroll on last slide
      if (destination.isLast) {
        $.fn.fullpage.setAllowScrolling(false);
      }
    }
  });

  var stageHeight = $(window).height();
  $('#stage').css({height: stageHeight, width: stageHeight});




  productSlider = new Swiper('#section-product__slider', {
      speed: 400,
      spaceBetween: 100,
      slidesPerView: 3,
      grabCursor: false,
      allowTouchMove: false,
      breakpoints: {
        1200: {
          spaceBetween: 40
        },
        1400: {
          spaceBetween: 40
        }
      }
  });

  directionSlider = new Swiper('#section-direction__slider', {
      speed: 400,
      spaceBetween: 100,
      slidesPerView: 1,
      grabCursor: false,
      autoplay: {
        delay: 5000,
        stopOnLastSlide: true
      },
      on: {
        init: function () {
          var paginationContainer = $('#section-direction__slider').find('.swiper-pagination');
          paginationContainer.append('<div class="swiper-pagination-line"></div><div class="swiper-pagination-underline"></div>');
          var pc = 100 / (this.slides.length - 1);
          for(var i = 0; i < this.slides.length; i++) {
            var percent = i * pc;
            percent = percent < 100 ? percent : 99.5;
            paginationContainer.append('<div class="pagination-point" data-slide="' + i + '" style="left:' + percent + '%"></div>')
          }
          $('.pagination-point').on('click', function() {
            disableAutoplay();
            directionSlider.slideTo($(this).data('slide'));
          });
        },
        autoplay: function () {
          var pc = 100 / (this.slides.length -1);
          var percent = (this.activeIndex + 1) * pc;
          percent = percent > 100 ? 100 : percent;
          var line = $('#section-direction__slider').find('.swiper-pagination-line');
          line.animate({width: percent + '%'}, 5000);
        },
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'custom',
      }
  });

  function disableAutoplay() {
    var line1 = $('#section-direction__slider').find('.swiper-pagination-line');
    line1.finish();
    directionSlider.off('sliderMove');

    directionSlider.off('slideChange').on('slideChange', function() {
      var pc = 100 / (this.slides.length -1);
      var percent = this.activeIndex * pc;
      percent = percent > 100 ? 100 : percent;
      var line = $('#section-direction__slider').find('.swiper-pagination-line');
      line.animate({width: percent + '%'}, 200);
    });
    directionSlider.autoplay.stop();
  }

  directionSlider.autoplay.stop();

  directionSlider.on('autoplayStart', function() {
    var pc = 100 / (this.slides.length -1);
    var percent = (this.activeIndex + 1) * pc + '%';
    var line = $('#section-direction__slider').find('.swiper-pagination-line');
    line.animate({width: percent}, 5000);
  });

  directionSlider.on('sliderMove', function() {
    disableAutoplay();
  });


  $('.mail').on('click', function() {
    $('.mail-hidden').css({display:'block'}).animate({opacity: 1}, 200);
    $.fn.fullpage.setAllowScrolling(false);
    startWritetousAnimation();
  });

  $('.mail-hidden__close').on('click', function() {
    $('.mail-hidden').animate({opacity: 0}, 200, function() {
      $('.mail-hidden').css({display:'none'})
    });
    $.fn.fullpage.setAllowScrolling(true);
    restoreWritetousAnimation();
  });

  $('.menu').on('click', function() {
    $('.menu-hidden').css({display:'block'}).animate({opacity: 1}, 200);
    $.fn.fullpage.setAllowScrolling(false);
    startMenuAnimation();
  });

  $('.menu-hidden__close').on('click', function() {
    $('.menu-hidden').animate({opacity: 0}, 200, function() {
      $('.menu-hidden').css({display:'none'})
    });
    $.fn.fullpage.setAllowScrolling(true);
    restoreMenuAnimation();
  });

  $('.menu-hidden__items').on('click', function() {
    $('.menu-hidden__close').click();
  });


  function startTeamAnimation() {
    $('#section-team-red').animate({ opacity: 1}, 1500, 
        function() {
          $('#section-team-red').find('[style]').each(function(index, item) {
            $(item).animate({opacity:1}, 800 * (index + 1) + 500);
          });

          $('#section-team-black').delay(2000).animate({opacity: 1}, 1500, function() {
            $('#section-team-black').find('[style]').each(function(index1, item1) {
              $(item1).animate({opacity:1}, 800 * (index1 + 1) + 500);
            });
          });
        }
      )
  }

  function startMenuAnimation() {
    $('#header').css({opacity: 0.4, 'pointer-events': 'none'});
    $('#footer').css({opacity: 0.4, 'pointer-events': 'none'});
  }

  function restoreMenuAnimation() {
    $('#header').removeAttr('style');
    $('#footer').removeAttr('style');
  }

  function startWritetousAnimation() {
    var els = $('#write-to-us').find('.js-animate-show-input');
    var inputs = $('#write-to-us').find('.js-animate-show-input input');
    inputs.css({bottom: '-50px'});
    els.find('.input-holder-line').css({width: 0});

    els.each(function(index, item) {
      $(item).find('input').animate({bottom: 0}, 200 * (index + 1)*2);
      $(item).find('.input-holder-line').animate({width: '100%'}, 200 * (index + 1)*2);
    });

    var textarea = $('#write-to-us').find('.js-animate-show-textarea');
    var submit = $('#write-to-us').find('.js-animate-show-submit');
    textarea.removeClass('animated-top');
    setTimeout(function() {
      submit.removeClass('animated-top');
    }, 200);
    $('#menu').hide(200);
  }

  function restoreWritetousAnimation() {
    var textarea = $('#write-to-us').find('.js-animate-show-textarea');
    var submit = $('#write-to-us').find('.js-animate-show-submit');

    setTimeout(function() {
      textarea.addClass('animated-top');
      submit.addClass('animated-top');
    }, 500);

    $('#menu').show(200);
  }


  $(document).on('click', 'a', function(e) {
    if ($(e.target).hasClass('menu-link') && !$(e.target).hasClass('menu-link__contacts')) {
      $.fn.fullpage.setAllowScrolling(true);
    }

    if ($(e.target).hasClass('go-to-main')) {
      $.fn.fullpage.setAllowScrolling(true);
    }
  });

  //methods
  //$.fn.fullpage.setAllowScrolling(false);
});





var sphereVerticesArray = [];
var sphereVerticesNormArray = [];
var mouseX = 0, mouseY = 0, camera, webGLRenderer,
    windowHalfX = window.innerWidth / 2,
    windowHalfY = window.innerHeight / 2,
    raycaster, mesh, meshRed, scene, Rgeometry, Rmaterial, Redmaterial, intersects, projector;
var intersectionPt, mouse;

var tick = 1;

function init() {
  //var stats = initStats();
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  camera = new THREE.PerspectiveCamera(74, $('#stage').width() / $('#stage').height(), 0.1, 1000);
  // create a render and set the size
  webGLRenderer = new THREE.WebGLRenderer({ antialias: true });
  webGLRenderer.setClearColor(new THREE.Color(0xFFFFFF, 1));
  webGLRenderer.setSize($('#stage').width(), $('#stage').height());
  webGLRenderer.shadowMap.enabled = true;


  var date = new Date();
  var pn = new Perlin('rnd' + date.getTime());
  var sphereGeom = new THREE.SphereGeometry(25, 50, 50);
  var sphereGeomRed = new THREE.SphereGeometry(26, 30, 30, Math.PI/2, Math.PI, 0, Math.PI);
  // save points for later calculation
  for (var i = 0; i < sphereGeom.vertices.length; i += 1) {
    var vertex = sphereGeom.vertices[i];
    var vec = new THREE.Vector3(vertex.x, vertex.y, vertex.z);
    sphereVerticesArray.push(vec);
    var mag = vec.x * vec.x + vec.y * vec.y + vec.z * vec.z;
    mag = Math.sqrt(mag);
    var norm = new THREE.Vector3(vertex.x / mag, vertex.y / mag, vertex.z / mag);
    sphereVerticesNormArray.push(norm);
  }


  //console.log(sphereVerticesArray)

  //var sphere = THREE.SceneUtils.createMultiMaterialObject(sphereGeom, []);

  //var MAX_POINTS = 500;
  var geometry = new THREE.Geometry();
  var tgeometry = new THREE.Geometry();
  var lgeometry = new THREE.Geometry();
  var sgeometry = new THREE.Geometry();
  var ssgeometry = new THREE.Geometry();
  
  //var positions = new Float32Array( MAX_POINTS * 3 ); // 3 vertices per point

  var tmaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: .2,
      opacity: 1,
      transparent: true,
   });
  var lmaterial = new THREE.LineBasicMaterial({
      color: 0xdddddd,
      opacity: 1,
      transparent: true,
  });
  var sprite = new THREE.TextureLoader().load( 'dist/img/disc.png' );
  var smaterial = new THREE.PointsMaterial( { size: 2.3, sizeAttenuation: true, map: sprite, alphaTest: 0.5, transparent: true } );
  var ssmaterial = new THREE.PointsMaterial( { size: 1.2, sizeAttenuation: true, map: sprite, alphaTest: 0.5, transparent: true } );
  //smaterial.color.setHSL( 1.0, 0.3, 0.7 );


  //material and scene defined in question
  var pointCloud = new THREE.Points(tgeometry, tmaterial);

  var lineCloud = new THREE.Line(lgeometry, lmaterial);
  var randomCloud = new THREE.Points(sgeometry, smaterial);
  var randomMovingCloud = new THREE.Points(ssgeometry, ssmaterial);  

  for (var i = 0; i < 250; i++ ) {
    var svertex = new THREE.Vector3();
    svertex.x = (Math.random() * 2 - 1);
    svertex.y = (Math.random() * 2 - 1);
    svertex.z = (Math.random() * 2 - 1);
    svertex.normalize();
    svertex.multiplyScalar(Math.random() * 20 + 4);
   /* sgeometry.vertices.push(svertex);
    svertex.multiplyScalar( Math.random() * 0.09 + 1 );*/
    sgeometry.vertices.push(svertex);
  }

  for (var i = 0; i < 50; i++ ) {
    var svertex = new THREE.Vector3();
    svertex.x = (Math.random() * 2 - 1) * 2;
    svertex.y = (Math.random() * 2 - 1) * 1;
    svertex.z = (Math.random() * 2 - 1);
    svertex.normalize();
    svertex.multiplyScalar(16);
    ssgeometry.vertices.push(svertex);
    svertex.multiplyScalar( Math.random() * 0.2 + 1 );
    ssgeometry.vertices.push(svertex);
  }



  //scene.add(sphere);
  //scene.add(pointCloud);
  //scene.add(lineCloud);
  scene.add(randomCloud);
  scene.add(randomMovingCloud);

  // position and point the camera to the center of the scene
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 50;
  //camera.lookAt(new THREE.Vector3(0, 0, 55));


  //var orbitControls = new THREE.OrbitControls(camera);
  //orbitControls.autoRotate = false;
  var clock = new THREE.Clock();

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  projector = new THREE.Projector();

 // geometry
  //Rgeometry = new THREE.SphereGeometry( 25, 50, 50 );
  
  // material
  Rmaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff, 
      transparent: true,
      opacity: 0,
  });

  Redmaterial = new THREE.MeshBasicMaterial({
      color: 0xa01d21,
      transparent: false,
      opacity: 1
  });

  // mesh
  mesh = new THREE.Mesh( sphereGeom, Rmaterial );
  scene.add( mesh );

  meshRed = new THREE.Mesh( sphereGeomRed, Redmaterial );


  window.addEventListener('mousedown', onMouseDown, false );
  window.addEventListener('mousemove', onMouseMove, false );
  
  intersectionPt = new THREE.Geometry();
  intersectionPt.vertices.push(new THREE.Vector3( 0, 0, 0));
  var dotMaterial = new THREE.PointsMaterial( { size: 0, sizeAttenuation: false } );
  var dot = new THREE.Points( intersectionPt, dotMaterial );
  scene.add( dot );

  // add subtle ambient lighting
  var light = new THREE.AmbientLight( 0x000000 ); // soft white light
  scene.add( light );

  // add spotlight for the shadows
  /*var spotLight = new THREE.DirectionalLight(0x000000);
  spotLight.position.set(0, 30, 40);
  spotLight.intensity = 20;
  scene.add(spotLight);*/

  // add the output of the renderer to the html element
  document.getElementById("stage").appendChild(webGLRenderer.domElement);

  var step = 0;
  var inverter = 1;
  var timeToRed = 0 , showRed = false, ticktonext = 0;

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  document.addEventListener( 'touchmove', onDocumentTouchMove, false );
  window.addEventListener( 'resize', onWindowResize, false );

  meshRed.rotation.set( 0, -3*Math.PI/2, 0 );

  render();

  function render() {
    step += 1;

    scene.rotation.y -= 0.004;
    scene.add(meshRed);

    if (step % 785 === 0 && showRed) {
      showRed = false;
    } else if (step % 785 === 0 && !showRed) {
      showRed = true;
    }
    if (showRed) {
      meshRed.rotation.y -= 0.004;
    } else {
      meshRed.rotation.y += 0.004;
    }


    var delta = clock.getDelta();
    var lastParams = [];

    webGLRenderer.clear();

    //scene.remove(sphere);
    scene.remove(pointCloud);
    scene.remove(lineCloud);

    //scene.remove(randomMovingCloud);
    //scene.remove(randomCloud);
    tgeometry.vertices = [];
    lgeometry.vertices = [];
    //sgeometry.vertices = [];

    if (intersects && intersects.length) {
      if (!showRed) {
        inverter = inverter > 50 ? 50 : inverter + 1;
      } else {
        inverter = inverter < 1 ? 1 : inverter - 1;
      }
      for (var i = 0; i < sphereGeom.vertices.length; i += 1) {
        var vertex = sphereGeom.vertices[i], value;
        if (showRed) {
          value = pn.noise((vertex.x + step)/ 30, vertex.y / 30, 200 + vertex.z / 10);
        } else {
          value = pn.noise((vertex.x + step)/ 10, vertex.y / 10, 12 + vertex.z / 10);
        }

        vertex.x = sphereVerticesArray[i].x + (sphereVerticesNormArray[i].x * value * (showRed ? (inverter / 10) : 5)) * inverter / 50;
        vertex.y = sphereVerticesArray[i].y + (sphereVerticesNormArray[i].y * value * (showRed ? (inverter / 10) : 5)) * inverter / 50;
        vertex.z = sphereVerticesArray[i].z + sphereVerticesNormArray[i].z * value * 1;

        tgeometry.vertices.push(new THREE.Vector3(
          vertex.x,
          vertex.y,
          vertex.z));

        if (i > 0) {
          lgeometry.vertices.push(lastParams, new THREE.Vector3(vertex.x, vertex.y, vertex.z))
        }
        lastParams = new THREE.Vector3(
          vertex.x,
          vertex.y,
          vertex.z)
      }
    } else {
      
      inverter = inverter < 1 ? 1 : inverter - 1;
      for (var i = 0; i < sphereGeom.vertices.length; i += 1) {
        var vertex = sphereGeom.vertices[i];

        var value = pn.noise((vertex.x + step)/ 10, vertex.y / 10, 12 + vertex.z / 10);

        vertex.x = sphereVerticesArray[i].x + (sphereVerticesNormArray[i].x * value * (inverter / 10)) * inverter / 50;
        vertex.y = sphereVerticesArray[i].y + (sphereVerticesNormArray[i].y * value * (inverter / 10)) * inverter / 50;
        vertex.z = sphereVerticesArray[i].z + sphereVerticesNormArray[i].z * value * 1;

        tgeometry.vertices.push(new THREE.Vector3(
          vertex.x,
          vertex.y,
          vertex.z));

        if (i > 0) {
          lgeometry.vertices.push(lastParams,new THREE.Vector3( vertex.x, vertex.y, vertex.z ));
        }
        lastParams = new THREE.Vector3(
          vertex.x,
          vertex.y,
          vertex.z);
      }
    }

    
    //console.log(vertex.x)
    sphereGeom.computeFaceNormals();
    sphereGeom.computeVertexNormals();

    tgeometry.computeFaceNormals();
    tgeometry.computeVertexNormals();

    lgeometry.computeFaceNormals();
    lgeometry.computeVertexNormals();

    sgeometry.computeFaceNormals();
    sgeometry.computeVertexNormals();

    sphereGeom.verticesNeedUpdate = true;
    tgeometry.verticesNeedUpdate = true;
    lgeometry.verticesNeedUpdate = true;
    sgeometry.verticesNeedUpdate = true;


    //scene.add(sphere);
    /*if (step % 500 == 0 ) {
        tick *= -1;
    }*/
    var rotateX = randomMovingCloud.rotation.x - 0.003// Math.sin(delta / 5) * tick;
    var rotateY = randomMovingCloud.rotation.y - 0.001// Math.sin(delta / 2) * tick;
    var rotateZ = randomMovingCloud.rotation.z - 0.001// Math.sin(delta / 5) * tick;
    randomMovingCloud.rotation.set( rotateX, rotateY, rotateZ );
    //randomMovingCloud.translateZ(Math.sin(delta) * tick);

    scene.add(pointCloud);
    scene.add(lineCloud);

    //timeToRed += delta;
    
    //scene.add(randomMovingCloud);
    //scene.add(randomCloud);

    /*camera.position.x += ( mouseX - camera.position.x ) * .0002;
    camera.position.y += ( - mouseY + 200 - camera.position.y ) * .0002;
    camera.lookAt( scene.position );*/
    
    // render using requestAnimationFrame

    /*camera.position.x += ( mouseX - camera.position.x ) * 0.0001;
    camera.position.y += ( - mouseY - camera.position.y ) * 0.0001;
    camera.lookAt( scene.position );*/

    requestAnimationFrame(render);
    webGLRenderer.render(scene, camera);
  }
}
function onMouseMove( event ) {
  mouse.x = ( ( event.clientX - webGLRenderer.domElement.offsetLeft ) / webGLRenderer.domElement.width ) * 2 - 1;
  mouse.y = - ( ( event.clientY - webGLRenderer.domElement.offsetTop ) / webGLRenderer.domElement.height ) * 2 + 1;
  var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
  vector.unproject(camera);

  raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
  intersects = raycaster.intersectObject( mesh );

  raycaster.setFromCamera( mouse, camera );
  if ( intersects.length > 0 ) {
    intersectionPt.vertices[0] = intersects[0].point;
    intersectionPt.verticesNeedUpdate = true;
    
  }
}

function onMouseDown( event ) {
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;   
  /*raycaster.setFromCamera( mouse, camera );
  var intersects = raycaster.intersectObjects( scene.children );

  if (intersects.length > 0) {
    for (var i=0; i<Rgeometry.vertices.length; i++) {
      Rgeometry.vertices[i].multiplyScalar(1.2);
    }
    Rgeometry.verticesNeedUpdate = true;
  }
  Rgeometry.computeBoundingSphere();*/

}
function onDocumentMouseMove( event ) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}
function onDocumentTouchStart( event ) {
  if ( event.touches.length > 1 ) {
    event.preventDefault();
    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;
  }
}
function onDocumentTouchMove( event ) {
  if ( event.touches.length == 1 ) {
    event.preventDefault();
    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;
  }
}
 function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = $('#stage').width()/ $('#stage').height();
    camera.updateProjectionMatrix();

    var stageHeight = $(window).height();
    $('#stage').css({width: stageHeight, height: stageHeight})
    webGLRenderer.setSize( stageHeight, stageHeight );
  }
window.onload = init;















































/*var SCREEN_WIDTH = $('#stage').width(),
    SCREEN_HEIGHT = $('#stage').height(),
    mouseX = 0, mouseY = 0,
    windowHalfX = $('#stage').width() / 2,
    windowHalfY = $('#stage').height() / 2,
    camera, scene, renderer, particles = [], randpoints = [],
    phi, theta, i = 0, delta = 0;
  init();
  animate();
  function init() {
    var container, particle, vertex, vertex2, geometry, prevVars;
    container = document.createElement( 'div' );
    document.getElementById('stage').appendChild( container );
    camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
    camera.position.z = 1000;
    
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );
    renderer = new THREE.CanvasRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
    container.appendChild( renderer.domElement );
    // particles
    var PI2 = Math.PI * 2;
    var material = new THREE.SpriteCanvasMaterial( {
      color: 0xDFDFDF,
      //color: 0x000000,
      program: function ( context ) {
        context.beginPath();
        context.arc( 0, 0, 0.5, 0, 2 * Math.PI, true );
        context.fill();
      }
    } );

    var materialRand = new THREE.SpriteCanvasMaterial( {
      color: 0xa01d21,
      //color: 0x000000,
      program: function ( context ) {
        context.beginPath();
        context.arc( 0, 0, 0.5, 0, 2 * Math.PI, true );
        context.fill();
      }
    } );

    let maxVal = 100;
    let _maxVal = Math.PI * 2 / maxVal;

    var vertices = [], poss = [], j;

    var latitude = 0; // x 
    var longitude = 0; // y

    //for (var i = 0; i < maxVal; i ++) {
    while (longitude < 360) {

      phi = (latitude/180) * Math.PI;
      theta = (longitude/180) * Math.PI;

      particles[i] = new THREE.Sprite( material );
      particles[i].position.x = Math.cos(theta) * Math.sin(phi );//  Math.random() * 2 - 1;//Math.random() * 2 - 1;
      particles[i].position.z = Math.sin(theta) * Math.sin(phi );
      particles[i].position.y = Math.cos(phi);

      
      particles[i].position.normalize();
      particles[i].position.multiplyScalar( 500 );
      particles[i].scale.multiplyScalar( 6 );

      if (i > 0) {
        vertex = new THREE.Vector3(prevVars[0], prevVars[1], prevVars[2]);
        vertex.normalize();
        vertex.multiplyScalar( 500 );

        vertex2 = new THREE.Vector3(particles[i].position.x, particles[i].position.y, particles[i].position.z);
        vertex2.normalize();
        vertex2.multiplyScalar( 500 );
        vertices.push( vertex );
        vertices.push( vertex2 );
      }

      prevVars = [particles[i].position.x, particles[i].position.y, particles[i].position.z];
      scene.add(particles[i]);

      poss.push({x:particles[i].position.x, y:particles[i].position.y, z:particles[i].position.z})

      latitude += 9;
      if (latitude > 360) {
        latitude = 0;
        longitude += 9;
      }
      i++;
    }

    for (var i = 0; i < 50; i++ ) {
      randpoints[i] = new THREE.Sprite( materialRand );
      randpoints[i].position.x = Math.random() * 2 - 1;
      randpoints[i].position.y = Math.random() * 2 - 1;
      randpoints[i].position.z = Math.random() * 2 - 1;

      randpoints[i].position.normalize();
      randpoints[i].scale.multiplyScalar( 20 + Math.random() * 10 );
      if (i > 50/2) {
        randpoints[i].position.multiplyScalar( 480 );
      } else {
        randpoints[i].position.multiplyScalar( 200 + Math.random() * 300 );
      }

      scene.add(randpoints[i]);
    }
    geometry = new THREE.BufferGeometry().setFromPoints( vertices );
    var line = new THREE.LineSegments( geometry, new THREE.LineBasicMaterial( { color: 0xEFEFEF } ) );
    scene.add( line );


    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );
    //
    window.addEventListener( 'resize', onWindowResize, false );
  }
  function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }
  //
  function onDocumentMouseMove( event ) {
    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
  }
  function onDocumentTouchStart( event ) {
    if ( event.touches.length > 1 ) {
      event.preventDefault();
      mouseX = event.touches[ 0 ].pageX - windowHalfX;
      mouseY = event.touches[ 0 ].pageY - windowHalfY;
    }
  }
  function onDocumentTouchMove( event ) {
    if ( event.touches.length == 1 ) {
      event.preventDefault();
      mouseX = event.touches[ 0 ].pageX - windowHalfX;
      mouseY = event.touches[ 0 ].pageY - windowHalfY;
    }
  }
  //
  function animate() {
    requestAnimationFrame( animate );
    console.log(animate)
    render();
  }

  function render() {
    camera.position.x += ( mouseX - camera.position.x ) * .05;
    //camera.position.x += 2;
    //scene.rotation.y -= 0.005;
    //camera.position.y += 2;

    for(var i = 0; i < randpoints.length / 2; i++) {
      randpoints[i].translateX((Math.random() * 2 - 1) * 20);
    }
    camera.position.y += ( - mouseY + 200 - camera.position.y ) * .05;
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
    delta
  }
*/
/*

var canvas = document.getElementById('stage');
var ctx = canvas.getContext('2d');

// even distribution on sphere
// @link: https://en.wikibooks.org/wiki/Mathematica/Uniform_Spherical_Distribution
// @link: https://stackoverflow.com/a/44164075

// point set
var numOfPoints = 2000, numOfPointsCount = 2000;
var points = [];

// create points
for (var i = 0; i < numOfPointsCount; i++) {
  //var theta = Math.PI * i * (12 + Math.sqrt(60)) * 1/11;
  var theta = Math.PI/2 * i * (2 + Math.sqrt(5));
  var phi = Math.acos(i / numOfPoints - 1); 
  points.push({
    x: Math.sin(phi) * Math.cos(theta),
    y: Math.cos(phi) * Math.cos(theta),
    z: Math.sin(phi) * Math.sin(theta),
  });
}

// create perspective matrix
var p = mat4.create();
mat4.perspective(p, 30, canvas.clientWidth / canvas.clientHeight, 0, 100);

// since we draw thing on canvas
// it is using the left-handed coordinate system
// x-axis points from left to right
// y-axis points from up to down
// z-axis points outward from screen

// create view matrix
var v = mat4.create();
var eye = vec3.fromValues(1, -1, 2);
var center = vec3.fromValues(0, 0, 0);
var up = vec3.fromValues(0, -1, 0);
mat4.lookAt(v, eye, center, up);

// create model matrix
var m = mat4.create();

var halfWidth = canvas.clientWidth / 2;
var halfHeight = canvas.clientHeight / 2;

function loop() {

  // rotate sphere by rotate its model matrix
  mat4.rotateY(m, m, Math.PI/ 3000);
  
  // create pvm matrix
  var vm = mat4.create();
  mat4.multiply(vm, v, m);
  var pvm = mat4.create();
  mat4.multiply(pvm, p, vm);


  // clear screen
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  ctx.save();
  ctx.translate(halfWidth, halfHeight);

  // draw center
  //ctx.fillStyle = "#FF0000";
  //ctx.fillRect(0, 0, 5, 5);
  let tempVar = 10;
  // draw points
  for (var i = 0; i < numOfPointsCount; i++) {
    var point = vec3.fromValues(points[i].x, points[i].y, points[i].z);

    // calculate color by depth
    var localPoint = vec3.create();
    vec3.transformMat4(localPoint, point, m);
    ctx.fillStyle = "rgba(0,0,0," + ((localPoint[2] + 1) / 2) + ")";

    // calculate point size
    var pSize = (localPoint[2] + 1);

    // calculate screen position by apply pvm matrix to point
    var screenPoint = vec3.create();
    vec3.transformMat4(screenPoint, point, pvm);

    // draw point
    ctx.fillRect(screenPoint[0] * halfWidth, screenPoint[1] * halfHeight, pSize, pSize);

    if (i + 1 < numOfPointsCount) {
      var pointTo = vec3.fromValues(points[i+1].x, points[i+1].y, points[i+1].z);
      var screenPoint_line = vec3.create();
      vec3.transformMat4(screenPoint_line, pointTo, pvm);
      ctx.beginPath(); 
      // Staring point (10,45)
      ctx.moveTo(screenPoint[0] * halfWidth, screenPoint[1] * halfHeight);
      // End point (180,47)
      ctx.lineTo(screenPoint_line[0] * halfWidth, screenPoint_line[1] * halfHeight);
      // Make the line visible
      ctx.stroke();
      //ctx.fillRect(screenPoint[0] * halfWidth, screenPoint[1] * halfHeight, 20 , pSize);
      //ctx.stroke();
    }
    
  }

  ctx.restore();

  requestAnimationFrame(loop);
}

loop();

*/