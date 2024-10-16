import Practicas from "./practicas.js";
import ModuloMetricas from './moduloMetricas';

describe("Test para cargarDatos()", () => {
  it("Debe asignar correctamente los valores de nombre, descripcion, fecha y enlace", () => {
    const practica = new Practicas();
    const nombre = "Práctica TDD";
    const descripcion = "Descripción de prueba";
    const fecha = "2024-10-15";
    const enlace = "http://enlace.com";

    practica.cargarDatos(nombre, descripcion, fecha, enlace);

    expect(practica.nombre).toBe(nombre);
    expect(practica.descripcion).toBe(descripcion);
    expect(practica.fecha).toBe(fecha);
    expect(practica.enlace).toBe(enlace);
  });
});

describe("Pruebas para la función obtenerPractica(nombre)", () => {
  
    it("Debe devolver la instancia cuando el nombre coincide", () => {
      const practica = new Practicas();
      practica.cargarDatos("Práctica TDD", "Descripción de prueba", "2024-10-15", "http://enlace.com");
      
      const resultado = practica.obtenerPractica("Práctica TDD");
      
      expect(resultado).toBe(practica);  
    });
    
    it("Debe devolver undefined cuando el nombre no coincide", () => {
      const practica = new Practicas();
      practica.cargarDatos("Práctica TDD", "Descripción de prueba", "2024-10-15", "http://enlace.com");
      
      const resultado = practica.obtenerPractica("Práctica ABC");
      
      expect(resultado).toBeUndefined(); 
    });
  
  });

  describe('Pruebas para anadirMetrica()', () => {
  
    let practicas;
    
    beforeEach(() => {
      practicas = new Practicas();
      practicas.cargarDatos('Practica 1', 'Descripcion 1', '2023-10-01', 'http://enlace.com');
    });
  
    test('Debe agregar una métrica cuando numeroCommit es exactamente 1 más que lastCommitNumber', () => {
      practicas.lastCommitNumber = 0;
  
      const resultado = practicas.anadirMetrica(1, 'Explicacion', 'Pruebas', 80, 100, 5, 'Tipo A', 'Diaria');
  
      expect(resultado).toBe(true);
      expect(practicas.lastCommitNumber).toBe(1);
    });
  
    test('No debe agregar una métrica si numeroCommit no es uno más que lastCommitNumber', () => {
      practicas.lastCommitNumber = 0;
  
      const resultado = practicas.anadirMetrica(2, 'Explicacion', 'Pruebas', 80, 100, 5, 'Tipo A', 'Diaria');
  
      expect(resultado).toBe(false);
      expect(practicas.lastCommitNumber).toBe(0);  
    });
  
  });

  describe('Pruebas para motrarMetricas()', () => {
  
    let practicas;
    let moduloMetricasMock;
  
    beforeEach(() => {
      moduloMetricasMock = new ModuloMetricas();
      practicas = new Practicas();
      practicas.ModuloMetricas = moduloMetricasMock;
    });
  
    test('Debe llamar a desplegarMetrica() y devolver sus resultados', () => {
      const metricasEsperadas = [{ numeroCommit: 1, pruebas: 'Pruebas' }];
      jest.spyOn(moduloMetricasMock, 'desplegarMetrica').mockReturnValue(metricasEsperadas);
  
      const resultado = practicas.motrarMetricas();
  
      expect(resultado).toEqual(metricasEsperadas);
      expect(moduloMetricasMock.desplegarMetrica).toHaveBeenCalled();
    });
  });

  describe('Pruebas para la función eliminarDatos()', () => {
    let practica;

    beforeEach(() => {
        practica = new Practicas();
        practica.cargarDatos("Practica1", "Descripción de la práctica", "2024-10-16", "http://enlace.com");
    });

    test('Debería eliminar los datos correctamente cuando el nombre coincide', () => {
        practica.eliminarDatos("Practica1");

        expect(practica.nombre).toBeNull();
        expect(practica.descripcion).toBeNull();
        expect(practica.fecha).toBeNull();
        expect(practica.enlace).toBeNull();
        expect(practica.tipo).toBeNull(); 
    });

    test('No debería eliminar los datos cuando el nombre no coincide', () => {
        practica.eliminarDatos("Practica2");

        expect(practica.nombre).toBe("Practica1");
        expect(practica.descripcion).toBe("Descripción de la práctica");
        expect(practica.fecha).toBe("2024-10-16");
        expect(practica.enlace).toBe("http://enlace.com");
        expect(practica.tipo).toBeUndefined(); 
    });
}); 


describe('Pruebas para la función editarDatos', () => {
    let practica;
  
    beforeEach(() => {
      practica = new Practicas();
      practica.cargarDatos("Practica Inicial", "Descripción Inicial", "2024-10-15", "http://inicial.com");
    });
  
    test('debería editar los datos correctamente', () => {
      const nuevoNombre = "Practica1";
      const nuevaDescripcion = "Nueva Descripción";
      const nuevaFecha = "2024-10-17";
      const nuevoEnlace = "http://nuevoenlace.com";
      const nuevoTipo = "Nuevo Tipo";
      
      practica.editarDatos(nuevoNombre, nuevaDescripcion, nuevaFecha, nuevoEnlace, nuevoTipo);
  
      expect(practica.nombre).toBe(nuevoNombre);
      expect(practica.descripcion).toBe(nuevaDescripcion);
      expect(practica.fecha).toBe(nuevaFecha);
      expect(practica.enlace).toBe(nuevoEnlace);
      expect(practica.tipo).toBe(nuevoTipo);
    });
  });

  describe('Pruebas para la función eliminarMetrica()', () => {
    let practica;
    let moduloMetricas;

    beforeEach(() => {
        practica = new Practicas();
        moduloMetricas = new ModuloMetricas();
        practica.ModuloMetricas = moduloMetricas; 
    });

    test('debería eliminar una métrica dado un numeroCommit válido', () => {
        const numeroCommit = 1; 
        const eliminarSpy = jest.spyOn(moduloMetricas, 'eliminarMetricaCommit');

        practica.eliminarMetrica(numeroCommit);

        expect(eliminarSpy).toHaveBeenCalledWith(numeroCommit);
    });
});

describe('Pruebas para la función contarPruebas()', () => {
  
    let practica;
  
    beforeEach(() => {
      practica = new Practicas();
    });
  
    test('Debe devolver el número correcto de pruebas cuando hay múltiples pruebas', () => {
      practica.pruebas = ['Prueba 1', 'Prueba 2', 'Prueba 3'];
      expect(practica.contarPruebas()).toBe(3);
    });
  });

  describe('Pruebas para la función obtenerRecomendacion()', () => {
    let practica;
    
    beforeEach(() => {
      practica = new Practicas();
      practica.ModuloMetricas.desplegarMetrica = jest.fn(); // Mockear el método de mostrarMetricas
    });
  
    test('Debe devolver "no existen commits" cuando no hay commits', () => {
      practica.ModuloMetricas.desplegarMetrica.mockReturnValue([]);
      expect(practica.obtenerRecomendacion()).toBe("no existen commits");
    });
  
    test('Debe devolver mensaje positivo cuando el número de commits es igual al de pruebas', () => {
      practica.ModuloMetricas.desplegarMetrica.mockReturnValue([1, 2, 3]);
      practica.pruebas = ["Prueba 1", "Prueba 2", "Prueba 3"];
      expect(practica.obtenerRecomendacion()).toBe("el numero de pruebas agregadas fue agregada de buena manera, buen trabajo!");
    });
  
    test('Debe devolver mensaje negativo cuando el número de commits es diferente al de pruebas', () => {
      practica.ModuloMetricas.desplegarMetrica.mockReturnValue([1, 2, 3, 4]);
      practica.pruebas = ["Prueba 1", "Prueba 2"];
      expect(practica.obtenerRecomendacion()).toBe("el numero de pruebas agregadas fue implementada de muy mala forma, ten cuidado!");
    });
  
    test('Debe manejar el caso límite cuando hay un commit y una prueba (sin coincidencias exactas)', () => {
      practica.ModuloMetricas.desplegarMetrica.mockReturnValue([1]);
      practica.pruebas = ["Prueba 1"];
      expect(practica.obtenerRecomendacion()).toBe("el numero de pruebas agregadas fue agregada de buena manera, buen trabajo!"); 
    });
  });
