package com.grupo.ista.controllers;

import com.grupo.ista.models.TComentario;
import com.grupo.ista.services.ComentarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comentarios")
@CrossOrigin(origins = "http://localhost:4200")
public class ComentarioController {

    @Autowired
    private ComentarioService comentarioService;

    @PostMapping
    public TComentario enviarComentario(@RequestBody TComentario comentario) {
        return comentarioService.guardarComentario(comentario);
    }

    @GetMapping("/usuario/{idUsuario}")
    public List<TComentario> verComentariosPorUsuario(@PathVariable Long idUsuario) {
        return comentarioService.listarPorUsuario(idUsuario);
    }

    @GetMapping("/entrenador/{idEntrenador}")
    public List<TComentario> verComentariosPorEntrenador(@PathVariable Long idEntrenador) {
        return comentarioService.listarPorEntrenador(idEntrenador);
    }
}
