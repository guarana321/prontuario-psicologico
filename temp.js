const urlParams = new URLSearchParams(window.location.search);
        const pacienteId = urlParams.get('id');

        if (!pacienteId || pacienteId === 'null') {
            window.location.href = 'patients.html';
        } else {
            const patientNameEl = document.getElementById('patient-name');
        const patientEmailEl = document.getElementById('patient-email');
        const sessionForm = document.getElementById('session-form');
        const sessionsList = document.getElementById('sessions-list');
        const emptyState = document.getElementById('empty-state');

        async function loadData() {
            // Load Patient Info
            const patient = await getPatient(pacienteId);
            if (patient) {
                patientNameEl.textContent = patient.Nome;
                patientEmailEl.textContent = patient.email;
            } else {
                patientNameEl.textContent = "Paciente nÃ£o encontrado";
            }

            // Load Sessions
            const sessions = await getSessions(pacienteId);
            sessionsList.innerHTML = '';

            if (sessions.length === 0) {
                emptyState.style.display = 'block';
            } else {
                emptyState.style.display = 'none';
                
                sessions.forEach(sessao => {
                    const date = new Date(sessao.data_sessao);
                    const formattedDate = date.toLocaleDateString('pt-BR', { timeZone: 'UTC' }) + ' ' + (date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) !== '00:00' ? date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '');
                    
                    const div = document.createElement('div');
                    div.className = 'session-item fade-in';
                    div.innerHTML = `
                        <div class="session-date">SessÃ£o em ${formattedDate}</div>
                        <div class="session-notes">${sessao.anotacoes}</div>
                    `;
                    sessionsList.appendChild(div);
                });
            }
        }

        sessionForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const data_sessao = document.getElementById('data_sessao').value;
            const anotacoes = document.getElementById('anotacoes').value;

            const success = await createSession(pacienteId, data_sessao, anotacoes);
            
            if (success) {
                sessionForm.reset();
                loadData();
            }
        });

        loadData();
        } // close the else block
