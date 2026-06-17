package com.agenda.repository;

import com.agenda.model.ExameLab;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExameLabRepository extends JpaRepository<ExameLab, Long> {
}
