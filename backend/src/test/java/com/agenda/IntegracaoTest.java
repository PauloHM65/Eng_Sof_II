package com.agenda;

import com.agenda.model.CategoriaProfissional;
import com.agenda.model.Paciente;
import com.agenda.model.ProfissionalSaude;
import com.agenda.repository.PacienteRepository;
import com.agenda.repository.ProfissionalSaudeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ActiveProfiles("test") // Usa o application-test.properties (H2 em memória)
@Transactional
public class IntegracaoTest {

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private ProfissionalSaudeRepository profissionalRepository;

    @Test
    public void testSalvarEBuscarPacienteEProfissional() {
        // 1. Salvar Paciente
        Paciente paciente = new Paciente();
        paciente.setNome("Carlos Silva");
        paciente.setCpf("12345678901");
        paciente.setTelefone("11999999999");
        Paciente pacienteSalvo = pacienteRepository.save(paciente);
        
        assertNotNull(pacienteSalvo.getId());
        
        // 2. Salvar Profissional
        ProfissionalSaude profissional = new ProfissionalSaude();
        profissional.setNome("Dra. Ana");
        profissional.setCategoria(CategoriaProfissional.MEDICO);
        ProfissionalSaude profSalvo = profissionalRepository.save(profissional);

        assertNotNull(profSalvo.getId());

        // 3. Buscar no banco
        Paciente pacienteBuscado = pacienteRepository.findById(pacienteSalvo.getId()).orElse(null);
        assertNotNull(pacienteBuscado);
        assertEquals("Carlos Silva", pacienteBuscado.getNome());
    }
}
