package com.grupo.ista.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.grupo.ista.models.TRol;

public interface RolRepository extends JpaRepository<TRol, Long> {
   Optional<TRol> findByNombre(String nombre);

}
