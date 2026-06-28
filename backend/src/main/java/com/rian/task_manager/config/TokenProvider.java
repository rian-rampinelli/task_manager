package com.rian.task_manager.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.ExemptionMechanismException;
import javax.crypto.SecretKey;

import java.util.Date;

@Component
public class TokenProvider {

    @Value("${jwt.expiration}")
    private Long expirationTime;

    @Value("${jwt.key}")
    private String key;

    //gerar um token
    public String gerarToken(Authentication authentication){
        UserDetails user = (UserDetails)authentication.getPrincipal();
        return buildToken(user.getUsername());

    }

    public String buildToken(String userName){
        Date now = new Date();
        Date expiration = new Date(now.getTime() + expirationTime);

        return Jwts.builder()
                .subject(userName)
                .issuedAt(now)
                .expiration(expiration)
                .signWith(getSigningKey())
                .compact();
    }

    private SecretKey getSigningKey(){
        return Keys.hmacShaKeyFor(key.getBytes());
    }


    //validar um token
    public boolean isTokenValid(String token){
        try{
            getClaims(token);
            return true;

        }catch (Exception e){
            return false;
        }
    }



    //extrair informacoes do token

    private String getUsername(String token){
        return getClaims(token).getSubject();
    }


    private Claims getClaims(String token){
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }




}
