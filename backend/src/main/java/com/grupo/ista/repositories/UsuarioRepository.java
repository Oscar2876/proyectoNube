package com.grupo.ista.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.grupo.ista.models.TUsuario;

public interface UsuarioRepository extends JpaRepository<TUsuario, Long> {
     Optional<TUsuario> findByCorreo(String correo);
    boolean existsByCorreo(String correo);
}
