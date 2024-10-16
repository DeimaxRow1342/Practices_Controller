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

describe("Test para cargarMetricas()", () => {
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

  describe("Test para cargarMetricas()", () => {
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

  describe("Test para calcularPuntajePorCantidadLineas()", () => {
    it("Debe retornar el puntaje, calculandolo por la cantidad de lineas", () => {
        let metrica = new Metrica(1, "Commit inicializado automaticamente");
        let cantidadLineas = 10;

        expect(metrica.calcularPuntajePorCantidadLineas(cantidadLineas)).toEqual(20);
    });

    it("Debe retornar el puntaje, calculandolo por la cantidad de lineas", () => {
      let metrica = new Metrica(1, "Commit inicializado automaticamente");
      let cantidadLineas = 30;

      expect(metrica.calcularPuntajePorCantidadLineas(cantidadLineas)).toEqual(16);
    });
    it("Debe retornar el puntaje, calculandolo por la cantidad de lineas", () => {
      let metrica = new Metrica(1, "Commit inicializado automaticamente");
      let cantidadLineas = 50;

      expect(metrica.calcularPuntajePorCantidadLineas(cantidadLineas)).toEqual(12);
    });
    it("Debe retornar el puntaje, calculandolo por la cantidad de lineas", () => {
      let metrica = new Metrica(1, "Commit inicializado automaticamente");
      let cantidadLineas = 70;

      expect(metrica.calcularPuntajePorCantidadLineas(cantidadLineas)).toEqual(8);
    });
    it("Debe retornar el puntaje, calculandolo por la cantidad de lineas", () => {
      let metrica = new Metrica(1, "Commit inicializado automaticamente");
      let cantidadLineas = -1;

      expect(metrica.calcularPuntajePorCantidadLineas(cantidadLineas)).toEqual(0);
    });
  });