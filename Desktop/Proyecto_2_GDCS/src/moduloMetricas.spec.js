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


describe('pruebas para buscarMetricaPorCommit()', () => {
    let moduloMetricas;

    beforeEach(() => {
        moduloMetricas = new ModuloMetricas();
    });

    test('la funcion encuentra la métrica si ya existe', () => {
        moduloMetricas.arregloMetrica = [
            { numeroCommit: 1, explicacion: 'Explicación 1' },
            { numeroCommit: 2, explicacion: 'Explicación 2' },
            { numeroCommit: 3, explicacion: 'Explicación 3' }
        ];

        const resultado = moduloMetricas.buscarMetricaPorCommit(2);
        expect(resultado).toEqual({ numeroCommit: 2, explicacion: 'Explicación 2' });
    });

    test('la funcion devuelve undefined si el commit no existe', () => {
        moduloMetricas.arregloMetrica = [
            { numeroCommit: 1, explicacion: 'Explicación 1' },
            { numeroCommit: 2, explicacion: 'Explicación 2' },
            { numeroCommit: 3, explicacion: 'Explicación 3' }
        ];

        const resultado = moduloMetricas.buscarMetricaPorCommit(5);
        expect(resultado).toBeUndefined();
    });

    test('la funcion devuelve undefined si el arreglo está vacío', () => {
        
        moduloMetricas.arregloMetrica = [];

        const resultado = moduloMetricas.buscarMetricaPorCommit(1);
        expect(resultado).toBeUndefined();
    });
});


describe('prueba para la funcion actualizarMetricaExistente() ', () => {
    let moduloMetricas;
    let metrica;

    beforeEach(() => {
        moduloMetricas = new ModuloMetricas();
        metrica = {
            explicacion: 'Explicación antigua',
            pruebas: 'Pruebas antiguas',
            cobertura: 75,
            cantidadLineas: 100,
            complejidad: 'Alta',
            tipo: 'Tipo Original',
            frecuencia: 2
        };
    });

    test('la funcion actualiza correctamente una métrica existente', () => {
        moduloMetricas.actualizarMetricaExistente(
            metrica,
            'Nueva Explicación',
            'Pruebas Nuevas',
            85,
            150,
            'Baja',
            'Tipo Modificado',
            4
        );

        expect(metrica.explicacion).toBe('Nueva Explicación');
        expect(metrica.pruebas).toBe('Pruebas Nuevas');
        expect(metrica.cobertura).toBe(85);
        expect(metrica.cantidadLineas).toBe(150);
        expect(metrica.complejidad).toBe('Baja');
        expect(metrica.tipo).toBe('Tipo Modificado');
        expect(metrica.frecuencia).toBe(4);
    });
});