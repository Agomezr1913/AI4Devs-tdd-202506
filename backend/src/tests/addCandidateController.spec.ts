import { addCandidateController } from '../presentation/controllers/candidateController';
import { addCandidate } from '../application/services/candidateService';

jest.mock('../application/services/candidateService');

const mockRequest = (body: any) => ({ body } as any);
const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Controlador addCandidateController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe responder 201 cuando el candidato es válido', async () => {
    (addCandidate as jest.Mock).mockResolvedValue({ id: 1 });
    const req = mockRequest({ firstName: 'Ana', lastName: 'García', email: 'ana@correo.com' });
    const res = mockResponse();
    await addCandidateController(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1 });
  });

  it('debe responder 400 cuando hay errores de validación', async () => {
    (addCandidate as jest.Mock).mockRejectedValue(new Error('Datos inválidos'));
    const req = mockRequest({ firstName: '', lastName: '', email: 'ana@correo.com' });
    const res = mockResponse();
    await addCandidateController(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Datos inválidos' });
  });

  it('debe manejar error por email duplicado', async () => {
    (addCandidate as jest.Mock).mockRejectedValue({ code: 'P2002' });
    const req = mockRequest({ firstName: 'Ana', lastName: 'García', email: 'ana@correo.com' });
    const res = mockResponse();
    await addCandidateController(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'El email ya está registrado' });
  });
});
