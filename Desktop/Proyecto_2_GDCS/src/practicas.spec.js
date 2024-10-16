import Practicas from "./practicas.js";

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

  