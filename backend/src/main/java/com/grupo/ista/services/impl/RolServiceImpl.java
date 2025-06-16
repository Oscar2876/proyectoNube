package com.grupo.ista.services.impl;

import com.grupo.ista.models.TRol;
import com.grupo.ista.repositories.RolRepository;
import com.grupo.ista.services.RolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RolServiceImpl implements RolService {

    @Autowired
    private RolRepository rolRepository;

@Override
public TRol obtenerPorNombre(String nombre) {
    return rolRepository.findByNombre(nombre)
            .orElseThrow(() -> new RuntimeException("Rol no encontrado"));
}

}

