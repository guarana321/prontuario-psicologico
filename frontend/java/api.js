// Auto-detect environment: localhost in dev, Render URL in production
const API_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? 'http://localhost:3333'
  : 'https://prontuario-backend-4rgw.onrender.com';

// Fetch all patients
async function getPatients() {
    try {
        const response = await fetch(`${API_URL}/Pacientes`, { cache: 'no-store' });
        if (!response.ok) throw new Error('Erro ao buscar pacientes');
        return await response.json();
    } catch (error) {
        console.error(error);
        alert(error.message);
        return [];
    }
}

// Fetch single patient
async function getPatient(id) {
    try {
        const response = await fetch(`${API_URL}/Pacientes/${id}`, { cache: 'no-store' });
        if (!response.ok) throw new Error('Erro ao buscar paciente');
        return await response.json();
    } catch (error) {
        console.error(error);
        alert(error.message);
        return null;
    }
}

// Create a new patient
async function createPatient(nome, email, idade, telefone, data_nascimento, observacoes) {
    try {
        const response = await fetch(`${API_URL}/Pacientes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Nome: nome, email, Idade: idade, telefone, data_nascimento, observacoes })
        });
        
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.error || 'Erro ao criar paciente');
        return data;
    } catch (error) {
        console.error(error);
        alert(error.message);
        return null;
    }
}

// Update a patient
async function updatePatient(id, nome, email, idade, telefone, data_nascimento, observacoes) {
    try {
        const response = await fetch(`${API_URL}/Pacientes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Nome: nome, email, Idade: idade, telefone, data_nascimento, observacoes })
        });
        
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || data.message || 'Erro ao atualizar paciente');
        return data;
    } catch (error) {
        console.error(error);
        alert(error.message);
        return null;
    }
}

// Delete a patient
async function deletePatient(id) {
    try {
        const response = await fetch(`${API_URL}/Pacientes/${id}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || data.message || 'Erro ao deletar paciente');
        return true;
    } catch (error) {
        console.error(error);
        alert(error.message);
        return false;
    }
}

// Fetch sessions for a patient
async function getSessions(pacienteId) {
    try {
        const response = await fetch(`${API_URL}/Pacientes/${pacienteId}/sessoes`, { cache: 'no-store' });
        if (!response.ok) throw new Error('Erro ao buscar sessões');
        return await response.json();
    } catch (error) {
        console.error(error);
        alert(error.message);
        return [];
    }
}

// Create a new session
async function createSession(pacienteId, data_sessao, anotacoes) {
    try {
        const response = await fetch(`${API_URL}/Pacientes/${pacienteId}/sessoes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data_sessao, anotacoes })
        });
        
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Erro ao criar sessão');
        return data;
    } catch (error) {
        console.error(error);
        alert(error.message);
        return null;
    }
}

// Fetch a single session by ID
async function getSession(id) {
    try {
        const response = await fetch(`${API_URL}/Sessoes/${id}`, { cache: 'no-store' });
        if (!response.ok) throw new Error('Erro ao buscar sessão');
        return await response.json();
    } catch (error) {
        console.error(error);
        alert(error.message);
        return null;
    }
}

// Update an existing session
async function updateSession(id, data_sessao, anotacoes) {
    try {
        const response = await fetch(`${API_URL}/Sessoes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data_sessao, anotacoes })
        });
        
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Erro ao atualizar sessão');
        return data;
    } catch (error) {
        console.error(error);
        alert(error.message);
        return null;
    }
}
