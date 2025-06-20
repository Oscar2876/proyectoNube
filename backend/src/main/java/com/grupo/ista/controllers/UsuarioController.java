package com.grupo.ista.controllers;

import com.grupo.ista.models.TUsuario;
import com.grupo.ista.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:4200")

public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/registrar")
    public TUsuario registrarUsuario(@RequestBody TUsuario usuario) {
        return usuarioService.registrarUsuario(usuario);
    }

    @GetMapping("/veruser")
    public List<TUsuario> listarUsuarios() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Autenticado como: " + authentication.getName());
        System.out.println("Roles: " + authentication.getAuthorities());
        return usuarioService.listarUsuarios();
    }

    @GetMapping("/{id}")
    public TUsuario obtenerPorId(@PathVariable Long id) {
        return usuarioService.buscarPorId(id);
    }

    @DeleteMapping("/{id}")
    public void eliminarUsuario(@PathVariable Long id) {
        usuarioService.eliminarUsuario(id);
    }
}
