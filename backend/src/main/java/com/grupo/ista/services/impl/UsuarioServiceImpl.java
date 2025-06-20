package com.grupo.ista.services.impl;

import com.grupo.ista.models.TUsuario;
import com.grupo.ista.repositories.UsuarioRepository;
import com.grupo.ista.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public TUsuario registrarUsuario(TUsuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @Override
    public List<TUsuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    @Override
    public TUsuario buscarPorId(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

   @Override
public TUsuario buscarPorCorreo(String correo) {
    return usuarioRepository.findByCorreo(correo)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
}


    @Override
    public void eliminarUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }
    
}
