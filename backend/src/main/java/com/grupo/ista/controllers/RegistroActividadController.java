package com.grupo.ista.controllers;

import com.grupo.ista.models.TRegistroActividad;
import com.grupo.ista.services.RegistroActividadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/actividades")
@CrossOrigin(origins = "http://localhost:4200")
public class RegistroActividadController {

    @Autowired
    private RegistroActividadService actividadService;

    @PostMapping
    public TRegistroActividad registrar(@RequestBody TRegistroActividad actividad) {
        return actividadService.registrarActividad(actividad);
    }

    @GetMapping("/usuario/{usuarioId}")
    public List<TRegistroActividad> listarPorUsuario(@PathVariable Long usuarioId) {
        return actividadService.listarPorUsuario(usuarioId);
    }
}
