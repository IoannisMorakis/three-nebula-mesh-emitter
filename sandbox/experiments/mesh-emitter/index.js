const {
    Body,
    BoxZone,
    Emitter,
    Gravity,
    Life,
    Mass,
    MeshRenderer,
    Position,
    RadialVelocity,
    Radius,
    Rate,
    Rotate,
    Scale,
    Span,
    GPURenderer,
    Vector3D,
  } = window.Nebula;

  const ParticleSystem = window.Nebula.default;
  
  
  const createMesh = ({ geometry, material }) =>
    new THREE.Mesh(geometry, material);
  
  const createEmitter = ({ position, body }) => { // Aqui se establecen las propiedades del emitter a crear
    const emitter = new Emitter();
  
    return emitter
      .setRate(new Rate(new Span(5, 10), new Span(0.1, 0.25)))
      .addInitializers([
        new Mass(1),
        new Radius(10),
        new Life(2, 4),
        new Body(body),
        new Position(new BoxZone(100)),
        new RadialVelocity(200, new Vector3D(0, 1, 1), 30),
      ])
      .addBehaviours([
        new Rotate('random', 'random'),
        new Scale(1, 0.2),
        new Gravity(3),
      ])
      .setPosition(position)
      .emit();
  };
  
  window.init = async ( { scene, camera }) => {
  
    const system = new ParticleSystem();
    const sphereEmitter = createEmitter({
      position: {
        x: -100,
        y: 0,
      },
      body: createMesh({ // añadir a que mesh deseado
        // En este caso son esferas
        geometry: new THREE.SphereGeometry(10, 8, 8),
        material: new THREE.MeshLambertMaterial({ color: '#ff0000' }),
      }),
    });
    const cubeEmitter = createEmitter({
      position: {
        x: 100,
        y: 0,
      },
      body: createMesh({ // añadir a que mesh deseado
        // En este caso son cubos
        geometry: new THREE.BoxGeometry(20, 20, 20),
        material: new THREE.MeshLambertMaterial({ color: '#00ffcc' }),
      }),
    });
  
    camera.position.z = 400;
    camera.position.y = -100;

    const systemRenderer = new MeshRenderer(scene, THREE);
    //const systemRenderer = new GPURenderer(scene, THREE);
  
    return system
      .addEmitter(sphereEmitter)
      .addEmitter(cubeEmitter)
      .addRenderer(systemRenderer);
  };
  