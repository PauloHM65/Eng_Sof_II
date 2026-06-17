package com.agenda.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "receitas")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Receita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(name = "tipo_recomendacao")
    private String tipoRecomendacao; // Ex: Remédio, Atividade Física, etc.

    @ManyToOne
    @JoinColumn(name = "atendimento_id")
    @JsonIgnoreProperties({"receitas", "exames", "profissional", "paciente"})
    private Atendimento atendimento;
}
