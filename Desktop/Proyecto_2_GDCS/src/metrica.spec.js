import Metrica from "./metrica.js";


describe("Test para getNumeroCommit()", () => {
    it("Debe retornar el numero de commit con el que se inicializa", () => {
      let metrica = new Metrica(1);
  
      expect(metrica.getNumeroCommit()).toEqual(1);
    });
  });

describe("Test para getPuntaje()", () => {
    it("Debe retornar el puntaje predeterminado de la metrica", () => {
      let metrica = new Metrica(1);
  
      expect(metrica.getPuntaje()).toEqual(0);
    });
  });

describe("Test para getExplicacion()", () => {
    it("Debe retornar la explicacion de la metrica", () => {
      let metrica = new Metrica(1, "Este commit esta incompleto");
  
      expect(metrica.getExplicacion()).toEqual("Este commit esta incompleto");
    });
  });
  
describe("Test para getFrecuencia()", () => {
  it("Debe retornar la frecuencia inicializada de la metrica", () => {
      let metrica = new Metrica(1);
  
      expect(metrica.getFrecuencia()).toEqual(null);
    });
  });

describe("Test para getTipo()", () => {
    it("Debe retornar el tipo inicializado en el constructor de la metrica", () => {
        let metrica = new Metrica(1);
    
        expect(metrica.getTipo()).toEqual('convencional');
    });
  });

describe("Tests para cargarMetricas()", () => {
  it("Debe registrar las metricas cargadas con la funcion en la variable metrica si es convencional", () => {
    let metrica = new Metrica(1, "Commit inicializado automaticamente");

    metrica.cargarMetricas(100, 16, 80, "Bueno", 1);
    expect(metrica.pruebas).toEqual(100);
    expect(metrica.cantidadLineas).toEqual(16);
    expect(metrica.cobertura).toEqual(80);
    expect(metrica.complejidad).toEqual("Bueno");
    expect(metrica.getFrecuencia()).toEqual(1);
  });

  it("Debe registrar las metricas con valores null, porque el tipo no es convencional", () => {
    let metrica = new Metrica(1, "Commit inicializado automaticamente", "Refactorizacion");

    metrica.cargarMetricas(100, 16, 80, "Bueno", 1);
    expect(metrica.pruebas).toEqual(null);
    expect(metrica.cantidadLineas).toEqual(null);
    expect(metrica.cobertura).toEqual(null);
    expect(metrica.complejidad).toEqual(null);
    expect(metrica.getFrecuencia()).toEqual(null);
    expect(metrica.getPuntaje()).toEqual(0);
  });
});

describe("Tests para calcularPuntajePorCantidadLineas()", () => {
  it("Debe retornar el puntaje de 20, dado que las lineas aniadidas en el commit son 10", () => {
      let metrica = new Metrica(1, "Commit inicializado automaticamente");
      let cantidadLineas = 10;

      expect(metrica.calcularPuntajePorCantidadLineas(cantidadLineas)).toEqual(20);
  });

  it("Debe retornar el puntaje de 16, dado que las lineas aniadidas en el commit son 30", () => {
    let metrica = new Metrica(1, "Commit inicializado automaticamente");
    let cantidadLineas = 30;

    expect(metrica.calcularPuntajePorCantidadLineas(cantidadLineas)).toEqual(16);
  });
    
  it("Debe retornar el puntaje de 12, dado que las lineas aniadidas en el commit son 50", () => {
    let metrica = new Metrica(1, "Commit inicializado automaticamente");
    let cantidadLineas = 50;

    expect(metrica.calcularPuntajePorCantidadLineas(cantidadLineas)).toEqual(12);
  });
    
  it("Debe retornar el puntaje de 8, dado que las lineas aniadidas en el commit son 70", () => {
    let metrica = new Metrica(1, "Commit inicializado automaticamente");
    let cantidadLineas = 70;

    expect(metrica.calcularPuntajePorCantidadLineas(cantidadLineas)).toEqual(8);
  });
    
  it("Debe retornar el puntaje de 0, dado que las lineas aniadidas en el commit esten fuera del rango como numeros negativos", () => {
    let metrica = new Metrica(1, "Commit inicializado automaticamente");
    let cantidadLineas = -1;

    expect(metrica.calcularPuntajePorCantidadLineas(cantidadLineas)).toEqual(0);
  });
});

describe("Tests para calcularPuntajePorCobertura()", () => {
  it("Debe retornar el puntaje de 8, dado que el porcentaje de cobertura alcanzada es 50", () => {
      let metrica = new Metrica(1, "Commit inicializado automaticamente");
      let cobertura = 50;

      expect(metrica.calcularPuntajePorCobertura(cobertura)).toEqual(8);
  });

  it("Debe retornar el puntaje de 12, dado que el porcentaje de cobertura alcanzada es 75", () => {
    let metrica = new Metrica(1, "Commit inicializado automaticamente");
    let cobertura = 75;

    expect(metrica.calcularPuntajePorCobertura(cobertura)).toEqual(12);
  });

  it("Debe retornar el puntaje de 16, dado que el porcentaje de cobertura alcanzada es 85", () => {
    let metrica = new Metrica(1, "Commit inicializado automaticamente");
    let cobertura = 85;

    expect(metrica.calcularPuntajePorCobertura(cobertura)).toEqual(16);
  });
    
  it("Debe retornar el puntaje de 20, dado que el porcentaje de cobertura alcanzada es 100", () => {
    let metrica = new Metrica(1, "Commit inicializado automaticamente");
    let cobertura = 100;

    expect(metrica.calcularPuntajePorCobertura(cobertura)).toEqual(20);
  });
    
  it("Debe retornar el puntaje de 0, dado que el porcentaje de cobertura alcanzada este fuera de los rangos como -1", () => {
    let metrica = new Metrica(1, "Commit inicializado automaticamente");
    let cobertura = -1;

    expect(metrica.calcularPuntajePorCobertura(cobertura)).toEqual(0);
  });
});

describe("Tests para calcularPuntajePorComplejidad()", () => {
  it("Debe retornar el puntaje de 20, dado que la complejidad de funciones agregadas sea excelente", () => {
      let metrica = new Metrica(1, "Commit inicializado automaticamente");
      let complejidad = "Excelente";

      expect(metrica.calcularPuntajePorComplejidad(complejidad)).toEqual(20);
  });

  it("Debe retornar el puntaje de 16, dado que la complejidad de funciones agregadas sea buena", () => {
    let metrica = new Metrica(1, "Commit inicializado automaticamente");
    let complejidad = "Bueno";

    expect(metrica.calcularPuntajePorComplejidad(complejidad)).toEqual(16);
  });

  it("Debe retornar el puntaje de 12, dado que la complejidad de funciones agregadas sea regular", () => {
    let metrica = new Metrica(1, "Commit inicializado automaticamente");
    let complejidad = "Regular";

    expect(metrica.calcularPuntajePorComplejidad(complejidad)).toEqual(12);
  });
    
  it("Debe retornar el puntaje de 8, dado que la complejidad de funciones agregadas sea deficiente", () => {
    let metrica = new Metrica(1, "Commit inicializado automaticamente");
    let complejidad = "Deficiente";

    expect(metrica.calcularPuntajePorComplejidad(complejidad)).toEqual(8);
  });
    
  it("Debe retornar el puntaje de 0, dado que la complejidad de funciones no este registrada dentro de los paramentros como ninguna", () => {
    let metrica = new Metrica(1, "Commit inicializado automaticamente");
    let complejidad = "Ninguno";

    expect(metrica.calcularPuntajePorComplejidad(complejidad)).toEqual(0);
  });
});