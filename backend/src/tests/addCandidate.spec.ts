import { addCandidate } from '../application/services/candidateService';
import { Candidate } from '../domain/models/Candidate';

jest.mock('../domain/models/Candidate');

const mockSave = jest.fn();
(Candidate as any).mockImplementation(() => ({ save: mockSave }));

describe('Servicio addCandidate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe guardar un candidato con educación y experiencia correctamente', async () => {
    mockSave.mockResolvedValue({ id: 1 });
    const data = {
      firstName: 'Ana', lastName: 'García', email: 'ana@correo.com',
      educations: [{ institution: 'UC3M', title: 'Ingeniería', startDate: '2010-01-01', endDate: '2014-01-01' }],
      workExperiences: [{ company: 'Empresa', position: 'Dev', startDate: '2015-01-01', endDate: '2018-01-01' }],
      cv: { filePath: 'cv.pdf', fileType: 'application/pdf' }
    };
    const result = await addCandidate(data);
    expect(mockSave).toHaveBeenCalled();
    expect(result.id).toBe(1);
  });

  it('debe manejar error por email duplicado (P2002)', async () => {
    mockSave.mockRejectedValue({ code: 'P2002' });
    const data = { firstName: 'Ana', lastName: 'García', email: 'ana@correo.com' };
    await expect(addCandidate(data)).rejects.toThrow('El email ya está registrado');
  });

  it('debe manejar otros errores inesperados', async () => {
    mockSave.mockRejectedValue(new Error('Error inesperado'));
    const data = { firstName: 'Ana', lastName: 'García', email: 'ana@correo.com' };
    await expect(addCandidate(data)).rejects.toThrow('Error inesperado');
  });

  it('debe invocar el método save() del modelo Candidate', async () => {
    mockSave.mockResolvedValue({ id: 2 });
    const data = { firstName: 'Luis', lastName: 'Martínez', email: 'luis@correo.com' };
    await addCandidate(data);
    expect(mockSave).toHaveBeenCalledTimes(1);
  });
});
