
use argon2::{
    password_hash::{
        rand_core::OsRng,
        PasswordHash, PasswordHasher, PasswordVerifier, SaltString
    },
    Argon2
};
use jsonwebtoken::{encode, Header, EncodingKey};
use sqlx::PgPool;
use anyhow::{Result, Context, anyhow};
use uuid::Uuid;

use crate::models::user::{User, RegisterRequest, LoginRequest};

pub struct AuthService;

impl AuthService {
    pub async fn register(
        pool: &PgPool, 
        request: RegisterRequest
    ) -> Result<User> {
        // Generate password hash
        let salt = SaltString::generate(&mut OsRng);
        let password_hash = Argon2::default()
            .hash_password(request.password.as_bytes(), &salt)
            .map_err(|e| anyhow!("Password hashing error: {}", e))?
            .to_string();

        // Insert user into database
        let user = sqlx::query_as!(
            User,
            "INSERT INTO users (email, password_hash, name,created_at) 
             VALUES ($1, $2, $3, NOW()) 
             RETURNING *",
            request.email,
            password_hash,
            request.name
        )
        .fetch_one(pool)
        .await
        .context("Failed to insert user")?;

        Ok(user)
    }

    pub async fn login(
        pool: &PgPool, 
        request: LoginRequest
    ) -> Result<(User,String)> {
        // Find user by email
        let user = sqlx::query_as!(
            User,
            "SELECT * FROM users WHERE email = $1",
            request.email
        )
        .fetch_optional(pool)
        .await
        .context("Database error during login")?
        .ok_or_else(|| anyhow!("User not found"))?;

        // Verify password
        let parsed_hash = PasswordHash::new(&user.password_hash)
            .map_err(|e| anyhow!("Invalid password hash format: {}", e))?;
            
        Argon2::default()
            .verify_password(request.password.as_bytes(), &parsed_hash)
            .map_err(|_| anyhow!("Invalid password"))?;

        // Generate JWT token
        let token = Self::generate_jwt(&user)?;
        Ok((user,token))
    }

    fn generate_jwt(user: &User) -> Result<String> {
        let secret = std::env::var("JWT_SECRET")
            .context("JWT_SECRET not set in environment")?;
            
        let claims = serde_json::json!({
            "sub": user.id.to_string(),
            "email": user.email,
            "exp": (chrono::Utc::now() + chrono::Duration::hours(24)).timestamp()
        });

        let token = encode(
            &Header::default(), 
            &claims, 
            &EncodingKey::from_secret(secret.as_ref())
        )
        .context("Failed to generate JWT token")?;

        Ok(token)
    }
    pub async fn get_profile(pool: &PgPool,request:Uuid) -> Result<User>{

        let user = sqlx::query_as!(
            User,
            "SELECT name,email,id FROM users WHERE id = $1",
            request
        )
        .fetch_optional(pool)
        .await
        .context("Database error during login")?
        .ok_or_else(|| anyhow!("User not found"))?;

        Ok(user)

    }
}