package com.rian.task_manager.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

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

    //cria o token passando o name no subjetc,data e expiração e assinatura,por fim tranforma em string
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

    //criptografar a chave q esta no yaml por questão de segurança
    private SecretKey getSigningKey(){
        return Keys.hmacShaKeyFor(key.getBytes());
    }

    //extrair informacoes do token apos validar
    public String getUsername(String token){
        return getClaims(token).getSubject();
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

    private Claims getClaims(String token){
        return Jwts.parser()                 // cria um leitor de JWT
                .verifyWith(getSigningKey()) // define a chave pra verificar a assinatura
                .build()
                .parseSignedClaims(token)    // lê o token e valida a assinatura
                .getPayload();               // retorna os dados de dentro
    }




}
