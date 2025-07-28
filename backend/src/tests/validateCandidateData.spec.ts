import { validateCandidateData } from '../application/validator';

describe('Validación de datos de candidato', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe validar correctamente un candidato con todos los datos válidos', () => {
    const candidato = {
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan.perez@email.com',
      phone: '612345678',
      educations: [{ institution: 'UC3M', title: 'Ingeniería', startDate: '2010-01-01', endDate: '2014-01-01' }],
      workExperiences: [{ company: 'Empresa', position: 'Dev', startDate: '2015-01-01', endDate: '2018-01-01' }],
      cv: { filePath: 'cv.pdf', fileType: 'application/pdf' }
    };
    expect(validateCandidateData(candidato)).toBe(true);
  });

  it('debe fallar si falta el nombre', () => {
    const candidato = { lastName: 'Pérez', email: 'juan@email.com' };
    expect(() => validateCandidateData(candidato)).toThrow('El nombre es obligatorio');
  });

  it('debe fallar si falta el apellido', () => {
    const candidato = { firstName: 'Juan', email: 'juan@email.com' };
    expect(() => validateCandidateData(candidato)).toThrow('El apellido es obligatorio');
  });

  it('debe fallar si falta el email', () => {
    const candidato = { firstName: 'Juan', lastName: 'Pérez' };
    expect(() => validateCandidateData(candidato)).toThrow('El email es obligatorio');
  });

  it('debe fallar si el email es inválido', () => {
    const candidato = { firstName: 'Juan', lastName: 'Pérez', email: 'juan.com' };
    expect(() => validateCandidateData(candidato)).toThrow('El email no es válido');
  });

  it('debe fallar si el teléfono es inválido', () => {
    const candidato = { firstName: 'Juan', lastName: 'Pérez', email: 'juan@email.com', phone: '123456789' };
    expect(() => validateCandidateData(candidato)).toThrow('El teléfono no es válido');
  });

  it('debe fallar si la fecha de educación es inválida', () => {
    const candidato = {
      firstName: 'Juan', lastName: 'Pérez', email: 'juan@email.com',
      educations: [{ institution: 'UC3M', title: 'Ingeniería', startDate: '2010-01-01', endDate: '2014-13-01' }]
    };
    expect(() => validateCandidateData(candidato)).toThrow('La fecha de educación no es válida');
  });

  it('debe fallar si falta institution en educación', () => {
    const candidato = {
      firstName: 'Juan', lastName: 'Pérez', email: 'juan@email.com',
      educations: [{ title: 'Ingeniería', startDate: '2010-01-01', endDate: '2014-01-01' }]
    };
    expect(() => validateCandidateData(candidato)).toThrow('La institución educativa es obligatoria');
  });

  it('debe fallar si falta company en experiencia laboral', () => {
    const candidato = {
      firstName: 'Juan', lastName: 'Pérez', email: 'juan@email.com',
      workExperiences: [{ position: 'Dev', startDate: '2015-01-01', endDate: '2018-01-01' }]
    };
    expect(() => validateCandidateData(candidato)).toThrow('La empresa es obligatoria');
  });

  it('debe fallar si la fecha de experiencia laboral es inválida', () => {
    const candidato = {
      firstName: 'Juan', lastName: 'Pérez', email: 'juan@email.com',
      workExperiences: [{ company: 'Empresa', position: 'Dev', startDate: '2015-01-01', endDate: '2018-13-01' }]
    };
    expect(() => validateCandidateData(candidato)).toThrow('La fecha de experiencia laboral no es válida');
  });

  it('debe fallar si falta filePath en el CV', () => {
    const candidato = {
      firstName: 'Juan', lastName: 'Pérez', email: 'juan@email.com',
      cv: { fileType: 'application/pdf' }
    };
    expect(() => validateCandidateData(candidato)).toThrow('El archivo del CV es obligatorio');
  });

  it('debe fallar si falta fileType en el CV', () => {
    const candidato = {
      firstName: 'Juan', lastName: 'Pérez', email: 'juan@email.com',
      cv: { filePath: 'cv.pdf' }
    };
    expect(() => validateCandidateData(candidato)).toThrow('El tipo de archivo del CV es obligatorio');
  });
});
