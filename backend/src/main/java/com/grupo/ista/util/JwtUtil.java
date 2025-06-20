package com.grupo.ista.util;

import com.grupo.ista.models.TUsuario;
import com.grupo.ista.repositories.UsuarioRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    private final SecretKey SECRET_KEY = Keys.hmacShaKeyFor(
        "zZ8#Kf7r9TbH2vLxYcEoQwRaSuDhGm1NjXpBoIlUzWtCvMaRKeLgTxVnSzBuEj6F".getBytes()
    );

    private final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 hora

    @Autowired
    private UsuarioRepository usuarioRepository;

    public String generarToken(String correo,String nombre) {
        TUsuario usuario = usuarioRepository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Map<String, Object> claims = new HashMap<>();
        claims.put("id", usuario.getId());
        claims.put("rol",usuario.getRol().getNombre().toUpperCase());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(correo)
                .claim("nombre", nombre)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS512)
                .compact();
    }

    public String obtenerCorreoDesdeToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validarToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}