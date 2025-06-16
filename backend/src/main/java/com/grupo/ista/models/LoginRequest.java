package com.grupo.ista.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    private String nombre;
    private String correo;
    private String clave;
    private String rol; 
}
