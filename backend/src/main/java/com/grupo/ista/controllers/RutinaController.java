package com.grupo.ista.controllers;

import com.grupo.ista.models.TRutina;
import com.grupo.ista.services.RutinaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rutinas")
@CrossOrigin(origins = "http://localhost:4200")
public class RutinaController {

    @Autowired
    private RutinaService rutinaService;

    @PostMapping
    public TRutina crearRutina(@RequestBody TRutina rutina) {
        return rutinaService.crearRutina(rutina);
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<TRutina> listarRutinasPorUsuario(@PathVariable Long usuarioId) {
        return rutinaService.obtenerRutinasPorUsuario(usuarioId);
    }
}
