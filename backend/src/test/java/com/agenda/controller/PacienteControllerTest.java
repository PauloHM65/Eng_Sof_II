package com.agenda.controller;

import com.agenda.model.Paciente;
import com.agenda.repository.PacienteRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PacienteController.class)
public class PacienteControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PacienteRepository pacienteRepository;

    @Test
    public void testListarPacientes() throws Exception {
        Paciente p1 = new Paciente(1L, "João", "11122233344", "11999999999");
        Mockito.when(pacienteRepository.findAll()).thenReturn(Arrays.asList(p1));

        mockMvc.perform(get("/api/pacientes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nome").value("João"));
    }

    @Test
    public void testCriarPaciente() throws Exception {
        Paciente p = new Paciente(null, "Maria", "55566677788", "11988888888");
        Paciente pSalvo = new Paciente(1L, "Maria", "55566677788", "11988888888");
        
        Mockito.when(pacienteRepository.save(Mockito.any(Paciente.class))).thenReturn(pSalvo);

        String json = "{\"nome\":\"Maria\",\"cpf\":\"55566677788\",\"telefone\":\"11988888888\"}";

        mockMvc.perform(post("/api/pacientes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.nome").value("Maria"));
    }
}
