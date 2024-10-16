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