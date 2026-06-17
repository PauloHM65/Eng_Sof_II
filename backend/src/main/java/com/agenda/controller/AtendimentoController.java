package com.agenda.controller;

import com.agenda.model.Atendimento;
import com.agenda.repository.AtendimentoRepository;
import com.agenda.repository.PacienteRepository;
import com.agenda.repository.ProfissionalSaudeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/atendimentos")
@CrossOrigin(origins = "*")
public class AtendimentoController {

    @Autowired
    private AtendimentoRepository atendimentoRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private ProfissionalSaudeRepository profissionalRepository;

    @GetMapping
    public List<Atendimento> listar() {
        return atendimentoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Atendimento> buscarPorId(@PathVariable Long id) {
        return atendimentoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> criar(@RequestBody Atendimento atendimento) {
        if (atendimento.getPaciente() == null || atendimento.getPaciente().getId() == null) {
            return ResponseEntity.badRequest().body("ID do Paciente é obrigatório.");
        }
        if (atendimento.getProfissional() == null || atendimento.getProfissional().getId() == null) {
            return ResponseEntity.badRequest().body("ID do Profissional é obrigatório.");
        }

        boolean pacienteExiste = pacienteRepository.existsById(atendimento.getPaciente().getId());
        boolean profissionalExiste = profissionalRepository.existsById(atendimento.getProfissional().getId());

        if (!pacienteExiste || !profissionalExiste) {
            return ResponseEntity.badRequest().body("Paciente ou Profissional não encontrado.");
        }
        
        // Garante que o atendimento gerencie corretamente a relação com as listas
        if(atendimento.getReceitas() != null) {
            atendimento.getReceitas().forEach(r -> r.setAtendimento(atendimento));
        }
        if(atendimento.getExames() != null) {
            atendimento.getExames().forEach(e -> e.setAtendimento(atendimento));
        }

        Atendimento salvo = atendimentoRepository.save(atendimento);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Atendimento> atualizar(@PathVariable Long id, @RequestBody Atendimento atualizado) {
        return atendimentoRepository.findById(id)
                .map(atendimento -> {
                    atendimento.setData(atualizado.getData());
                    atendimento.setHorario(atualizado.getHorario());
                    atendimento.setProblemaTexto(atualizado.getProblemaTexto());
                    return ResponseEntity.ok(atendimentoRepository.save(atendimento));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!atendimentoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        atendimentoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
