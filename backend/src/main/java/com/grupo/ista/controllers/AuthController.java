package com.grupo.ista.controllers;

import com.grupo.ista.models.LoginRequest;
import com.grupo.ista.models.LoginResponse;
import com.grupo.ista.models.RegistroDTO;
import com.grupo.ista.models.TRol;
import com.grupo.ista.models.TUsuario;
import com.grupo.ista.repositories.UsuarioRepository;
import com.grupo.ista.util.JwtUtil;
import com.grupo.ista.repositories.RolRepository;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/auth")
public class AuthController {

        @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    try {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getCorreo(),
                request.getClave()
            )
        );

            TUsuario usuario = usuarioRepository.findByCorreo(request.getCorreo())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        System.out.println(" Autenticado correctamente: " + request.getCorreo());

        String token = jwtUtil.generarToken(request.getCorreo(),usuario.getNombre());
        System.out.println(" Token generado: " + token);

        return ResponseEntity.ok(new LoginResponse(token));
    } catch (Exception e) {
        e.printStackTrace();  
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
    }
}



@PostMapping("/register")
public ResponseEntity<?> register(@RequestBody RegistroDTO request) {
    if (usuarioRepository.existsByCorreo(request.getCorreo())) {
        return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(Map.of("error", "Correo ya registrado"));
    }

    TUsuario nuevo = new TUsuario();
    nuevo.setNombre(request.getNombre());
    nuevo.setCorreo(request.getCorreo());
    nuevo.setClave(passwordEncoder.encode(request.getClave()));

    
    TRol rol = rolRepository.findByNombre("USUARIO")
        .orElseThrow(() -> new RuntimeException("Rol no encontrado"));
    nuevo.setRol(rol);

    usuarioRepository.save(nuevo);

    return ResponseEntity
        .status(HttpStatus.CREATED)
        .body(Map.of("message", "Usuario registrado exitosamente"));
}


}