import ModuloMetricas from './moduloMetricas.js';
import Metrica from './metrica.js';

// Mock manual para la clase Metrica
jest.mock('./metrica.js', () => {
    return jest.fn().mockImplementation((numeroCommit, explicacion, tipo) => {
        const metricaMock = {
            numeroCommit,
            explicacion,
            tipo,
            pruebas: null,
            cobertura: null,
            cantidadLineas: null,
            complejidad: null,
            frecuencia: null,
            cargarMetricas: jest.fn((pruebas, cobertura, cantidadLineas, complejidad, frecuencia) => {
                
                metricaMock.pruebas = pruebas;
                metricaMock.cobertura = cobertura;
                metricaMock.cantidadLineas = cantidadLineas;
                metricaMock.complejidad = complejidad;
                metricaMock.frecuencia = frecuencia;
            }),
            getNumeroCommit: jest.fn(() => numeroCommit),
            getExplicacion: jest.fn(() => explicacion),
            getTipo: jest.fn(() => tipo),
            getPuntaje: jest.fn(() => 100), 
        };
        return metricaMock;
    });
});

describe('Pruebas para anadirMetricaCommit()', () => {
    let moduloMetricas;

    beforeEach(() => {
        moduloMetricas = new ModuloMetricas();
    });

    test('agrega una nueva métrica si no existe', () => {
        moduloMetricas.anadirMetricaCommit(1, 'Explicación del commit', 'Pruebas ejecutadas', 80, 100, 5, 'tipo1', 3);

        expect(moduloMetricas.arregloMetrica.length).toBe(1); 
        expect(moduloMetricas.arregloMetrica[0].numeroCommit).toBe(1); 
    });

    test('actualiza una métrica ya existe ', () => {
    
        moduloMetricas.anadirMetricaCommit(1, 'Explicación del commit', 'Pruebas ejecutadas', 80, 100, 5, 'tipo1', 3);
        moduloMetricas.anadirMetricaCommit(1, 'Explicación actualizada', 'Pruebas actualizadas', 90, 120, 4, 'tipo2', 2);

        expect(moduloMetricas.arregloMetrica.length).toBe(1); 
        const metricaActualizada = moduloMetricas.arregloMetrica[0];
        expect(metricaActualizada.explicacion).toBe('Explicación actualizada');
        expect(metricaActualizada.pruebas).toBe('Pruebas actualizadas');
        expect(metricaActualizada.cobertura).toBe(90);
        expect(metricaActualizada.cantidadLineas).toBe(120);
        expect(metricaActualizada.complejidad).toBe(4);
        expect(metricaActualizada.tipo).toBe('tipo2');
        expect(metricaActualizada.frecuencia).toBe(2);
    });
});


